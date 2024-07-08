export default {
  client: {
    token: "your application token",
    id: "your application id",
  },

  handler: {
    prefix: "+",
    deploy: true,
  },

  commands: {
    slash: true,
    prefix: true,
    nonprefix: true,
  },

  ContextMenus: {
    user: true,
    message: true,
  },

  users: {
    developers: ["353772468491517963"],
  },

  development: {
    enabled: false,
    guild: "",
  },

  emojis: {
    success: ``,
    xmark: ``,
    alert: ``,
    attention: ``,
    gear: ``,
  },

  applicationInfo: {
    supportserver: "https://discord.gg/ecliptic",
  },
};

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
