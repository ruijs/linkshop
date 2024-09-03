import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  metaOnly: true,
  namespace: "meta",
  code: "Property",
  name: "实体属性",
  fields: [
    {
      code: "model",
      name: "模型",
      type: "relation",
      targetSingularCode: "model",
      targetIdColumnName: "model_id",
    },
    {
      code: "type",
      name: "属性类型",
      type: "option",
      dataDictionary: "PropertyType",
      required: true,
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "code",
      name: "code",
      type: "text",
      required: true,
    },
    {
      code: "description",
      name: "描述",
      type: "text",
      required: false,
    },
    {
      code: "columnName",
      name: "数据库列名",
      type: "text",
      required: true,
    },
    {
      code: "required",
      name: "必填",
      type: "boolean",
      required: true,
    },
    {
      code: "defaultValue",
      name: "默认值",
      type: "text",
      required: false,
    },
    {
      code: "config",
      name: "配置",
      type: "json",
      required: false,
    },
    {
      code: "autoIncrement",
      name: "自增",
      type: "boolean",
      required: true,
    },
    {
      code: "minLength",
      name: "最小长度",
      type: "integer",
      required: false,
    },
    {
      code: "maxLength",
      name: "最大长度",
      type: "integer",
      required: false,
    },
    {
      code: "relation",
      name: "关系类型",
      type: "text",
      required: false,
    },
    {
      code: "targetSingularCode",
      name: "关联实体",
      type: "text",
      required: false,
    },
    {
      code: "targetIdColumnName",
      name: "关联实体的Id列名",
      type: "text",
      required: false,
    },
    {
      code: "selfIdColumnName",
      name: "自身实体Id列名",
      type: "text",
      required: false,
    },
    {
      code: "linkSchema",
      name: "关系表所属schema",
      type: "text",
      required: false,
    },
    {
      code: "linkTableName",
      name: "关系表表名",
      type: "text",
      required: false,
    },
    {
      code: "dataDictionary",
      name: "数据字典",
      type: "text",
      required: false,
    },
  ],
};

export default entity;
