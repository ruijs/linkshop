import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfSelectEntity",

  name: "选择实体",

  voidComponent: true,

  props: {
    value: {
      valueType: "string",
      defaultValue: '',
      onChangeEventName: "onChange",
    },

    selectionMode: {
      valueType: 'string',
      defaultValue: 'multiple'
    },

    singularCode: {
      valueType: "string",
      defaultValue: ''
    },

    width: {
      valueType: "string",
      defaultValue: "32px",
    },

    height: {
      valueType: "string",
      defaultValue: "32px",
    },

    left: {
      valueType: "string",
      defaultValue: "0px",
    },

    top: {
      valueType: "string",
      defaultValue: "0px",
    },

    columns: {
      valueType: "object",
      defaultValue: {},
    },

    orders: {
      valueType: 'object',
      defaultValue: {}
    },

    pageSize: {
      valueType: "string",
      defaultValue: "10",
    },

    modalWidth: {
      valueType: 'string',
      defaultValue: 600,
    }
  },

  slots: {},

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "值", 
          propName: "value",
        },
        {
          $type: "selectPropSetter",
          label: "选择模式",
          propName: "selectionMode",
          options: [
            {
              label: "单选",
              value: "single",
            },
            {
              label: "多选",
              value: "multiple",
            },
          ],
        },
        {
          $type: "modelTypeSetter",
          label: "数据模型",
          propName: "singularCode",
        },
        {
          $type: "modelColumnsSetter",
          label: "列配置",
          propName: "columns",
        },
        {
          $type: "modelSortSetter",
          label: "排序配置",
          propName: "orders",
        },
        {
          $type: "numberPropSetter",
          label: "分页大小", 
          propName: "pageSize",
        },
        {
          $type: "numberPropSetter",
          label: "弹框宽度", 
          propName: "modalWidth",
        },
      ],
    },
    { $type: "positionPropPanel" },
    { $type: "sizePropPanel" },
  ],
} as RockMeta;

