import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "shopfloor",
  code: "ShopfloorDisplayDevice",
  name: "车间配置系统-显示设备",
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
      code: "stations",
      name: "关联工位",
      type: "relation[]",
      targetSingularCode: "shopfloor_station",
      linkTableName: "shopfloor_station_display_device",
      targetIdColumnName: "station_id",
      selfIdColumnName: "display_device_id",
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
