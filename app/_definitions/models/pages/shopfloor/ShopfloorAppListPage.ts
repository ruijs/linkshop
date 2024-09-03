import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "name",
    },
    {
      type: "textarea",
      code: "description",
    },
  ],
};

const page: RapidPage = {
  code: "shopfloor_app_list",
  name: "车间应用",
  title: "车间应用",
  // permissionCheck: {any: [""]},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "ShopfloorApp",
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
          placeholder: "搜索名称",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["name"],
        },
      ],
      extraProperties: ["description"],
      orderBy: [
        {
          field: "createdAt",
          desc: true,
        },
      ],
      pageSize: 20,
      columns: [
        // {
        //   key: "name-link",
        //   type: "link",
        //   code: "name",
        //   width: "150px",
        //   fixed: "left",
        //   rendererType: "link",
        //   rendererProps: {
        //     url: "/pages/shopfloor_app_details?id={{id}}",
        //   },
        // },
        {
          key: "app-name",
          type: "auto",
          code: "name",
          title: "应用",
          cell: {
            $type: "antdListItemMeta",
            title: {
              $type: "anchor",
              href: "",
              children: "",
            },
            $exps: {
              "title.children": "$slot.record.name",
              "title.href": "'/shopfloor/builder?appId=' + $slot.record.id",
              description: "$slot.record.description",
            },
          },
        },
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
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
          entityCode: "ShopfloorApp",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;
