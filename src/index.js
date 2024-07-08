import Medone from "./classes/Medone.js";
import process from "process";
import * as dotenv from "dotenv";
import config from "./config.js";
import { log } from "./functions.js";

dotenv.config();

// create the medone client instance
const client = new Medone();
client.start(process.env.CLIENT_TOKEN || config.client.token);

// Register a handler for unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  log("Unhandled Rejection: ", "err");
  console.error(reason);
});

/**
 * Project: Template
 * Author: @medone
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/ecliptic
 */
