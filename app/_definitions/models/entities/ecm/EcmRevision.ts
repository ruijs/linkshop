import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "EcmRevision",
  name: "文档版本",
  fields: [
    {
      code: "document",
      name: "文档",
      type: "relation",
      required: true,
      targetSingularCode: "ecm_document",
      targetIdColumnName: "document_id",
    },
    {
      code: "size",
      name: "大小",
      type: "integer",
      required: true,
    },
    {
      code: "storageObject",
      name: "存储对象",
      type: "relation",
      targetSingularCode: "ecm_storage_object",
      targetIdColumnName: "storage_object_id",
    },
    {
      code: "publishState",
      name: "状态",
      type: "option",
      dataDictionary: "PublishState",
      required: true,
    },
  ],
};

export default entity;
