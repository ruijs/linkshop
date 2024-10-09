import { Framework, Page } from "@ruiapp/move-style";
import type { PageConfig, RockConfig, RockEvent, RockEventHandlerSendComponentMessage, RockEventHandlerSetComponentProperty } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import ReactRocks from "@ruiapp/react-rocks";
import AntdExtension from "@ruiapp/antd-extension";
import MonacoExtension from "@ruiapp/monaco-extension";
import BlocklyExtension from "@ruiapp/blockly-extension";
import DesignerExtension, { DesignerStore, DesignerUtility } from "@ruiapp/designer-extension";
import RapidExtension, { rapidAppDefinition, RapidExtensionSetting } from "@ruiapp/rapid-extension";
import { useMemo } from "react";
import _, { first, get } from "lodash";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { RapidPage, RapidEntity, RapidDataDictionary } from "@ruiapp/rapid-extension";
import DesignerHudExtension, { HudWidgetRectChangeEvent, hudItemsFromRockChildrenConfig } from "@ruiapp/designer-hud";
import qs from "qs";

import AppExtension from "~/app-extension/mod";
import LinkshopExtension from "~/linkshop-extension/mod";
import ShopfloorExtension from "~/shopfloor-extension/mod";

import styles from "antd/dist/antd.css";
import linkshopBuilderStyles from "~/styles/linkshop-builder.css";
import indexStyles from "~/styles/index.css";
import shopfloorExtensionStyles from "~/shopfloor-extension/mod.css";

import rapidService from "~/rapidService";

import { Avatar, Dropdown, PageHeader } from "antd";
import type { MenuProps } from "antd";
import { ExportOutlined, UserOutlined } from "@ant-design/icons";
import type { ShopfloorApp } from "~/_definitions/meta/entity-types";
import { sendDesignerCommand } from "~/linkshop-extension/utilities/DesignerUtility";
import { RuiLoggerProvider } from "rui-logger";
import { redirectToSignin } from "~/utils/navigate";
import { RapidServer } from "@ruiapp/rapid-core";
import { AppDefinition } from "@ruiapp/rapid-extension/src/rapidAppDefinition";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: linkshopBuilderStyles },
    { rel: "stylesheet", href: indexStyles },
    { rel: "stylesheet", href: shopfloorExtensionStyles },
  ];
}

const framework = new Framework();
framework.setLoggerProvider(new RuiLoggerProvider());

framework.registerExpressionVar("_", _);
framework.registerExpressionVar("qs", qs);
framework.registerExpressionVar("hud", {
  hudItemsFromRockChildrenConfig,
});

framework.loadExtension(ReactRocks);
framework.loadExtension(AntdExtension);
framework.loadExtension(MonacoExtension);
framework.loadExtension(BlocklyExtension);
framework.loadExtension(RapidExtension);
framework.loadExtension(DesignerExtension);
framework.loadExtension(DesignerHudExtension);
framework.loadExtension(AppExtension);
framework.loadExtension(LinkshopExtension);
framework.loadExtension(ShopfloorExtension);

RapidExtensionSetting.setDefaultRendererPropsOfRendererType("rapidCurrencyRenderer", {
  usingThousandSeparator: true,
  decimalPlaces: 2,
  currencyCode: "CNY",
});

export interface GenerateRuiPageConfigOption<TPage = RapidPage> {
  sdPage: TPage;
  entities: RapidEntity[];
  dataDictionaries: RapidDataDictionary[];
}

export function generateRuiPage(option: GenerateRuiPageConfigOption) {
  const { sdPage } = option;
  const viewRocks = (sdPage.view ? (sdPage.view.length ? sdPage.view : [sdPage.view]) : []) as RockConfig[];

  const ruiPageConfig: PageConfig = {
    $id: sdPage.code,
    stores: sdPage.stores || [],
    view: viewRocks.map((child, index) => {
      return {
        $type: "box",
        $id: `page-section-${index + 1}`,
        className: "rui-page-section",
        children: child,
      };
    }),
    eventSubscriptions: sdPage.eventSubscriptions,
  };

  return ruiPageConfig;
}

export type Params = {
  code: string;
};

type ViewModel = {
  myProfile?: any;
  myAllowedActions: string[];
  pageAccessAllowed: boolean;
  appId: string;
  shopfloorApp: ShopfloorApp;
  entities: RapidEntity[];
  dataDictionaries: RapidDataDictionary[];
};

export const loader: LoaderFunction = async ({ context, request, params }) => {
  const appDefinition = context.appDefinition as AppDefinition;

  const myProfile = (
    await rapidService.get(`me`, {
      headers: {
        Cookie: request.headers.get("Cookie"),
      },
    })
  ).data?.user;

  if (!myProfile) {
    return redirectToSignin(request.url);
  }

  const myAllowedActions = (
    await rapidService.get(`app/listMyAllowedSysActions`, {
      headers: {
        Cookie: request.headers.get("Cookie"),
      },
    })
  ).data;

  let { searchParams } = new URL(request.url);
  let appId = searchParams.get("appId");
  const shopfloorApps = (
    await rapidService.post(
      `shopfloor/shopfloor_apps/operations/find`,
      {
        filters: [
          {
            field: "id",
            operator: "eq",
            value: appId,
          },
        ],
        properties: ["id", "name", "content"],
      },
      {
        headers: {
          Cookie: request.headers.get("Cookie"),
        },
      },
    )
  ).data.list;

  const shopfloorApp = first(shopfloorApps);

  return {
    myProfile,
    myAllowedActions,
    appId,
    shopfloorApp,
    entities: appDefinition.entities,
    dataDictionaries: appDefinition.dataDictionaries,
    pageAccessAllowed: true,
  };
};

export default function Index() {
  const viewModel = useLoaderData<ViewModel>();
  const { myProfile, myAllowedActions, pageAccessAllowed, appId, shopfloorApp, entities, dataDictionaries } = viewModel as ViewModel;

  framework.registerExpressionVar("me", {
    profile: myProfile,
    allowedActions: myAllowedActions,
  });

  rapidAppDefinition.setAppDefinition({
    entities,
    dataDictionaries,
  });

  const page = useMemo(() => {
    let ruiPageConfig: PageConfig | undefined;
    if (!pageAccessAllowed) {
      ruiPageConfig = {
        view: [{ $type: "text", text: `You are not allowed to visit this page.` }],
      };
      return new Page(framework, ruiPageConfig);
    }

    if (!shopfloorApp) {
      ruiPageConfig = {
        view: [{ $type: "text", text: `Shopfloor app with id '${appId}' was not found.` }],
      };
      return new Page(framework, ruiPageConfig);
    }

    ruiPageConfig = {
      $id: "designerPage",
      stores: [
        {
          type: "linkshopAppDesignerStore",
          name: "designerStore",
          appId,
          appConfig: shopfloorApp?.content || {},
          stores: get(shopfloorApp?.content, "stores", []),
        },
      ],
      view: [
        {
          $type: "linkshopBuilderToolbar",
        },
        {
          $type: "antdLayout",
          children: [
            {
              $type: "antdLayoutSider",
              width: "300px",
              theme: "light",
              style: {
                padding: "5px",
                borderRight: "1px solid #eee",
              },
              children: [
                {
                  $type: "antdTabs",
                  size: "small",
                  type: "card",
                  style: {
                    height: "calc(100vh - 72px - 45px - 10px)",
                    overflow: "auto",
                  },
                  tabBarStyle: {
                    marginBottom: "5px",
                  },
                  items: [
                    {
                      key: "steps",
                      label: "步骤",
                      children: [
                        {
                          $id: "linkshopBuilderLayoutsPanel",
                          $type: "linkshopBuilderLayoutsPanel",
                        },
                        {
                          $id: "linkshopBuilderStepsPanel",
                          $type: "linkshopBuilderStepsPanel",
                        },
                      ],
                    },
                    {
                      key: "components",
                      label: "组件",
                      children: [
                        {
                          $id: "linkshopBuilderComponentsPanel",
                          $type: "linkshopBuilderComponentsPanel",
                          style: {
                            overflow: "auto",
                          },
                          $exps: {
                            designerStore: "$stores.designerStore",
                          },
                        },
                      ],
                    },
                    {
                      key: "stores",
                      label: "数据",
                      children: [
                        {
                          $id: "linkshopBuilderStoresPanel",
                          $type: "linkshopBuilderStoresPanel",
                        },
                        {
                          $id: "linkshopBuilderRecordsPanel",
                          $type: "linkshopBuilderRecordsPanel",
                        },
                      ],
                    },
                    {
                      key: "variables",
                      label: "变量",
                      children: [
                        {
                          $id: "linkshopBuilderVariablesPanel",
                          $type: "linkshopBuilderVariablesPanel",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              $type: "antdLayoutContent",
              children: [
                {
                  $type: "antdLayout",
                  children: [
                    {
                      $type: "antdLayoutContent",
                      children: [
                        {
                          $type: "box",
                          width: "100%",
                          height: "100%",
                          padding: "20px 50px 50px",
                          backgroundColor: "#F4F5F7",
                          style: {
                            position: "relative",
                            overflow: "auto",
                          },
                          children: [
                            {
                              $type: "htmlElement",
                              $id: "stepTitle",
                              htmlTag: "div",
                              style: {
                                width: "1200px",
                                height: "30px",
                                lineHeight: "30px",
                              },
                              children: [
                                {
                                  $type: "text",
                                  $exps: {
                                    text: "$stores.designerStore.currentStep?.$name || $stores.designerStore.currentLayout?.$name || 'N/A'",
                                  },
                                },
                              ],
                            },
                            {
                              $type: "htmlElement",
                              $id: "previewIFrame",
                              htmlTag: "iframe",
                              attributes: {
                                id: "previewIFrame",
                                frameBorder: "0",
                                src: "/shopfloor/design-preview",
                              },
                              style: {
                                display: "block",
                                width: "1200px",
                                height: "900px",
                              },
                            },
                            {
                              $id: "designerHud",
                              $type: "designerHud",
                              style: {
                                position: "absolute",
                                top: "50px",
                                left: "50px",
                              },
                              width: 1200,
                              height: 900,
                              onWidgetSelected: {
                                $action: "script",
                                script: (event: any) => {
                                  const page = event.page;
                                  const nodeId = event.args[0]?.$id;
                                  page.getStore("designerStore").setSelectedComponentTreeNode("", nodeId);
                                },
                              },
                              onWidgetRectChange: {
                                $action: "script",
                                script: (event: any) => {
                                  const page = event.page;
                                  const widgetMovedPayload: HudWidgetRectChangeEvent = event.args[0];
                                  sendDesignerCommand(page, page.getStore("designerStore"), {
                                    name: "setComponentProperties",
                                    payload: {
                                      componentId: widgetMovedPayload.id,
                                      props: {
                                        left: widgetMovedPayload.left,
                                        top: widgetMovedPayload.top,
                                        width: widgetMovedPayload.width,
                                        height: widgetMovedPayload.height,
                                      },
                                    },
                                  });
                                },
                              },
                              onShortKeyEventHandle: {
                                $action: "script",
                                script: (event: any) => {
                                  console.log(event);
                                  const page = event.page;
                                  const payload = event.args[0];
                                  if (payload.type === "copy") {
                                    sendDesignerCommand(page, page.getStore("designerStore"), {
                                      name: "copyComponents",
                                      payload: {
                                        componentIds: [payload.widgetId],
                                      },
                                    });
                                  }

                                  if (payload.type === "cut") {
                                    sendDesignerCommand(page, page.getStore("designerStore"), {
                                      name: "cutComponents",
                                      payload: {
                                        componentIds: [payload.widgetId],
                                      },
                                    });
                                  }

                                  if (payload.type === "paste") {
                                    sendDesignerCommand(page, page.getStore("designerStore"), {
                                      name: "pasteComponents",
                                      payload: {},
                                    });
                                  }

                                  if (payload.type === "delete") {
                                    sendDesignerCommand(page, page.getStore("designerStore"), {
                                      name: "removeComponents",
                                      payload: {
                                        componentIds: [payload.widgetId],
                                      },
                                    });
                                  }
                                },
                              },
                              $exps: {
                                widgets: "hud.hudItemsFromRockChildrenConfig($stores.designerStore.page.getConfig().view)",
                              },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $type: "antdLayoutSider",
                      width: 300,
                      theme: "light",
                      style: {
                        padding: "5px",
                        borderLeft: "1px solid #eee",
                      },
                      children: [
                        {
                          $type: "antdTabs",
                          size: "small",
                          type: "card",
                          style: {
                            height: "calc(100vh - 72px - 45px - 10px)",
                            overflow: "auto",
                          },
                          tabBarStyle: {
                            marginBottom: "5px",
                          },
                          items: [
                            {
                              key: "steps",
                              label: "属性",
                              children: [
                                {
                                  $id: "linkshopBuilderLayoutPropertiesPanel",
                                  $type: "linkshopBuilderLayoutPropertiesPanel",
                                  $exps: {
                                    designerStore: "$stores.designerStore",
                                    _hidden: "!$stores.designerStore.currentLayout || $stores.designerStore.selectedComponentId",
                                  },
                                },
                                {
                                  $id: "linkshopBuilderStepPropertiesPanel",
                                  $type: "linkshopBuilderStepPropertiesPanel",
                                  $exps: {
                                    designerStore: "$stores.designerStore",
                                    _hidden: "!$stores.designerStore.currentStep || $stores.designerStore.selectedComponentId",
                                  },
                                },
                                {
                                  $id: "designerComponentPropertiesPanel",
                                  $type: "designerComponentPropertiesPanel",
                                  onSettingPropExpression: [
                                    {
                                      $action: "setComponentProperty",
                                      componentId: "componentPropExpSetter",
                                      propName: "propName",
                                      propValue: "",
                                      $exps: {
                                        propValue: "$event.args[0]",
                                      },
                                    } as RockEventHandlerSetComponentProperty,
                                    {
                                      $action: "setComponentProperty",
                                      componentId: "componentPropExpSettingModal",
                                      propName: "open",
                                      propValue: true,
                                    } as RockEventHandlerSetComponentProperty,
                                    {
                                      $action: "sendComponentMessage",
                                      componentId: "componentPropExpSetter",
                                      message: {
                                        name: "refreshView",
                                      },
                                    } as RockEventHandlerSendComponentMessage,
                                  ],
                                  $exps: {
                                    _hidden: "!$stores.designerStore.selectedComponentId",
                                    designingPage: "$stores.designerStore.page",
                                    selectedComponentId: "$stores.designerStore.selectedComponentId",
                                  },
                                },
                                {
                                  $id: "componentPropExpSettingModal",
                                  $type: "antdModal",
                                  title: "属性绑定",
                                  maskClosable: false,
                                  children: [
                                    {
                                      $id: "componentPropExpSetter",
                                      $type: "linkshopBuilderComponentExpressionSetter",
                                      $exps: {
                                        _hidden: "!$stores.designerStore.selectedComponentId",
                                        designerStore: "$stores.designerStore",
                                      },
                                    },
                                  ],
                                  onOk: [
                                    {
                                      $action: "sendComponentMessage",
                                      componentId: "componentPropExpSetter",
                                      message: {
                                        name: "commitChanges",
                                      },
                                    } as RockEventHandlerSendComponentMessage,
                                    {
                                      $action: "setComponentProperty",
                                      componentId: "componentPropExpSettingModal",
                                      propName: "open",
                                      propValue: false,
                                    } as RockEventHandlerSetComponentProperty,
                                  ],
                                  onCancel: [
                                    {
                                      $action: "setComponentProperty",
                                      componentId: "componentPropExpSettingModal",
                                      propName: "open",
                                      propValue: false,
                                    } as RockEventHandlerSetComponentProperty,
                                  ],
                                },
                              ],
                            },
                            {
                              key: "events",
                              label: "事件",
                              children: [
                                {
                                  $id: "designerComponentEventHandlersPanel",
                                  $type: "designerComponentEventHandlersPanel",
                                  $exps: {
                                    designingPage: "$stores.designerStore.page",
                                    selectedComponentId: "$stores.designerStore.selectedComponentId",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const page = new Page(framework, ruiPageConfig);
    return page;
  }, [appId, shopfloorApp, pageAccessAllowed]);

  const profileMenuItems: MenuProps["items"] = [
    {
      key: "signout",
      label: <a href="/api/signout">登出</a>,
      icon: <ExportOutlined rev={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
    },
  ];

  return (
    <>
      <PageHeader
        title={shopfloorApp?.name}
        extra={
          <div>
            <Dropdown menu={{ items: profileMenuItems }}>
              <div className="rui-current-user-indicator">
                <Avatar icon={<UserOutlined rev={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />} />
                {"" + myProfile?.name}
              </div>
            </Dropdown>
          </div>
        }
      ></PageHeader>
      <Rui framework={framework} page={page} />
    </>
  );
}
