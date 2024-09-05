import { CommonProps, type Rock, type RockConfig } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import SfEntityTableMeta from "./SfEntityTableMeta";
import type { SfEntityTableRockConfig, SfEntityTableState } from "./sf-entity-table-types";
import { pick } from "lodash";
import { generateRockConfigOfError } from "@ruiapp/rapid-extension";

export default {
  onInit(context, props) {
    const { pageSize = 20 } = props;
    const entityConfig = props.entityConfig;
    if (!entityConfig) {
      return;
    }

    const dataSourceCode = entityConfig.name;
    if (!context.scope.stores[dataSourceCode]) {
      return;
    }

    // 初始化分页
    const store = context.scope.stores[dataSourceCode] as any;
    store.updateConfig({
      pagination:
        pageSize > 0
          ? {
            limit: pageSize,
            offset: 0,
          }
          : undefined,
    });
  },

  Renderer(context, props, state) {
    const { pageSize = 20 } = props;

    const entityConfig = props.entityConfig;

    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    wrapStyle.position = "absolute";
    wrapStyle.overflowY = "auto";

    if (!entityConfig) {
      const errorRockConfig = generateRockConfigOfError(new Error(`Please select data source.`));
      return renderRock({ context, rockConfig: { ...errorRockConfig, style: wrapStyle } });
    }

    const tableRockConfig: RockConfig = {
      $id: `${props.$id}-entity-list`,
      $type: "rapidEntityList",
      dataSourceCode: entityConfig.name,
      entityCode: entityConfig.entityCode,
      listActions: props.listActions,
      extraActions: props.extraActions,
      selectionMode: props.selectionMode,
      selectOnClickRow: props.selectOnClickRow,
      onSelectedIdsChange: props.onSelectedIdsChange,
      viewMode: "table",
      pageSize,
      actions: props.actions || [],
      columns: props.columns || [],
      fixedFilters: props.fixedFilters || [],
    };

    return <div style={wrapStyle}>{renderRock({ context, rockConfig: tableRockConfig })}</div>;
  },

  ...SfEntityTableMeta,
} as Rock<SfEntityTableRockConfig, SfEntityTableState>;
