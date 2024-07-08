import { Client, Partials, GatewayIntentBits, ActivityType } from "discord.js";
import config from "../config.js";
import loadEvents from "../handlers/events.js";
import deployCommands from "../handlers/deploy.js";
import loadCommand from "../handlers/commands.js";
import loadComponent from "../handlers/components.js";
import loadContextMenus from "../handlers/ContextMenus.js";

export default class Medone extends Client {
  medone = {
    commands: {
      slashcommands: {},
      prefixcommands: {},
      nonprefixcommands: {},
      prefixcommandsaliases: {},
      nonprefixcommandsaliases: {},
    },
    contextMenus: {
      user: {},
      message: {},
    },
    components: {
      buttons: {},
      selects: {},
      modals: {},
    },
    cooldowns: new Map(),
  };

  applicationcommandsArray = [];

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
      ],
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember,
      ],
      presence: {
        activities: [
          {
            name: "give me a hug",
            type: ActivityType.Streaming,
            state: "@Medone",
          },
        ],
      },
    });
  }

  async start(token = config.client.token) {
    loadEvents(this);
    loadCommand(this);
    loadComponent(this);
    loadContextMenus(this);
    await this.login(token);
    deployCommands(this);
  }
}

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
