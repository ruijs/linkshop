import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "code"
    },
    {
      type: "auto",
      code: "name"
    },
    {
      type: "auto",
      code: "config"
    },
    {
      type: "auto",
      code: "state"
    }
  ]
};

const page: RapidPage = {
  code: "iot_machine_list",
  parentCode: "iot",
  name: "设备管理",
  title: "设备管理",
  permissionCheck: {
    any: ["dev.manage"]
  },
  view: {
    $type: "sonicEntityList",
    entityCode: "AppClient",
    viewMode: "table",
    selectionMode: "none",
    pageSize: 20,
    columns: [
      {
        type: "auto",
        code: "id"
      },
      {
        type: "auto",
        code: "code"
      },
      {
        type: "auto",
        code: "name"
      },
      {
        type: "auto",
        code: "state"
      },
      {
        type: "auto",
        code: "createdAt"
      }
    ],
    actionsColumnWidth: "200px",
    actions: [
      {
        $type: "sonicRecordActionEditEntity",
        code: "edit",
        actionType: "edit",
        actionText: "修改"
      },
      {
        $type: "sonicRecordActionDeleteEntity",
        code: "delete",
        actionType: "delete",
        actionText: "删除",
        dataSourceCode: "list",
        entityCode: "AppClient"
      }
    ],
    listActions: [
      {
        $type: "sonicToolbarNewEntityButton",
        text: "新建",
        icon: "PlusOutlined",
        actionStyle: "primary"
      }
    ],
    extraActions: [
      {
        $type: "sonicToolbarFormItem",
        formItemType: "search",
        placeholder: "搜索：编码，名称",
        actionEventName: "onSearch",
        filterMode: "contains",
        filterFields: ["code", "name"]
      }
    ],
    newForm: formConfig,
    editForm: formConfig,
    searchForm: {
      entityCode: "AppClient",
      items: [
        {
          type: "auto",
          code: "id",
          filterMode: "eq"
        },
        {
          type: "auto",
          code: "code",
          filterMode: "contains"
        },
        {
          type: "auto",
          code: "name",
          filterMode: "contains"
        },
        {
          type: "auto",
          code: "config",
          filterMode: "eq"
        },
        {
          type: "auto",
          code: "state",
          filterMode: "eq"
        },
        {
          type: "auto",
          code: "createdAt",
          filterMode: "between"
        },
        {
          type: "auto",
          code: "updatedAt",
          filterMode: "between"
        },
        {
          type: "auto",
          code: "deletedAt",
          filterMode: "between"
        },
        {
          type: "auto",
          code: "createdBy",
          filterMode: "eq"
        },
        {
          type: "auto",
          code: "updatedBy",
          filterMode: "eq"
        },
        {
          type: "auto",
          code: "deletedBy",
          filterMode: "eq"
        },
        {
          type: "auto",
          code: "detetedBy",
          filterMode: "eq"
        }
      ]
    }
  }
};

export default page;
