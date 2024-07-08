export class MedoneContextMenuBuilder {
  constructor() {
    this.data = {
      command: null,
      cooldown: 0,
      botPerms: [],
      userPerms: [],
      nsfw: false,
      developersOnly: false,
      run: async () => {},
    };
  }

  /**
   * @param {import('discord.js').ContextMenuCommandBuilder} command
   * @returns this
   */
  setCommand(command) {
    this.data.command = command;
    return this;
  }

  /**
   * @param {number} cooldown
   * @returns this
   */
  setCooldown(cooldown) {
    this.data.cooldown = cooldown;
    return this;
  }

  /**
   * @param {import('discord.js').PermissionsString} botPerms
   * @returns this
   */
  setBotPerms(botPerms) {
    this.data.botPerms = botPerms;
    return this;
  }

  /**
   * @param {import('discord.js').PermissionsString} userPerms
   * @returns this
   */
  setUserPerms(userPerms) {
    this.data.userPerms = userPerms;
    return this;
  }

  /**
   * @param {boolean} bool
   * @returns this
   */
  setNSFW(bool) {
    this.data.nsfw = bool;
    return this;
  }

  /**
   * @param {boolean} bool
   * @returns this
   */
  setDevsOnly(bool) {
    this.data.developersOnly = bool;
    return this;
  }

  /**
   * @param {Function} run
   * @returns this
   */
  setRun(run) {
    this.data.run = run;
    return this;
  }
}

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
