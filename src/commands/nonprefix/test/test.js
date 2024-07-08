import { MedoneMessageCommandBuilder } from "../../../classes/Commands.js";

export default new MedoneMessageCommandBuilder()
  .setName(`test`)
  .setDescription(`this is a test command`)
  .setAliases(["t", "tests"])
  .setCooldown(5000)
  .setNSFW(false)
  .setUsage([`test`])
  .setExamples([`test`])
  .setUserPerms([`SendMessages`, `ManageRoles`])
  .setUserPerms(["Administrator"])
  .setCategory("commands")
  .setRun(async (client, message, args) => {
    message.reply(`hello world`);
  });

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
