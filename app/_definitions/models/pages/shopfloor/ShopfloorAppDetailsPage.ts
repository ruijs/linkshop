import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "shopfloor_app_details",
  //@ts-ignore
  parentCode: "shopfloor_app_list",
  name: "应用详情",
  title: "应用详情",
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "ShopfloorApp",
      mode: "view",
      column: 3,
      items: [
        {
          type: "auto",
          code: "name",
        },
        {
          type: "auto",
          code: "description",
        },
        {
          type: "auto",
          code: "version",
        },
        {
          type: "auto",
          code: "icon",
        },
        {
          type: "auto",
          code: "createdAt",
        },
        {
          type: "auto",
          code: "updatedAt",
        },
        {
          type: "auto",
          code: "publishedAt",
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "steps",
          label: "Steps",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "ShopfloorAppStep",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  field: "app_id",
                  operator: "eq",
                  value: "",
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "name",
                },
              ],
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
              },
            },
          ],
        },
        {
          key: "versions",
          label: "versions",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "ShopfloorAppVersion",
              viewMode: "table",
              selectionMode: "none",
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "发布",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                },
                // {
                //   $type: "sonicToolbarRefreshButton",
                //   text: "刷新",
                //   icon: "ReloadOutlined",
                // },
              ],
              fixedFilters: [
                {
                  field: "app_id",
                  operator: "eq",
                  value: "",
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "version",
                },
                {
                  type: "auto",
                  code: "description",
                },
              ],
              actions: [
                {
                  $type: "sonicRecordActionEditEntity",
                  code: "restore",
                  actionType: "restore",
                  actionText: "还原",
                },
              ],
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default page;
