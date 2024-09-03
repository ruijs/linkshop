import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  metaOnly: true,
  namespace: "meta",
  code: "DataDictionaryEntry",
  name: "数据字典条目",
  fields: [
    {
      code: "dictionary",
      name: "数据字典",
      type: "relation",
      targetSingularCode: "data_dictionary",
      targetIdColumnName: "dictionary_id",
    },
    {
      code: "value",
      name: "值",
      type: "text",
      required: true,
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "color",
      name: "颜色",
      type: "text",
    },
    {
      code: "icon",
      name: "图标",
      type: "text",
    },
    {
      code: "description",
      name: "描述",
      type: "text",
      required: false,
    },
    {
      code: "disabled",
      name: "是否禁用",
      type: "boolean",
      required: true,
    },
    {
      code: "orderNum",
      name: "排序号",
      type: "integer",
      required: true,
    },
  ],
};

export default entity;
