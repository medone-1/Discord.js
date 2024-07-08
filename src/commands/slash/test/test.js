import { SlashCommandBuilder } from "discord.js";
import { MedoneSlashCommandBuilder } from "../../../classes/Commands.js";

export default new MedoneSlashCommandBuilder()
  .setCommand(new SlashCommandBuilder().setName("test").setDescription("test"))
  .setNSFW(false)
  .setCategory("commands")
  .setCooldown(5000)
  .setUserPerms(["SendMessages", "ManageRoles"])
  .setBotPerms(["Administrator"])
  .setRun(async (client, interaction) => {
    interaction.reply("hello world");
  });

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
