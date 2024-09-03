const dictionaryCodes = [
  'ActiveInactiveState',
  'ApprovalState',
  'ConfirmationState',
  'DataDictionaryValueType',
  'DocumentType',
  'EmployeeState',
  'EnabledDisabledState',
  'FormFieldType',
  'DataDictionaryLevel',
  'PropertyType',
  'RouteHttpMethod',
  'RouteType',
  'PublishState',
  'UndeletedDeletedState',
  'SettingItemType',
] as const;
export type TDictionaryCodes = typeof dictionaryCodes[number];
