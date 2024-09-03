import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "shopfloor",
  code: "ShopfloorApp",
  name: "车间配置系统-应用",
  fields: [
    {
      code: "code",
      name: "编码",
      type: "text",
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
    },
    {
      code: "icon",
      name: "图标地址",
      type: "text",
    },
    {
      code: "version",
      name: "当前生效版本",
      type: "text",
    },
    {
      code: "permissions",
      name: "权限",
      type: "json",
    },
    {
      code: "content",
      name: "内容",
      type: "json",
    },
    {
      code: "publishedAt",
      name: "发布时间",
      type: "datetime",
    },
    {
      code: "publishedBy",
      name: "发布人",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "published_by",
    },
  ],
};

export default entity;
