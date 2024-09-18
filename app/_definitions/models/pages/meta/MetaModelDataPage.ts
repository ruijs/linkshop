import { cloneDeep, find, without, indexOf, intersection } from "lodash";
import type {
  RapidPage,
  RapidEntityFormConfig,
  SonicEntityListRockConfig,
  RapidPageGenerator,
  RapidField,
  RapidEntity,
  RapidEntitySearchFormItemConfig,
  RapidEntitySearchFormConfig,
  RapidTableColumnConfig,
  RapidFormItemConfig
} from "@ruiapp/rapid-extension";
import { AppDefinition } from "@ruiapp/rapid-extension/src/rapidAppDefinition";
import { RockConfig } from "@ruiapp/move-style";

const defaultHiddenFormFields = [
  "id",
  "createdAt",
  "createdBy",
  "updatedAt",
  "updatedBy",
  "deletedAt",
  "deletedBy",
  "detetedBy", // for wrong typo
];

const defaultHiddenColumnFields = [
  "password",
  "createdBy",
  "updatedAt",
  "updatedBy",
  "deletedAt",
  "deletedBy",
  "detetedBy", // for wrong typo
];

// 排序靠前
const frontFields = [
  "id",
  "code",
  "name",
  "title",
];

// 排序靠后
const backFields = [
  "status",
  "state",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "createdBy",
  "updatedBy",
  "deletedBy",
  "detetedBy", // for wrong typo
];

// 默认搜索框搜索内容
const defaultSearchFilterFields = [
  "code",
  "name",
  "description",
];

const pageGenerator: RapidPageGenerator = {
  code: "meta_model_data",
  parentCode: "meta_model_list",
  name: "模型数据管理",

  generateRapidPage: function ({ context, request, params }): RapidPage {
    const appDefinition = context.appDefinition as AppDefinition;
    const { searchParams } = new URL(request.url);
    const modelCode = searchParams.get("code");

    const entity = find(appDefinition.entities, (item) => item.singularCode == modelCode);

    if (!entity || !entity.code) {
      // TODO
      return
    }

    const formConfig: Partial<RapidEntityFormConfig> = {
      items: [],
    };

    const rockConfig: SonicEntityListRockConfig = {
      $type: "sonicEntityList",
      entityCode: entity.code,
      viewMode: "table",
      selectionMode: "none",
      pageSize: 20,
      columns: [],
      actionsColumnWidth: "200px",
    };

    const fieldCodes = [];
    const fieldMaps = new Map<string, RapidField>();
    for (const field of entity.fields) {
      fieldCodes.push(field.code);
      fieldMaps.set(field.code, field);
    }

    rockConfig.actions = generateActions(entity, fieldCodes, fieldMaps);
    rockConfig.listActions = generateListActions(entity, fieldCodes, fieldMaps);
    rockConfig.extraActions = generateExtraActions(entity, fieldCodes, fieldMaps);

    // 删除掉系统审计字段
    // 根据规则进行默认排序
    const columnFieldCodes = orderFilterFieldCodes(fieldCodes, defaultHiddenColumnFields);
    const formFieldCodes = orderFilterFieldCodes(fieldCodes, defaultHiddenFormFields);

    for (const code of columnFieldCodes) {
      const field = fieldMaps.get(code)!;

      if (field.relation == "many") {
        // TODO
        // 暂时跳过，需要实现
        continue;
      }

      if (field.type == "json") {
        // TODO
        // 暂时跳过，需要实现
        continue;
      }

      const fieldRock = generateColumnField(appDefinition.entities, entity, field);
      rockConfig.columns.push(fieldRock);
    }

    for (const code of formFieldCodes) {
      const field = fieldMaps.get(code)!;
      const fieldRock = generateFormField(appDefinition.entities, entity, field);
      formConfig.items!.push(fieldRock);
    }

    rockConfig.newForm = cloneDeep(formConfig);
    rockConfig.editForm = cloneDeep(formConfig);

    rockConfig.searchForm = generateSearchForm(entity, fieldCodes, fieldMaps);

    return {
      code: "meta_model_data",
      parentCode: "meta_model_list",
      name: `数据管理 - ${entity.name}`,
      title: `数据管理 - ${entity.name}`,
      permissionCheck: { any: ["dev.manage"] },
      view: rockConfig,
    };
  },
};


function orderFilterFieldCodes(codes: string[], excludes: string[]): string[] {
  let input = without(codes, ...excludes);
  let final = [];
  let ends = [];
  for (const code of frontFields) {
    if (indexOf(input, code) > -1) {
      final.push(code);
    }
  }
  for (const code of backFields) {
    if (indexOf(input, code) > -1) {
      ends.push(code);
    }
  }
  input = without(input, ...frontFields);
  input = without(input, ...backFields);

  final.push(...input);
  final.push(...ends);

  return final
}

function generateColumnField(entities: RapidEntity[], entity: RapidEntity, field: RapidField): RapidTableColumnConfig {
  let config: RapidTableColumnConfig = {
    type: "auto",
    code: field.code,
  };

  if (field.type == "relation") {
    config.fieldName = `${field.code}.name`;
    config.width = "150px";
  }

  return config;
}

function generateFormField(entities: RapidEntity[], entity: RapidEntity, field: RapidField): RapidFormItemConfig {
  let config: RapidFormItemConfig = {
    type: "auto",
    code: field.code,
  };
  return config
}

function generateListActions(entity: RapidEntity, fieldCodes: string[], fieldMap: Map<string, RapidField>): RockConfig[] {
  return [
    {
      $type: "sonicToolbarNewEntityButton",
      text: "新建",
      icon: "PlusOutlined",
      actionStyle: "primary",
    },
  ];
}

function generateActions(entity: RapidEntity, fieldCodes: string[], fieldMap: Map<string, RapidField>): RockConfig[] {
  return [
    {
      $type: "sonicRecordActionEditEntity",
      code: "edit",
      actionType: "edit",
      actionText: "修改",
    },
    {
      $type: "sonicRecordActionDeleteEntity",
      code: "delete",
      actionType: "delete",
      actionText: "删除",
      dataSourceCode: "list",
      entityCode: entity.code,
    },
  ]
}

function generateExtraActions(entity: RapidEntity, fieldCodes: string[], fieldMap: Map<string, RapidField>): RockConfig[] {
  const filterFields = intersection(fieldCodes, defaultSearchFilterFields);
  const names = [];
  for (const code of filterFields) {
    names.push(fieldMap.get(code)!.name);
  }

  if (names.length == 0) {
    return [];
  }

  return [
    {
      $type: "sonicToolbarFormItem",
      formItemType: "search",
      placeholder: `搜索：${names.join("，")}`,
      actionEventName: "onSearch",
      filterMode: "contains",
      filterFields: filterFields,
    },
  ]
}

function generateSearchForm(entity: RapidEntity, fieldCodes: string[], fieldMap: Map<string, RapidField>): RapidEntitySearchFormConfig {
  const filterCodes = orderFilterFieldCodes(fieldCodes, []);
  const items: RapidEntitySearchFormItemConfig[] = [];

  for (const code of filterCodes) {
    const field = fieldMap.get(code)!;
    let config: RapidEntitySearchFormItemConfig = {
      type: "auto",
      code: code,
      filterMode: "eq",
    };
    if (field.relation == "many") {
      // TODO
      // 需要实现
      continue
    } else if (field.type == "datetime") {
      // TODO
      // 需要实现
      continue
    } else if (field.type == "text") {
      config.filterMode = "contains";
    }
    items.push(config);
  }
  return {
    entityCode: entity.code,
    items: items,
  }
}


export default pageGenerator;
