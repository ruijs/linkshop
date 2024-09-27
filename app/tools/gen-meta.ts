import chokidar from "chokidar";

import type { FileGenerateOption } from "@ruiapp/rapid-configure-tools";
import { MetaFileGenerator } from "@ruiapp/rapid-configure-tools";
import path from "path";
import { program } from "commander";


export function runGenerator(options: FileGenerateOption) {
  const { declarationsDirectory } = options;
  const watcher = chokidar.watch(path.join(declarationsDirectory, "models"), {
    // eslint-disable-next-line no-useless-escape
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  let initialized = false;

  let expanding = false;
  let postoned = false;

  const fileGenerator = new MetaFileGenerator();

  function tryGenerate() {
    if (expanding) {
      postoned = true;
      return;
    }

    fileGenerator.generateFiles(options);
    if (postoned) {
      fileGenerator.generateFiles(options);
    }
  }

  tryGenerate();

  watcher
    .on("all", (eventName: string, path: string) => {
      if (initialized) {
        tryGenerate();
      }
    })
    .on("ready", () => {
      tryGenerate();
      initialized = true;
    });
}

// runGenerator({
//   declarationsDirectory: path.join(__dirname, "..", "_definitions"),
// });

program
  .option("-a --app-path <string>", "app path, if not exists then create", "");

program.parse();

const options = program.opts();

[
  path.join(process.cwd(), "app", options.appPath, "_definitions"),
].forEach((dir) => {
  const fileGenerator = new MetaFileGenerator();
  fileGenerator.generateFiles({
    declarationsDirectory: dir,
  });
});
