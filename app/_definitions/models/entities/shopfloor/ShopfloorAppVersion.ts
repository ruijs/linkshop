import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "shopfloor",
  code: "ShopfloorAppVersion",
  name: "车间配置系统-应用",
  fields: [
    {
      code: "app",
      name: "应用",
      type: "relation",
      targetSingularCode: "shopfloor_app",
      targetIdColumnName: "app_id",
      required: true,
    },
    {
      code: "version",
      name: "版本",
      type: "text",
    },
    {
      code: "description",
      name: "描述",
      type: "text",
    },
    {
      code: "content",
      name: "内容",
      type: "json",
    },
  ],
};

export default entity;
