import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  metaOnly: true,
  namespace: "meta",
  code: "Route",
  name: "HTTP路由",
  fields: [
    {
      code: "namespace",
      name: "namespace",
      type: "text",
      required: true,
    },
    {
      code: "code",
      name: "编码",
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
      code: "type",
      name: "路由类型",
      type: "option",
      required: true,
      dataDictionary: "RouteType",
    },
    {
      code: "method",
      name: "HTTP Method",
      type: "option",
      required: true,
      dataDictionary: "RouteHttpMethod",
    },
    {
      code: "endpoint",
      name: "Endpoint",
      type: "text",
      required: true,
    },
    {
      code: "actions",
      name: "Actions",
      type: "json",
    },
  ],
};

export default entity;
