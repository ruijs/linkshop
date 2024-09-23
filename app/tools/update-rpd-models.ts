import path from "path";
import { type RapidModelsUpdateOptions, RapidModelsUpdater } from "@ruiapp/rapid-configure-tools";
import { program } from "commander";

program
  .option("-a --app-path <string>", "app path, if not exists then create", "");

program.parse();

const options = program.opts();


const dataDictionaryModels = require(`~/${options.appPath}/_definitions/meta/data-dictionary-models`).default;
const entityModels = require(`~/${options.appPath}/_definitions/meta/entity-models`).default;

const env = process.env;

const updateOptions: RapidModelsUpdateOptions = {
  appDataDirLocation: path.join(__dirname, "..", ".benzene-data"),
  rapidApiUrl: env.RAPID_API_URL || "http://127.0.0.1:3000/api",
  entities: entityModels,
  dataDictionaries: dataDictionaryModels,
};

const updater = new RapidModelsUpdater(updateOptions);
updater.updateRapidSystemConfigurations();
