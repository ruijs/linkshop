import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "EcmStorageObject",
  name: "存储对象",
  fields: [
    {
      code: "size",
      name: "大小",
      type: "integer",
      required: true,
    },
    {
      code: "key",
      name: "对象唯一键",
      type: "text",
      required: true,
    },
    {
      code: "hash",
      name: "哈希值",
      type: "text",
      required: false,
    },
  ],
};

export default entity;
