/**
 * 活跃/不活跃状态
 */
export type ActiveInactiveState =
  | 'active'
  | 'inactive'
  ;

/**
 * 审批状态
 */
export type ApprovalState =
  | 'uninitiated'
  | 'approving'
  | 'approved'
  | 'rejected'
  | 'canceled'
  ;

/**
 * 确认状态
 */
export type ConfirmationState =
  | 'unconfirmed'
  | 'confirmed'
  ;

/**
 * 字典值类型
 */
export type DataDictionaryValueType =
  | 'string'
  | 'integer'
  ;

/**
 * 文档类型
 */
export type DocumentType =
  | 'directory'
  | 'file'
  | 'link'
  ;

/**
 * 员工状态
 */
export type EmployeeState =
  | 'normal'
  | 'disabled'
  | 'quitted'
  ;

/**
 * 启用/禁用状态
 */
export type EnabledDisabledState =
  | 'enabled'
  | 'disabled'
  ;

/**
 * 表单字段类型
 */
export type FormFieldType =
  | 'text'
  | 'long'
  | 'double'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'option'
  ;

/**
 * 数据字典级别
 */
export type DataDictionaryLevel =
  | 'sys'
  | 'app'
  | 'user'
  ;

/**
 * 实体属性类型
 */
export type PropertyType =
  | 'integer'
  | 'long'
  | 'float'
  | 'double'
  | 'text'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'json'
  | 'option'
  ;

/**
 * HTTP方法
 */
export type RouteHttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  ;

/**
 * 路由类型
 */
export type RouteType =
  | 'RESTful'
  ;

/**
 * 发布状态
 */
export type PublishState =
  | 'draft'
  | 'in_review'
  | 'published'
  | 'archived'
  | 'withdrawed'
  ;

/**
 * 未删除/已删除状态
 */
export type UndeletedDeletedState =
  | 'undeleted'
  | 'deleted'
  ;

/**
 * 设置项类型
 */
export type SettingItemType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'switch'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'datetime'
  | 'file'
  | 'json'
  ;
