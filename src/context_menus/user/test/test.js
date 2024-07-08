import { ContextMenuCommandBuilder } from "discord.js";
import { MedoneContextMenuBuilder } from "../../../classes/ContextMenus.js";

export default new MedoneContextMenuBuilder()
  .setCommand(new ContextMenuCommandBuilder().setName("test"))
  .setNSFW(false)
  .setCooldown(5000)
  .setBotPerms([`Administrator`])
  .setUserPerms([`SendMessages`, `ManageRoles`])
  .setRun(async (client, interaction) => {
    interaction.reply(`hello user`);
  });

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
