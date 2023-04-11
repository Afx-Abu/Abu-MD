const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./abu.db";
let HANDLER = "false";
module.exports = {
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  LOGS: toBool(process.env.LOGS) || true,
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  SESSION: process.env.SESSION.trim() || '',
  LANG: process.env.LANG || "EN",
  HANDLERS:process.env.HANDLER === "false" || process.env.HANDLER === "null"? "^": "^[.]",
  RMBG_KEY: process.env.RMBG_KEY || false,
  BRANCH: "master",
  WELCOME_MSG: process.env.WELCOME_MSG || "Hi @user Welcome to @gname",
  GOODBYE_MSG: process.env.GOODBYE_MSG || "Hi @user It was Nice Seeing you",
  STICKER_DATA: process.env.STICKER_DATA || "Abu",
  DATABASE_URL: DATABASE_URL,DATABASE:DATABASE_URL === "./abu.db"? new Sequelize({dialect: "sqlite",storage: DATABASE_URL,logging: false,}): new Sequelize(DATABASE_URL, {dialect: "postgres",ssl: true,protocol: "postgres",dialectOptions: { native: true,ssl: { require: true, rejectUnauthorized: false },},logging: false,}),
  SUDO: process.env.SUDO || "917025994178",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  MODE: process.env.MODE || "public",
};
