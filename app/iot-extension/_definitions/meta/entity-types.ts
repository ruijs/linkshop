import type {
  IotDataType,
  IotTriggerEventType,
} from "./data-dictionary-types";
/**
 * IoT数据源
 */
export interface IotDataSource {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 编号
   */
  code: string;
  /**
   * 备注
   */
  description?: string;
  /**
   * 配置
   */
  config?: Record<string, any>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<undefined>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<undefined>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  deletedBy?: Partial<undefined>;
}

/**
 * IoT数据源
 */
export type SaveIotDataSourceInput = Omit<IotDataSource, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 机器
 */
export interface IotMachine {
  /**
   * id
   */
  id: number;
  /**
   * 机器号
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 备注
   */
  description?: string;
  /**
   * 最新字段
   */
  latestFields?: Record<string, any>;
  /**
   * 运行时字段
   */
  runtimeFields?: Record<string, any>;
  /**
   * 机器类型
   */
  machineType: Partial<IotMachineType>;
  /**
   * 状态
   */
  state?: Partial<IotMachineState>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<undefined>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<undefined>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  deletedBy?: Partial<undefined>;
}

/**
 * 机器
 */
export type SaveIotMachineInput = Omit<IotMachine, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 机器属性
 */
export interface IotMachineAttribute {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 编号
   */
  code: string;
  /**
   * 备注
   */
  description?: string;
  /**
   * 数据类型
   */
  dataType: IotDataType;
  /**
   * 已配机器类型
   */
  machines?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<undefined>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<undefined>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  deletedBy?: Partial<undefined>;
}

/**
 * 机器属性
 */
export type SaveIotMachineAttributeInput = Omit<IotMachineAttribute, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 机器属性绑定
 */
export interface IotMachineAttributeBind {
  /**
   * id
   */
  id: number;
  /**
   * 机器类型
   */
  machineType: Partial<IotMachineType>;
  /**
   * 机器
   */
  machine: Partial<IotMachine>;
  /**
   * 机器属性
   */
  machineAttribute: Partial<IotMachineAttribute>;
  /**
   * 数据源
   */
  dataSource: Partial<IotDataSource>;
  /**
   * 配置
   */
  config: Record<string, any>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<undefined>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<undefined>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  deletedBy?: Partial<undefined>;
}

/**
 * 机器属性绑定
 */
export type SaveIotMachineAttributeBindInput = Omit<IotMachineAttributeBind, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 机器字段
 */
export interface IotMachineField {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 编号
   */
  code: string;
  /**
   * 备注
   */
  description?: string;
  /**
   * 数据类型
   */
  dataType: IotDataType;
  /**
   * 已配机器类型
   */
  machines?: any;
  /**
   * 新纪录时置空
   */
  clearOnNew?: boolean;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<undefined>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<undefined>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  deletedBy?: Partial<undefined>;
}

/**
 * 机器字段
 */
export type SaveIotMachineFieldInput = Omit<IotMachineField, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 机器状态
 */
export interface IotMachineState {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 编号
   */
  code: string;
  /**
   * 备注
   */
  description?: string;
  /**
   * 颜色
   */
  color: string;
  /**
   * 标记为工作中
   */
  isUptime?: boolean;
  /**
   * 已配机器类型
   */
  machines?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<undefined>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<undefined>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  deletedBy?: Partial<undefined>;
}

/**
 * 机器状态
 */
export type SaveIotMachineStateInput = Omit<IotMachineState, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 机器触发器
 */
export interface IotMachineTrigger {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 备注
   */
  description?: string;
  /**
   * 机器类型
   */
  machineType: Partial<IotMachineType>;
  /**
   * 事件类型
   */
  eventType: IotTriggerEventType;
  /**
   * 事件触发配置
   */
  eventValue: Record<string, any>;
  /**
   * 事件脚本配置
   */
  eventAction: Record<string, any>;
  /**
   * 是否启用
   */
  isEnabled?: boolean;
  /**
   * 排序
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<undefined>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<undefined>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  deletedBy?: Partial<undefined>;
}

/**
 * 机器触发器
 */
export type SaveIotMachineTriggerInput = Omit<IotMachineTrigger, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 机器类型
 */
export interface IotMachineType {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 编号
   */
  code: string;
  /**
   * 备注
   */
  description?: string;
  /**
   * 已配机器
   */
  machines?: any;
  /**
   * 机器字段
   */
  fields?: any;
  /**
   * 机器属性
   */
  attributes?: any;
  /**
   * 机器状态
   */
  states?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<undefined>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<undefined>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  deletedBy?: Partial<undefined>;
}

/**
 * 机器类型
 */
export type SaveIotMachineTypeInput = Omit<IotMachineType, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;
