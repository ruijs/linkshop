import type { RapidDataDictionary as TRapidDataDictionary } from '@ruiapp/rapid-extension';
import ActiveInactiveState from '../models/data-dictionaries/ActiveInactiveState';
import ApprovalState from '../models/data-dictionaries/ApprovalState';
import ConfirmationState from '../models/data-dictionaries/ConfirmationState';
import DataDictionaryValueType from '../models/data-dictionaries/DataDictionaryValueType';
import DocumentType from '../models/data-dictionaries/DocumentType';
import EmployeeState from '../models/data-dictionaries/EmployeeState';
import EnabledDisabledState from '../models/data-dictionaries/EnabledDisabledState';
import FormFieldType from '../models/data-dictionaries/FormFieldType';
import MetaDataDictionaryLevel from '../models/data-dictionaries/MetaDataDictionaryLevel';
import MetaPropertyType from '../models/data-dictionaries/MetaPropertyType';
import MetaRouteHttpMethod from '../models/data-dictionaries/MetaRouteHttpMethod';
import MetaRouteType from '../models/data-dictionaries/MetaRouteType';
import PublishState from '../models/data-dictionaries/PublishState';
import UndeletedDeletedState from '../models/data-dictionaries/UndeletedDeletedState';
import setting$SettingItemType from '../models/data-dictionaries/setting/SettingItemType';

export default [
  ActiveInactiveState,
  ApprovalState,
  ConfirmationState,
  DataDictionaryValueType,
  DocumentType,
  EmployeeState,
  EnabledDisabledState,
  FormFieldType,
  MetaDataDictionaryLevel,
  MetaPropertyType,
  MetaRouteHttpMethod,
  MetaRouteType,
  PublishState,
  UndeletedDeletedState,
  setting$SettingItemType,
] as TRapidDataDictionary[];
