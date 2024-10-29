import type { RapidEntity } from "@ruiapp/rapid-extension";
import type { TEntitySingularCodes } from "~/iot-extension/_definitions/meta/model-codes";
import type { TDictionaryCodes } from "~/iot-extension/_definitions/meta/data-dictionary-codes";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "iot",
  code: "IotDataSource",
  name: "IoT数据源",
  fields: [
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "code",
      name: "编号",
      type: "text",
      required: true,
    },
    {
      code: "description",
      name: "备注",
      type: "text",
      required: false,
    },
    {
      code: "config",
      name: "配置",
      type: "json",
      required: false,
    },
  ],
};

export default entity;
