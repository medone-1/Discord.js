import { MedoneEventBuilder } from "../../classes/events.js";
import config from "../../config.js";
import { log } from "../../functions.js";

export default new MedoneEventBuilder()
  .setEvent("messageCreate")
  .setOnce(false)
  .setRun(async (client, message) => {
    // return if the message is not from a guild or if the author is a bot
    if (message.author.bot || !message.guild) return;

    // return if the prefix commands are disabled
    if (!config.commands.prefix) return;

    // return if the message doesn't start with the prefix
    if (!message.content.startsWith(config.handler.prefix)) return;

    // get the args array and command input
    const args = message.content
      .slice(config.handler.prefix.length)
      .trim()
      .split(/ +/g);
    const commandInput = args.shift().toLowerCase();

    // return if the command doesn't exist
    if (!commandInput.length) return;

    // get the command
    /**
     * @type {import('../../classes/Commands.js').MedoneMessageCommandBuilder} command
     */
    const command =
      client.medone.commands.prefixcommands[commandInput] ||
      client.medone.commands.prefixcommands[
        client.medone.commands.prefixcommandsaliases[commandInput]
      ];

    // return if the command doesn't exist
    if (!command) return;

    // check for the cooldown
    if (command.data.cooldown > 0) {
      // the cooldown key
      const key = `p${message.author.id}${commandInput}`;
      // if the user noy under cooldown
      if (!client.medone.cooldowns.has(key)) {
        client.medone.cooldowns.set(key, 0);
        setTimeout(
          () => client.medone.cooldowns.delete(key),
          command.data.cooldown,
        );
        // if the user is under cooldown
      } else {
        message.reply(
          `please wait \`${command.data.cooldown / 1000}\` seconds before using this command again.`,
        );
        return;
      }
    }

    // check the bot perms
    for (const per of command.data.botPerms) {
      if (!message.guild.members.me.permissions.has(per)) {
        message.reply(
          `i need the \`${per}\` permission to execute this command.`,
        );
        return;
      }
    }

    // check the member perms
    for (const per of command.data.userPerms) {
      if (!message.member.permissions.has(per)) {
        message.reply(
          `you need the \`${per}\` permission to use this command.`,
        );
        return;
      }
    }

    // check the nsfw
    if (command.data.nsfw && !message.channel.nsfw) {
      message.reply("this command can only be used in nsfw channels.");
      return;
    }

    // check the developers perm
    if (
      command.data.developersOnly &&
      !config.users.developers.includes(message.author.id)
    ) {
      message.reply("only developers can use this command.");
      return;
    }

    command.data.run(client, message, args).catch((error) => {
      log(
        "An error occured while executing the command: " + commandInput,
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
