import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "shopfloor",
  code: "ShopfloorStation",
  name: "车间配置系统-工位",
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
      code: "apps",
      name: "关联应用",
      type: "relation[]",
      targetSingularCode: "shopfloor_app",
      linkTableName: "shopfloor_station_app",
      targetIdColumnName: "app_id",
      selfIdColumnName: "station_id",
    },
    {
      code: "deleted",
      name: "是否删除",
      type: "boolean",
      defaultValue: "false",
    },
  ],
};

export default entity;
