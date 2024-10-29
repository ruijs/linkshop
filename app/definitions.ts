import type { RapidEntity, RapidPageLoader, RapidDataDictionary } from "@ruiapp/rapid-extension";
import type { EntityWatcherType, ServerOperation, CronJobConfiguration } from "@ruiapp/rapid-core";


const entityModels: RapidEntity[] = [];
const pageModels: RapidPageLoader[] = [];
const dataDictionaryModels: RapidDataDictionary[] = [];
const entityWatchers: EntityWatcherType[] = [];
const serverOperations: ServerOperation[] = [];
const cronJobConfigurations: CronJobConfiguration[] = [];

// TODO
// dynamic import

entityModels.push(...require(`~/_definitions/meta/entity-models`).default);
pageModels.push(...require(`~/_definitions/meta/page-models`).default);
dataDictionaryModels.push(...require(`~/_definitions/meta/data-dictionary-models`).default);
entityWatchers.push(...require(`~/_definitions/meta/entity-watchers`).default);
serverOperations.push(...require(`~/_definitions/meta/server-operations`).default);
cronJobConfigurations.push(...require(`~/_definitions/meta/cron-jobs`).default);

entityModels.push(...require(`~/iot-extension/_definitions/meta/entity-models`).default);
pageModels.push(...require(`~/iot-extension/_definitions/meta/page-models`).default);
dataDictionaryModels.push(...require(`~/iot-extension/_definitions/meta/data-dictionary-models`).default);
entityWatchers.push(...require(`~/iot-extension/_definitions/meta/entity-watchers`).default);
serverOperations.push(...require(`~/iot-extension/_definitions/meta/server-operations`).default);
cronJobConfigurations.push(...require(`~/iot-extension/_definitions/meta/cron-jobs`).default);

export {
  entityModels,
  pageModels,
  dataDictionaryModels,
  entityWatchers,
  serverOperations,
  cronJobConfigurations,
};
