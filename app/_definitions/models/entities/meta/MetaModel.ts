import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  metaOnly: true,
  namespace: "meta",
  code: "Model",
  name: "实体模型",
  fields: [
    {
      code: "namespace",
      name: "namespace",
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
      code: "description",
      name: "描述",
      type: "text",
      required: false,
    },
    {
      code: "singularCode",
      name: "singular code",
      type: "text",
      required: true,
    },
    {
      code: "pluralCode",
      name: "plural code",
      type: "text",
      required: true,
    },
    {
      code: "permissionPolicies",
      name: "权限配置",
      type: "json",
    },
    {
      code: "properties",
      name: "属性",
      type: "relation[]",
      targetSingularCode: "property",
      selfIdColumnName: "model_id",
    },
  ],
};

export default entity;
