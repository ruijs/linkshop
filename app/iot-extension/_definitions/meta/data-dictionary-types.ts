/**
 * IoT数据类型
 */
export type IotDataType =
  | 'integer'
  | 'long'
  | 'float'
  | 'double'
  | 'boolean'
  | 'text'
  ;

/**
 * IoT触发器事件类型
 */
export type IotTriggerEventType =
  | 'specifyAttributeOutput'
  | 'anyAttributeOutput'
  | 'machineStateChange'
  ;
