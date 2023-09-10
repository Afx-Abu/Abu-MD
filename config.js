const toBool = (x) => x == "true"

const { Sequelize } = require("sequelize")

const { existsSync } = require("fs")

if (existsSync("config.env")) require("dotenv").config({ path: "./config.env" })

const DATABASE_URL = process.env.DATABASE_URL === undefined ? "./lib/database.db" : process.env.DATABASE_URL

module.exports = {

  ANTILINK: toBool(process.env.ANTI_LINK) || false,

  LOGS: toBool(process.env.LOGS) || true,

  ALIVE_DATA : process.env.ALIVE_DATA || "_iam alive now &sender_",

  DATABASE: DATABASE_URL === "./lib/database.db" ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: false }) : new Sequelize(DATABASE_URL, {dialect: "postgres", ssl: true, protocol: "postgres", dialectOptions: { native: true, ssl: { require: true, rejectUnauthorized: false },}, logging: false }),

  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",

  SESSION_ID: (process.env.SESSION_ID || '').trim(),

  LANGUAGE: process.env.LANGUAGE === undefined ? 'EN' : process.env.LANGUAGE.toUpperCase(),
  
  WARN_LIMIT: process.env.WARN_LIMIT || "3",

  HANDLERS:process.env.HANDLER === "false" || process.env.HANDLERS || '^,',

  IMGBB_KEY: ["76a050f031972d9f27e329d767dd988f", "deb80cd12ababea1c9b9a8ad6ce3fab2", "78c84c62b32a88e86daf87dd509a657a"],

  RMBG_KEY: process.env.RMBG_KEY || false,

  BGMBOT: process.env.BGMBOT || true,

  BRANCH: "master",

  ANTIFAKE : process.env.ANTIFAKE || '',

  FORWARD: process.env.FORWARD || '𝐀𝐁𝐔 𝐌𝐃 𝐁𝐎𝐓;~Jasil;Copyright by Abu;https://i.ibb.co/nc4MKWb/ae8d07d7943e.jpg;audio;audio/mp4;https://github.com/Afx-Abu/Abu-MD',
  
  BOT_INFO: process.env.BOT_INFO || '𝐀𝐁𝐔 𝐌𝐃 𝐁𝐎𝐓;~Jasil;Copyright by Abu MD;https://i.ibb.co/nc4MKWb/ae8d07d7943e.jpg',

  WELCOME_MSG: process.env.WELCOME_MSG || "Hi @user Welcome to @gname",

  GOODBYE_MSG: process.env.GOODBYE_MSG || "Hi @user It was Nice Seeing you",

  STICKER_DATA: process.env.STICKER_DATA || "Abu",

  ACR_A: "ff489a0160188cf5f0750eaf486eee74",

  ACR_S: "ytu3AdkCu7fkRVuENhXxs9jsOW4YJtDXimAWMpJp",

  SUDO: process.env.SUDO || "917025994178",

  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",

  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",

  MODE: process.env.MODE || "public",

};
