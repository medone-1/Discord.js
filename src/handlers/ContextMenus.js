import { readdirSync } from "fs";
import { log } from "../functions.js";
import { MedoneContextMenuBuilder } from "../classes/ContextMenus.js";

export default async (client) => {
  for (const type of readdirSync("./src/context_menus/")) {
    for (const dir of readdirSync("./src/context_menus/" + type)) {
      for (const file of readdirSync(
        "./src/context_menus/" + type + "/" + dir,
      ).filter((f) => f.endsWith(".js"))) {
        const module = await import(
          "../context_menus/" + type + "/" + dir + "/" + file
        );

        if (!module) continue;
        const command = module.default;

        if (type === "user") {
          if (!(command instanceof MedoneContextMenuBuilder)) {
            log(
              `Unable to load the *user* context menu [${dir}/${file}] due to incorrect export type.`,
              "warn",
            );
            continue;
          }
          log(
            `*User* context menu loaded to the client [${dir}/${file}].`,
            "done",
          );
          command.data.command.setType(2);
          client.medone.contextMenus.user[command.data.command.name] = command;
          client.applicationcommandsArray.push(command.data.command);
        } else if (type === "message") {
          if (!(command instanceof MedoneContextMenuBuilder)) {
            log(
              `Unable to load the *message* context menu [${dir}/${file}] due to incorrect export type.`,
              "warn",
            );
            continue;
          }
          log(
            `*Message* context menu loaded to the client [${dir}/${file}].`,
            "done",
          );
          command.data.command.setType(3);
          client.medone.contextMenus.message[command.data.command.name] =
            command;
          client.applicationcommandsArray.push(command.data.command);
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
