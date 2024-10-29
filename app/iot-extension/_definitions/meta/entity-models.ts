import type { RapidEntity as TRapidEntity } from '@ruiapp/rapid-extension';
import { autoConfigureRapidEntity } from '@ruiapp/rapid-extension';
import DataSource from '../models/entities/DataSource';
import Machine from '../models/entities/Machine';
import MachineAttribute from '../models/entities/MachineAttribute';
import MachineAttributeBind from '../models/entities/MachineAttributeBind';
import MachineField from '../models/entities/MachineField';
import MachineState from '../models/entities/MachineState';
import MachineTrigger from '../models/entities/MachineTrigger';
import MachineType from '../models/entities/MachineType';

const entityDefinitions = [
  DataSource,
  Machine,
  MachineAttribute,
  MachineAttributeBind,
  MachineField,
  MachineState,
  MachineTrigger,
  MachineType,
];
const configuredEntities:TRapidEntity[] = [
  autoConfigureRapidEntity(DataSource, entityDefinitions),
  autoConfigureRapidEntity(Machine, entityDefinitions),
  autoConfigureRapidEntity(MachineAttribute, entityDefinitions),
  autoConfigureRapidEntity(MachineAttributeBind, entityDefinitions),
  autoConfigureRapidEntity(MachineField, entityDefinitions),
  autoConfigureRapidEntity(MachineState, entityDefinitions),
  autoConfigureRapidEntity(MachineTrigger, entityDefinitions),
  autoConfigureRapidEntity(MachineType, entityDefinitions),
];
export default configuredEntities;
