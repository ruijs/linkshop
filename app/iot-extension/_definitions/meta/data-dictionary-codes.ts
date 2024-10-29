const dictionaryCodes = [
  'IotDataType',
  'IotTriggerEventType',
] as const;
export type TDictionaryCodes = typeof dictionaryCodes[number];
