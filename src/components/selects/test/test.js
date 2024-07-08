import { MedoneComponentBuilder } from "../../../classes/Components.js";

export default new MedoneComponentBuilder()
  .setId("test")
  .setCooldown(5000)
  .setBotPerms([`Administrator`])
  .setUserPerms(["SendMessages", `ManageRoles`])
  .setRun(async (client, interaction) => {
    if (interaction.isRepliable()) {
      interaction.reply(`hello world, am a select menu`);
    } else {
      interaction.channel.send(`hello world, am a select menu`);
    }
  });

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
