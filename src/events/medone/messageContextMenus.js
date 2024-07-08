import { MedoneEventBuilder } from "../../classes/events.js";
import { log } from "../../functions.js";
import config from "../../config.js";

export default new MedoneEventBuilder()
  .setEvent("interactionCreate")
  .setOnce(false)
  .setRun(async (client, interaction) => {
    // return if the intraction is not in a guild
    if (!interaction.guild) return;

    // check if the instraction is a context menu
    if (
      !interaction.isMessageContextMenuCommand() ||
      !config.ContextMenus.message
    )
      return;

    // get the context menu from the selects collection
    /**
     * @type {import('../../classes/ContextMenus.js').MedoneContextMenuBuilder} contextmenu
     */
    const contextmenu =
      client.aphlaton.contextMenus.message[interaction.commandName];

    // return if the command doesn't exist
    if (!contextmenu) return;

    // check for the cooldown
    if (contextmenu.data.cooldown > 0) {
      // the cooldown key
      const key = `m${interaction.user.id}${interaction.commandName}`;
      // if the user noy under cooldown
      if (!client.medone.cooldowns.has(key)) {
        client.medone.cooldowns.set(key, 0);
        setTimeout(
          () => client.medone.cooldowns.delete(key),
          contextmenu.data.cooldown,
        );
        // if the user is under cooldown
      } else {
        interaction.reply(
          `please wait \`${contextmenu.data.cooldown / 1000}\` seconds before using this command again.`,
        );
        return;
      }
    }

    // check the bot perms
    for (const per of contextmenu.data.botPerms) {
      if (!interaction.guild.members.me.permissions.has(per)) {
        if (interaction.isRepliable()) {
          interaction.reply(
            `i need the \`${per}\` permission to execute this command.`,
          );
        }
        return;
      }
    }

    // check the member perms
    for (const per of contextmenu.data.userPerms) {
      if (!interaction.member.permissions.has(per)) {
        if (interaction.isRepliable()) {
          interaction.reply(
            `you need the \`${per}\` permission to use this command.`,
          );
        }
        return;
      }
    }

    // check the nsfw
    if (contextmenu.data.nsfw && !interaction.channel.nsfw) {
      if (interaction.isRepliable()) {
        interaction.reply("this command can only be used in nsfw channels.");
      }
      return;
    }

    // check the developers perm
    if (
      contextmenu.data.developersOnly &&
      !config.users.developers.includes(interaction.user.id)
    ) {
      if (interaction.isRepliable()) {
        interaction.reply("only developers can use this command.");
      }
      return;
    }

    contextmenu.data.run(client, interaction).catch((error) => {
      log(
        "An error occured while executing the command: " +
          contextmenu.data.command.name,
        "err",
      );
      console.log(error);
    });
  });

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
