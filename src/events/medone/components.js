import { MedoneEventBuilder } from "../../classes/events.js";
import { log } from "../../functions.js";
import config from "../../config.js";

export default new MedoneEventBuilder()
  .setEvent("interactionCreate")
  .setOnce(false)
  .setRun(async (client, interaction) => {
    // return if the message is not from a guild or if the author is a bot
    if (!interaction.guild) return;

    // inistialize the component
    /**
     * @type {import('../../classes/Components.js').MedoneComponentBuilder} component
     */
    let component;
    let type;

    // get the component from the buttons collection
    if (interaction.isButton()) {
      component = client.medone.components.buttons[interaction.customId];
      type = `b`;
    }

    // get the component from the modals collection
    if (interaction.isModalSubmit()) {
      component = client.medone.components.modals[interaction.customId];
      type = `m`;
    }

    // get the component from the selects collection
    if (interaction.isAnySelectMenu()) {
      component = client.medone.components.selects[interaction.customId];
      type = `s`;
    }

    // return if the command doesn't exist
    if (!component) return;

    // check for the cooldown
    if (component.data.cooldown > 0) {
      // the cooldown key
      const key = `${interaction.user.id}${component.data.id}${type}`;
      // if the user noy under cooldown
      if (!client.medone.cooldowns.has(key)) {
        client.medone.cooldowns.set(key, 0);
        setTimeout(
          () => client.medone.cooldowns.delete(key),
          component.data.cooldown,
        );
        // if the user is under cooldown
      } else {
        if (interaction.isRepliable()) {
          interaction.reply(
            `please wait \`${component.data.cooldown / 1000}\` seconds before using this component again.`,
          );
        } else {
          interaction.channel.send(
            `please wait \`${component.data.cooldown / 1000}\` seconds before using this component again.`,
          );
        }
        return;
      }
    }

    // check the bot perms
    for (const per of component.data.botPerms) {
      if (!interaction.guild.members.me.permissions.has(per)) {
        if (interaction.isRepliable()) {
          interaction.reply(
            `i need the \`${per}\` permission to execute this component.`,
          );
        } else {
          interaction.channel.send(
            `i need the \`${per}\` permission to execute this component.`,
          );
        }
        return;
      }
    }

    // check the member perms
    for (const per of component.data.userPerms) {
      if (!interaction.member.permissions.has(per)) {
        if (interaction.isRepliable()) {
          interaction.reply(
            `you need the \`${per}\` permission to use this component.`,
          );
        } else {
          interaction.channel.send(
            `you need the \`${per}\` permission to use this component.`,
          );
        }
        return;
      }
    }

    // check the nsfw
    if (component.data.nsfw && !interaction.channel.nsfw) {
      if (interaction.isRepliable()) {
        interaction.reply("this component can only be used in nsfw channels.");
      } else {
        interaction.channel.send(
          "this component can only be used in nsfw channels.",
        );
      }
      return;
    }

    // check the developers only perms
    if (
      component.data.developersOnly &&
      !config.users.developers.includes(interaction.user.id)
    ) {
      if (interaction.isRepliable()) {
        interaction.reply("only developers can use this component.");
      } else {
        interaction.channel.send("only developers can use this component.");
      }
      return;
    }

    component.data.run(client, interaction).catch((error) => {
      log(
        "An error occured while executing the component: " + component,
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
