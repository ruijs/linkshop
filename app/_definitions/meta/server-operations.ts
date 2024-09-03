import type { ServerOperation as TServerOperation } from '@ruiapp/rapid-core';
import notification$readAllNotifications from '../models/server-operations/notification/readAllNotifications';
import sys$listMyAllowedSysActions from '../models/server-operations/sys/listMyAllowedSysActions';

export default [
  notification$readAllNotifications,
  sys$listMyAllowedSysActions,
] as TServerOperation[];
