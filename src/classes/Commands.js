export class MedoneMessageCommandBuilder {
  constructor() {
    this.data = {
      name: "",
      aliases: [],
      cooldown: 0,
      description: "",
      category: "",
      usage: [],
      examples: [],
      botPerms: [],
      userPerms: [],
      nsfw: false,
      developersOnly: false,
      run: async () => {},
    };
  }

  /**
   * @param {string} name
   * @returns this
   */
  setName(name) {
    this.data.name = name;
    return this;
  }

  /**
   * @param {string[]} aliases
   * @returns this
   */
  setAliases(aliases) {
    this.data.aliases = aliases;
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
   * @param {string} description
   * @returns this
   */
  setDescription(description) {
    this.data.description = description;
    return this;
  }

  /**
   * @param {string} category
   * @returns this
   */
  setCategory(category) {
    this.data.category = category;
    return this;
  }

  /**
   * @param {string[]} usage
   * @returns this
   */
  setUsage(usage) {
    this.data.usage = usage;
    return this;
  }

  /**
   * @param {string[]} examples
   * @returns this
   */
  setExamples(examples) {
    this.data.examples = examples;
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
   *
   * @param {Function} run
   * @returns this
   */
  setRun(run) {
    this.data.run = run;
    return this;
  }
}

export class MedoneSlashCommandBuilder {
  constructor() {
    this.data = {
      command: null,
      cooldown: 0,
      category: "",
      botPerms: [],
      userPerms: [],
      nsfw: false,
      developersOnly: false,
      run: async () => {},
    };
  }

  /**
   * @param {import('discord.js').SlashCommandBuilder} command
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
   * @param {string} category
   * @returns this
   */
  setCategory(category) {
    this.data.category = category;
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
