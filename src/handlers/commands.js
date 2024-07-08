import { readdirSync } from "fs";
import {
  MedoneSlashCommandBuilder,
  MedoneMessageCommandBuilder,
} from "../classes/Commands.js";
import { log } from "../functions.js";

export default async (client) => {
  for (const type of readdirSync("./src/commands/")) {
    for (const dir of readdirSync("./src/commands/" + type)) {
      for (const file of readdirSync(
        "./src/commands/" + type + "/" + dir,
      ).filter((f) => f.endsWith(".js"))) {
        const module = await import(
          "../commands/" + type + "/" + dir + "/" + file
        );

        if (!module) continue;
        const command = module.default;

        if (type === "slash") {
          if (!(command instanceof MedoneSlashCommandBuilder)) {
            log(
              `Unable to load the *slash* command [${dir}/${file}] due to incorrect export type.`,
              "warn",
            );
            continue;
          }
          log(`*Slash* command loaded to the client [${dir}/${file}].`, "done");
          client.medone.commands.slashcommands[command.data.command.name] =
            command;
          client.applicationcommandsArray.push(command.data.command);
        } else if (type === "prefix") {
          if (!(command instanceof MedoneMessageCommandBuilder)) {
            log(
              `Unable to load the *prefix* command [${dir}/${file}] due to incorrect export type.`,
              "warn",
            );
            continue;
          }
          if (command.data.aliases && Array.isArray(command.data.aliases)) {
            for (const a of command.data.aliases) {
              client.medone.commands.prefixcommandsaliases[a] =
                command.data.name;
            }
          }
          log(
            `*Prefix* command loaded to the client [${dir}/${file}].`,
            "done",
          );
          client.medone.commands.prefixcommands[command.data.name] = command;
        } else if (type === "nonprefix") {
          if (!(command instanceof MedoneMessageCommandBuilder)) {
            log(
              `Unable to load the *non prefix* command [${dir}/${file}] due to incorrect export type.`,
              "warn",
            );
            continue;
          }
          if (command.data.aliases && Array.isArray(command.data.aliases)) {
            for (const a of command.data.aliases) {
              client.medone.commands.nonprefixcommandsaliases[a] =
                command.data.name;
            }
          }
          log(
            `*nonPrefix* command loaded to the client [${dir}/${file}].`,
            "done",
          );
          client.medone.commands.nonprefixcommands[command.data.name] = command;
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
