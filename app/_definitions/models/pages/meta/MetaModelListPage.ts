import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig, SonicEntityListRockConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "name",
    },
    {
      type: "auto",
      code: "namespace",
    },
    {
      type: "auto",
      code: "singularCode",
    },
    {
      type: "auto",
      code: "pluralCode",
    },
    {
      type: "textarea",
      code: "description",
    },
    {
      type: "auto",
      code: "permissionPolicies",
    },
  ],
};

const page: RapidPage = {
  code: "meta_model_list",
  name: "实体模型列表",
  title: "模型管理",
  permissionCheck: { any: ["dev.manage"] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "Model",
      viewMode: "table",
      selectionMode: "none",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "搜索名称、Plural Code",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["pluralCode", "name"],
        },
      ],
      extraProperties: ["permissionPolicies"],
      orderBy: [
        {
          field: "namespace",
        },
        {
          field: "singularCode",
        },
      ],
      pageSize: -1,
      columns: [
        {
          type: "link",
          code: "name",
          width: "200px",
          fixed: "left",
          rendererProps: {
            url: "/pages/meta_model_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "namespace",
          title: "Ns.",
          width: "100px",
        },
        {
          type: "auto",
          code: "singularCode",
          width: "300px",
        },
        {
          type: "auto",
          code: "pluralCode",
          width: "300px",
        },
        {
          type: "auto",
          code: "description",
        },
      ],
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: "edit",
          actionType: "edit",
          actionText: "修改",
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: "delete",
          actionType: "delete",
          actionText: "删除",
          dataSourceCode: "list",
          entityCode: "Model",
        },
        {
          $type: "anchor",
          className: "rui-table-action-link",
          children: "数据",
          $exps: {
            href: "'/pages/meta_model_data?code=' + $slot.record.singularCode",
          },
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: "AppNavItem",
        items: [
          {
            type: "auto",
            code: "code",
            filterMode: "contains",
          },
          {
            type: "auto",
            code: "name",
            filterMode: "contains",
          },
          {
            type: "auto",
            code: "state",
            filterMode: "eq",
          },
        ],
      },
    } as SonicEntityListRockConfig,
  ],
};

export default page;
