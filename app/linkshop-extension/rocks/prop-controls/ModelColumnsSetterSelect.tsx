import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Rock, RockConfigBase, RockEventHandler, handleComponentEvent } from "@ruiapp/move-style";
import { rapidAppDefinition, RapidEntity } from "@ruiapp/rapid-extension";
import { Button, Form, InputNumber, Modal, RowProps, Select, Table } from "antd";
import React, { Key, useContext, useState } from "react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormInstance } from "antd/es/form/Form";

export interface ModelColumnsSetterSelectProps extends RockConfigBase {
  $id: string;
  value?: {
    singularCode: string;
    selectedCode: {
      code: string;
      width: string;
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

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const Row = (
  props: RowProps & {
    "data-row-key": string;
  },
) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props["data-row-key"],
  });
  const [form] = Form.useForm();

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />
      </EditableContext.Provider>
    </Form>
  );
};

interface Item {
  name: string;
  width: string;
  code: string;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({ title, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext)!;

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;
 

  if (dataIndex == "width") {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <InputNumber onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div style={{ paddingInlineEnd: 24, height: 32, lineHeight: '32px' }} onClick={toggleEdit}>
        {record.width || 0}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default {
  $type: "modelColumnsSetterSelect",

  Renderer(context, props: ModelColumnsSetterSelectProps) {
    const { page, framework, scope } = context;
    const { onChange, value } = props;

    const entities = rapidAppDefinition.getEntities();

    const entity = rapidAppDefinition.getEntityBySingularCode(value?.singularCode || "")

    if(entity) {
      entity.fields = entity.fields.map(item => {
        let width = 0;

        value?.selectedCode.map(i=>{
          if(i.code === item.code) {
            width = i.width
          }
        })

        return {
          ...item,
          width,
        }
      })
    }

    const [currentEntity, setCurrentEntity] = useState<RapidEntity<string, string>>(entity);
    const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>(value?.selectedCode.map((item) => item.code) || []);

    const onEntityChange = (value: string) => {
      const selectedEntity = entities.find((entity) => entity.singularCode === value);

      if (selectedEntity) {
        handleComponentEvent("onChange", framework, page, scope, props, onChange!, [
          {
            singularCode: selectedEntity?.singularCode,
            selectedCode: [],
          },
        ]);
        setCurrentEntity(selectedEntity);
        setSelectedRowKeys([]);
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
        const fields = currentEntity.fields || [];
        const activeIndex = fields.findIndex((i) => i.code === active.id);
        const overIndex = fields.findIndex((i) => i.code === over?.id);
        setCurrentEntity({
          ...currentEntity,
          fields: arrayMove(fields, activeIndex, overIndex),
        });
      }
    };

    const onWidthChange = (row: Item) => {
      if (currentEntity) {
        currentEntity.fields.find((item) => row.code === item.code)!.width = row.width;
        setCurrentEntity(currentEntity);
      }
    };

    const onSave = () => {
      if (currentEntity) {
        const checkedTableData = currentEntity.fields
          .filter((field) => selectedRowKeys.some((key) => key === field.code))
          .map((field) => ({ code: field.code, width: field.width }));
        handleComponentEvent("onChange", framework, page, scope, props, onChange!, [
          {
            singularCode: currentEntity.singularCode,
            selectedCode: checkedTableData,
          },
        ]);
        onCancel();
      }
    };

    const onCancel = () => {
      setOpen(false);
    };

    return (
      <>
        <Button type="primary" style={{ width: "100%" }} onClick={() => setOpen(true)}>
          列配置
        </Button>
        <Modal open={open} title="列配置" width={800} okText="保存" cancelText="取消" onOk={onSave} onCancel={onCancel}>
          <Select
            style={{ width: "100%", marginBottom: 12 }}
            options={(entities || []).map((s) => ({ label: s.name, value: s.singularCode }))}
            value={currentEntity?.singularCode}
            onChange={onEntityChange}
          ></Select>
          <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
            <SortableContext items={currentEntity?.fields.map((field) => field.code) || []} strategy={verticalListSortingStrategy}>
              <Table
                pagination={false}
                rowKey={"code"}
                components={{
                  body: {
                    row: Row,
                    cell: EditableCell,
                  },
                }}
                rowSelection={{
                  selectedRowKeys,
                  onChange: (selectedRowKeys) => {
                    setSelectedRowKeys(selectedRowKeys);
                  },
                }}
                scroll={{
                  y: 500,
                }}
                columns={[
                  {
                    title: "字段",
                    dataIndex: "name",
                  },
                  {
                    title: "宽度",
                    dataIndex: "width",
                    onCell: (record) => {
                      return {
                        record,
                        dataIndex: "width",
                        title: "宽度",
                        handleSave: onWidthChange,
                      };
                    },
                  },
                ]}
                dataSource={currentEntity?.fields || []}
              ></Table>
            </SortableContext>
          </DndContext>
        </Modal>
      </>
    );
  },
} as Rock;
