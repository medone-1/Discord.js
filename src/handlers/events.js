import { readdirSync } from "fs";
import { log } from "../functions.js";
import { MedoneEventBuilder } from "../classes/events.js";

export default async (client) => {
  for (const dir of readdirSync("./src/events/")) {
    for (const file of readdirSync("./src/events/" + dir).filter((f) =>
      f.endsWith(".js"),
    )) {
      const { default: module } = await import("../events/" + dir + "/" + file);

      if (!module) continue;

      if (!(module instanceof MedoneEventBuilder)) {
        log(
          `Unable to load the *event* [${dir}/${file}] due to incorrect export type.`,
          "warn",
        );
        continue;
      }

      if (!module.data.event || !module.data.run) {
        log(
          `Unable to load the *event* [${dir}/${file}] due to missing event name or/and run function.`,
          "warn",
        );

        continue;
      }

      log(`*Event* loaded to the client [${dir}/${file}].`, "done");

      if (module.data.once) {
        client.once(module.data.event, (...args) =>
          module.data.run(client, ...args),
        );
      } else {
        client.on(module.data.event, (...args) =>
          module.data.run(client, ...args),
        );
      }
    }
  }
};

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
