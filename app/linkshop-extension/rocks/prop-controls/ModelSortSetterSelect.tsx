import { Rock, RockConfigBase, RockEventHandler, handleComponentEvent } from "@ruiapp/move-style";
import { rapidAppDefinition, RapidEntity } from "@ruiapp/rapid-extension";
import { Button, Form, message, Modal, Select, Tag } from "antd";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

export interface ModelColumnsSetterSelectProps extends RockConfigBase {
  $id: string;
  value?: {
    singularCode: string;
    orderBy: {
      code: string;
      sort: "asc" | "desc";
    }[];
  };
  onChange?: RockEventHandler;
}

export type ModelTypeStyle = {
  id: number;
  name: string;
  namespace: string;
  pluralCode: string;
  singularCode: string;
  description?: string;
};

function SortableItem(props: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    flexDireaction: "row",
    cursor: "move",
    marginBottom: 12,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <svg viewBox="0 0 20 20" width="20" {...listeners} style={{ marginRight: 12 }}>
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
      {props.children}
    </div>
  );
}

export default {
  $type: "modelSortSetterSelect",

  Renderer(context, props: ModelColumnsSetterSelectProps) {
    const { page, framework, scope } = context;
    const { onChange, value } = props;

    const entities = rapidAppDefinition.getEntities();

    const [currentEntity, setCurrentEntity] = useState<RapidEntity<string, string>>(rapidAppDefinition.getEntityBySingularCode(value?.singularCode || ""));
    const [open, setOpen] = useState(false);
    const [steps, setSteps] = useState<{ code: string; sort: string }[]>(value?.orderBy || []);
    const [sortModalOpen, setSortModalOpen] = useState(false);
    const [form] = Form.useForm();

    const onEntityChange = (value: string) => {
      const selectedEntity = entities.find((entity) => entity.singularCode === value);

      if (selectedEntity) {
        handleComponentEvent("onChange", framework, page, scope, props, onChange!, [
          {
            singularCode: selectedEntity?.singularCode,
            orderBy: [],
          },
        ]);
        setCurrentEntity(selectedEntity);
        setSteps([]);
      }
    };

    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 1,
        },
      }),
    );

    const onDragEnd = ({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id && currentEntity) {
        const activeIndex = steps.findIndex((i) => i.code === active.id);
        const overIndex = steps.findIndex((i) => i.code === over?.id);
        setSteps(arrayMove(steps, activeIndex, overIndex));
      }
    };

    const onSave = () => {
      if (currentEntity) {
        handleComponentEvent("onChange", framework, page, scope, props, onChange!, [
          {
            singularCode: currentEntity.singularCode,
            orderBy: steps,
          },
        ]);
        onCancel();
      }
    };

    const onCancel = () => {
      setOpen(false);
    };

    const onSortSave = () => {
      form.validateFields().then((res) => {
        if (steps.every((step) => step.code !== res.code)) {
          setSteps([...steps, res]);
          onSortCancel();
        } else {
          message.error("重复code" + res.code);
        }
      });
    };

    const onSortCancel = () => {
      setSortModalOpen(false);
    };

    return (
      <>
        <Button type="primary" style={{ width: "100%" }} onClick={() => setOpen(true)}>
          排序配置
        </Button>
        <Modal open={open} title="排序配置" width={500} okText="保存" cancelText="取消" onOk={onSave} onCancel={onCancel}>
          <Select
            style={{ width: "100%", marginBottom: 12 }}
            options={(entities || []).map((s) => ({ label: s.name, value: s.singularCode }))}
            value={currentEntity?.singularCode}
            onChange={onEntityChange}
          ></Select>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={steps.map((step) => step.code)} strategy={verticalListSortingStrategy}>
              {steps.map((item) => {
                return (
                  <SortableItem key={item.code} id={item.code}>
                    <Tag
                      key={item.code}
                      className="drop-down-button"
                      color="gold"
                      closable
                      onClose={(e: React.MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        setSteps(steps.filter((step) => step.code !== item.code));
                      }}
                      style={{
                        width: "100%",
                        height: 36,
                        fontSize: 16,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingLeft: 12,
                      }}
                    >
                      <div>
                        {item.code} : {item.sort}
                      </div>
                    </Tag>
                  </SortableItem>
                );
              })}
            </SortableContext>
          </DndContext>
          {currentEntity && (
            <Button
              type="link"
              onClick={() => {
                form.resetFields();
                setSortModalOpen(true);
              }}
            >
              添加排序
            </Button>
          )}
        </Modal>
        <Modal title="添加排序" open={sortModalOpen} okText="保存" cancelText="取消" onOk={onSortSave} onCancel={onSortCancel}>
          <Form name="form" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} autoComplete="off">
            <Form.Item label="字段" name="code" rules={[{ required: true, message: "字段必须选择" }]}>
              <Select>
                {currentEntity?.fields.map((field) => (
                  <Select.Option key={field.code} value={field.code}>
                    {field.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="规则" name="sort" rules={[{ required: true, message: "规则必须选择" }]}>
              <Select>
                <Select.Option value="asc">asc</Select.Option>
                <Select.Option value="desc">desc</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  },
} as Rock;
