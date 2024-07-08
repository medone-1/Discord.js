export class MedoneEventBuilder {
  constructor() {
    this.data = {
      event: null,
      once: false,
      run: async () => {},
    };
  }

  /**
   * @param {keyof import('discord.js').ClientEvents} name
   * @returns this
   */
  setEvent(name) {
    this.data.event = name;
    return this;
  }

  /**
   * @param {boolean} bool
   * @returns this
   */
  setOnce(bool) {
    this.data.once = bool;
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
