import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  metaOnly: true,
  namespace: "meta",
  code: "DataDictionary",
  name: "数据字典",
  fields: [
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
      code: "valueType",
      name: "值类型",
      type: "option",
      dataDictionary: "DataDictionaryValueType",
      required: true,
    },
    {
      code: "level",
      name: "级别",
      type: "option",
      dataDictionary: "DataDictionaryLevel",
      required: true,
    },
    {
      code: "description",
      name: "描述",
      type: "text",
      required: false,
    },
    {
      code: "source",
      name: "来源",
      type: "text",
    },
    {
      code: "externalId",
      name: "外部id",
      type: "text",
    },
    {
      code: "externalData",
      name: "外部数据",
      type: "json",
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "UndeletedDeletedState",
      required: true,
    },
    {
      code: "entries",
      name: "条目",
      type: "relation[]",
      targetSingularCode: "data_dictionary",
      selfIdColumnName: "dictionary_id",
    },
  ],
};

export default entity;
