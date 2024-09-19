import type { RapidPageLoader } from "@ruiapp/rapid-extension";
import AppNavItemListPage from "../models/pages/AppNavItemListPage";
import account$AccountChangePasswordPage from "../models/pages/account/AccountChangePasswordPage";
import account$AccountNotificationListPage from "../models/pages/account/AccountNotificationListPage";
import account$AccountProfilePage from "../models/pages/account/AccountProfilePage";
import meta$MetaDataDictionaryListPage from "../models/pages/meta/MetaDataDictionaryListPage";
import meta$MetaModelDetailsPage from "../models/pages/meta/MetaModelDetailsPage";
import meta$MetaModelListPage from "../models/pages/meta/MetaModelListPage";
import meta$MetaRouteListPage from "../models/pages/meta/MetaRouteListPage";
import meta$MetaModelDataPage from "../models/pages/meta/MetaModelDataPage";
import oc$OcDepartmentListPage from "../models/pages/oc/OcDepartmentListPage";
import oc$OcRoleDetailsPage from "../models/pages/oc/OcRoleDetailsPage";
import oc$OcRoleListPage from "../models/pages/oc/OcRoleListPage";
import oc$OcUserListPage from "../models/pages/oc/OcUserListPage";
import setting$SystemSettingItemSettingPage from "../models/pages/setting/SystemSettingItemSettingPage";
import setting$SystemSettingsPage from "../models/pages/setting/SystemSettingsPage";
import shopfloor$ShopfloorAppDetailsPage from "../models/pages/shopfloor/ShopfloorAppDetailsPage";
import shopfloor$ShopfloorAppListPage from "../models/pages/shopfloor/ShopfloorAppListPage";
import shopfloor$ShopfloorDisplayDeviceListPage from "../models/pages/shopfloor/ShopfloorDisplayDeviceListPage";
import shopfloor$ShopfloorStationListPage from "../models/pages/shopfloor/ShopfloorStationListPage";
import sys$SysActionListPage from "../models/pages/sys/SysActionListPage";

export default [
  AppNavItemListPage,
  account$AccountChangePasswordPage,
  account$AccountNotificationListPage,
  account$AccountProfilePage,
  meta$MetaDataDictionaryListPage,
  meta$MetaModelDetailsPage,
  meta$MetaModelListPage,
  meta$MetaRouteListPage,
  meta$MetaModelDataPage,
  oc$OcDepartmentListPage,
  oc$OcRoleDetailsPage,
  oc$OcRoleListPage,
  oc$OcUserListPage,
  setting$SystemSettingItemSettingPage,
  setting$SystemSettingsPage,
  shopfloor$ShopfloorAppDetailsPage,
  shopfloor$ShopfloorAppListPage,
  shopfloor$ShopfloorDisplayDeviceListPage,
  shopfloor$ShopfloorStationListPage,
  sys$SysActionListPage,
] as RapidPageLoader[];
