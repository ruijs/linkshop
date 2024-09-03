import type { RapidEntity as TRapidEntity } from '@ruiapp/rapid-extension';
import { autoConfigureRapidEntity } from '@ruiapp/rapid-extension';
import AppClient from '../models/entities/AppClient';
import AppNavItem from '../models/entities/AppNavItem';
import ecm$EcmDocument from '../models/entities/ecm/EcmDocument';
import ecm$EcmRevision from '../models/entities/ecm/EcmRevision';
import ecm$EcmStorageObject from '../models/entities/ecm/EcmStorageObject';
import meta$MetaDataDictionary from '../models/entities/meta/MetaDataDictionary';
import meta$MetaDataDictionaryEntry from '../models/entities/meta/MetaDataDictionaryEntry';
import meta$MetaModel from '../models/entities/meta/MetaModel';
import meta$MetaProperty from '../models/entities/meta/MetaProperty';
import meta$MetaRoute from '../models/entities/meta/MetaRoute';
import oc$OcDepartment from '../models/entities/oc/OcDepartment';
import oc$OcRole from '../models/entities/oc/OcRole';
import oc$OcUser from '../models/entities/oc/OcUser';
import setting$SystemSettingGroupSetting from '../models/entities/setting/SystemSettingGroupSetting';
import setting$SystemSettingItem from '../models/entities/setting/SystemSettingItem';
import setting$SystemSettingItemSetting from '../models/entities/setting/SystemSettingItemSetting';
import shopfloor$ShopfloorApp from '../models/entities/shopfloor/ShopfloorApp';
import shopfloor$ShopfloorAppStep from '../models/entities/shopfloor/ShopfloorAppStep';
import shopfloor$ShopfloorAppVersion from '../models/entities/shopfloor/ShopfloorAppVersion';
import shopfloor$ShopfloorDisplayDevice from '../models/entities/shopfloor/ShopfloorDisplayDevice';
import shopfloor$ShopfloorStation from '../models/entities/shopfloor/ShopfloorStation';
import sys$SysAction from '../models/entities/sys/SysAction';
import sys$SysActionGroup from '../models/entities/sys/SysActionGroup';
import sys$SysWebhook from '../models/entities/sys/SysWebhook';
import utility$Notification from '../models/entities/utility/Notification';

const entityDefinitions = [
  AppClient,
  AppNavItem,
  ecm$EcmDocument,
  ecm$EcmRevision,
  ecm$EcmStorageObject,
  meta$MetaDataDictionary,
  meta$MetaDataDictionaryEntry,
  meta$MetaModel,
  meta$MetaProperty,
  meta$MetaRoute,
  oc$OcDepartment,
  oc$OcRole,
  oc$OcUser,
  setting$SystemSettingGroupSetting,
  setting$SystemSettingItem,
  setting$SystemSettingItemSetting,
  shopfloor$ShopfloorApp,
  shopfloor$ShopfloorAppStep,
  shopfloor$ShopfloorAppVersion,
  shopfloor$ShopfloorDisplayDevice,
  shopfloor$ShopfloorStation,
  sys$SysAction,
  sys$SysActionGroup,
  sys$SysWebhook,
  utility$Notification,
];
const configuredEntities:TRapidEntity[] = [
  autoConfigureRapidEntity(AppClient, entityDefinitions),
  autoConfigureRapidEntity(AppNavItem, entityDefinitions),
  autoConfigureRapidEntity(ecm$EcmDocument, entityDefinitions),
  autoConfigureRapidEntity(ecm$EcmRevision, entityDefinitions),
  autoConfigureRapidEntity(ecm$EcmStorageObject, entityDefinitions),
  autoConfigureRapidEntity(meta$MetaDataDictionary, entityDefinitions),
  autoConfigureRapidEntity(meta$MetaDataDictionaryEntry, entityDefinitions),
  autoConfigureRapidEntity(meta$MetaModel, entityDefinitions),
  autoConfigureRapidEntity(meta$MetaProperty, entityDefinitions),
  autoConfigureRapidEntity(meta$MetaRoute, entityDefinitions),
  autoConfigureRapidEntity(oc$OcDepartment, entityDefinitions),
  autoConfigureRapidEntity(oc$OcRole, entityDefinitions),
  autoConfigureRapidEntity(oc$OcUser, entityDefinitions),
  autoConfigureRapidEntity(setting$SystemSettingGroupSetting, entityDefinitions),
  autoConfigureRapidEntity(setting$SystemSettingItem, entityDefinitions),
  autoConfigureRapidEntity(setting$SystemSettingItemSetting, entityDefinitions),
  autoConfigureRapidEntity(shopfloor$ShopfloorApp, entityDefinitions),
  autoConfigureRapidEntity(shopfloor$ShopfloorAppStep, entityDefinitions),
  autoConfigureRapidEntity(shopfloor$ShopfloorAppVersion, entityDefinitions),
  autoConfigureRapidEntity(shopfloor$ShopfloorDisplayDevice, entityDefinitions),
  autoConfigureRapidEntity(shopfloor$ShopfloorStation, entityDefinitions),
  autoConfigureRapidEntity(sys$SysAction, entityDefinitions),
  autoConfigureRapidEntity(sys$SysActionGroup, entityDefinitions),
  autoConfigureRapidEntity(sys$SysWebhook, entityDefinitions),
  autoConfigureRapidEntity(utility$Notification, entityDefinitions),
];
export default configuredEntities;
