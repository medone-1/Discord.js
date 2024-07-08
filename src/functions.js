import chalk from "chalk";

/**
 * @param {string} text
 * @param {"info" | "err" | "warn" | "done"} style
 */
export function log(text, style) {
  const styles = {
    info: { prefix: chalk.blue("==> INFO: "), logFunction: console.log },
    err: { prefix: chalk.red("==> ERROR: "), logFunction: console.error },
    warn: { prefix: chalk.yellow("==> WARNING: "), logFunction: console.warn },
    done: { prefix: chalk.green("==> SUCCESS: "), logFunction: console.log },
  };

  const selectedStyle = styles[style];
  selectedStyle.logFunction(
    `${Date.now()} ${selectedStyle.prefix || { logFunction: console.log } || ""} ${text}`,
  );
}

/**
 * @param {string} id
 * @returns boolean
 */
export function isSnowflake(id) {
  return /^\d+$/.test(id);
}

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
