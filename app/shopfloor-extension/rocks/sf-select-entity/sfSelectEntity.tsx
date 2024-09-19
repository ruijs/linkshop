import { CommonProps, handleComponentEvent, RockConfig, RockEvent, type Rock } from "@ruiapp/move-style";
import type { sfSelectEntityConfig } from "./sf-select-entity-types";
import { get, pick } from "lodash";
import { renderRock } from "@ruiapp/react-renderer";
import { Tag } from "antd";
import sfSelectEntityMeta from "./sfSelectEntityMeta";
import { rapidAppDefinition, SonicEntityListConfig } from "@ruiapp/rapid-extension";

export type RecordStyle = {
  id: number;
  name: string;
};

export default {
  Renderer(context, props: sfSelectEntityConfig) {
    const { framework, page, scope } = context;
    const { width, height, onChange, value, singularCode, columns, pageSize = 10, modalWidth, selectionMode, orders } = props;

    const records: RecordStyle[] = [];
    const valueToRecords = JSON.parse(value || "{}");

    for (let key in valueToRecords) {
      records.push(valueToRecords[key]);
    }

    const entity = rapidAppDefinition.getEntityBySingularCode(singularCode || "");

    const wrapStyle: React.CSSProperties = pick(props, CommonProps.PositionStylePropNames) as any;
    wrapStyle.position = "absolute";
    wrapStyle.width = width;
    wrapStyle.height = height;

    const buttonRockConfig: RockConfig = {
      $id: `${props.$id}-btn`,
      $type: "antdSelect",
      mode: "multiple",
      className: "sf-select-entity-button",
      style: wrapStyle,
      placeHolder: "",
      value: records.map((record) => ({ label: record.name, value: record.id })),
      dropdownRender: () => null,
      dropdownStyle: {
        display: "none",
      },
      tagRender: (props: { label: string; value: number }) => {
        const { value, label } = props;
        return (
          <Tag
            color="gold"
            closable={selectionMode === "multiple"}
            onClose={(e) => {
              e.preventDefault();

              const result = records.filter((item) => item.id !== value);

              if (onChange) {
                handleComponentEvent("onChange", framework, page, scope, props, onChange, [JSON.stringify(result)]);
              }
            }}
          >
            {label}
          </Tag>
        );
      },
      onClick: [
        {
          $action: "setVars",
          vars: {
            "modal-selectEntity-open": true,
          },
        },
      ],
    };

    const modalRockConfig: RockConfig = {
      $type: "antdModal",
      $id: `${props.$id}-modal`,
      width: `${modalWidth}px`,
      title: `选择${entity && entity.name}`,
      
      $exps: {
        open: "!!$scope.vars['modal-selectEntity-open']",
      },
      children: [
        {
          $type: "sonicEntityList",
          entityCode: entity && entity.code,
          viewMode: "table",
          selectionMode,
          rowSelection: {
            defaultSelectedRowKeys: value,
          },
          tableProps: {
            height: 500,
          },
          selectOnClickRow: get(props, "selectOnClickRow", true),
          // fixedFilters: props.fixedFilters,
          // extraProperties: props.extraProperties,
          // queryProperties: props.queryProperties,
          orderBy:
            orders?.orderBy.map((order) => ({
              field: order.code,
              desc: order.sort === "desc",
            })) || [],
          pageSize: pageSize,
          extraActions: [
            {
              $type: "sonicToolbarFormItem",
              formItemType: "search",
              placeholder: "Search",
              actionEventName: "onSearch",
              filterMode: "contains",
              filterFields: ["name"],
            },
          ],
          toolbox: { disabled: true },
          columns:
            columns && Array.isArray(columns.selectedCode)
              ? columns.selectedCode.map((column) => ({
                  type: "auto",
                  width: column.width,
                  code: column.code,
                }))
              : [],
          onSelectedIdsChange: [
            {
              $action: "setVars",
              scopeId: `${props.$id}-scope`,
              $exps: {
                "vars.selectedIds": "$event.args[0].selectedIds",
                "vars.selectedRecords": "$event.args[0].selectedRecords",
              },
            },
          ],
        } satisfies SonicEntityListConfig,
      ],
      onOk: [
        {
          $action: "script",
          script: (e: RockEvent) => {
            const selectRecords: Record<string, any> = {};

            e.scope.vars.selectedRecords.map((record: any, index: string) => {
              selectRecords[index] = record;
            });

            if (onChange) {
              handleComponentEvent("onChange", framework, page, scope, props, onChange, [JSON.stringify(selectRecords)]);
            }
          },
        },
        {
          $action: "setVars",
          vars: {
            "modal-selectEntity-open": false,
          },
        },
      ],
      onCancel: [
        {
          $action: "setVars",
          vars: {
            "modal-selectEntity-open": false,
          },
        },
      ],
    };

    const rockConfig: RockConfig = {
      $type: "scope",
      $id: `${props.$id}-scope`,
      children: [buttonRockConfig, modalRockConfig],
    };

    return renderRock({ context, rockConfig: rockConfig });
  },
  ...sfSelectEntityMeta,
} as Rock;
