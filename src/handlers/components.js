import { readdirSync } from "fs";
import { log } from "../functions.js";
import { MedoneComponentBuilder } from "../classes/Components.js";

export default async (client) => {
  for (const type of readdirSync("./src/components/")) {
    for (const dir of readdirSync("./src/components/" + type)) {
      for (const file of readdirSync(
        "./src/components/" + type + "/" + dir,
      ).filter((f) => f.endsWith(".js"))) {
        const module = await import(
          "../components/" + type + "/" + dir + "/" + file
        );

        if (!module) continue;
        const component = module.default;

        // check if the component is a instance of the correct type
        if (!(component instanceof MedoneComponentBuilder)) {
          log(
            `Unable to load the *component* [${dir}/${file}] due to incorrect export type.`,
            "warn",
          );
          continue;
        }

        // if the component is a button
        if (type === "buttons") {
          log(
            `*Button* component loaded to the client [${dir}/${file}].`,
            "done",
          );
          client.medone.components.buttons[component.data.id] = component;

          // if the component is a modal
        } else if (type === "modals") {
          log(
            `*modal* component loaded to the client [${dir}/${file}].`,
            "done",
          );
          client.medone.components.modals[component.data.id] = component;

          // if the component is a select
        } else if (type === "selects") {
          log(
            `*select* component loaded to the client [${dir}/${file}].`,
            "done",
          );
          client.medone.components.selects[component.data.id] = component;
        }
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
