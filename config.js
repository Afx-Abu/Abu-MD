const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

const DATABASE_URL = process.env.DATABASE_URL === undefined ? './database.db' : process.env.DATABASE_URL
DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG)
let HANDLER = "false";
module.exports = {
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  LOGS: toBool(process.env.LOGS) || true,
  ALIVE_DATA : process.env.ALIVE_DATA || "_iam alive now &sender_",
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  SESSION_ID: (process.env.SESSION_ID || '').trim(),
  LANGUAGE: process.env.LANGUAGE || "EN",
  HANDLERS:process.env.HANDLER === "false" || process.env.HANDLERS || '^,',
  IMGBB_KEY: ["76a050f031972d9f27e329d767dd988f", "deb80cd12ababea1c9b9a8ad6ce3fab2", "78c84c62b32a88e86daf87dd509a657a"],
  RMBG_KEY: process.env.RMBG_KEY || false,
  BGMBOT: process.env.BGMBOT || true,
  BRANCH: "master",
  ANTIFAKE : process.env.ANTIFAKE || '',
  BOT_INFO: process.env.BOT_INFO || '𝐀𝐁𝐔 𝐌𝐃 𝐁𝐎𝐓;~Jasil;Copyright by Abu;917025994178;™𝐀𝐁𝐔 𝐌𝐃;https://i.ibb.co/nc4MKWb/ae8d07d7943e.jpg',
  WELCOME_MSG: process.env.WELCOME_MSG || "Hi @user Welcome to @gname",
  GOODBYE_MSG: process.env.GOODBYE_MSG || "Hi @user It was Nice Seeing you",
  STICKER_DATA: process.env.STICKER_DATA || "Abu",
  DATABASE_URL: DATABASE_URL,
  DATABASE:
  DATABASE_URL === './database.db' ? new Sequelize({dialect: 'sqlite', storage: DATABASE_URL, logging: false,}) : new Sequelize(DATABASE_URL, {dialect: 'postgres', ssl: true, protocol: 'postgres', dialectOptions: {native: true, ssl: { require: true, rejectUnauthorized: false },}, logging: false,}),
  ACR_A: "ff489a0160188cf5f0750eaf486eee74",
  ACR_S: "ytu3AdkCu7fkRVuENhXxs9jsOW4YJtDXimAWMpJp",
  SUDO: process.env.SUDO || "917025994178",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  MODE: process.env.MODE || "public",
  DEBUG: DEBUG
};









const { Sequelize } = require('sequelize');
const fs = require('fs');

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env', override: true });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

const toBool = (x) => x == 'true'
global.apikey = {'https://api.adithyan.ml': 'free'}
global.apiUrl = 'https://api.adithyan.ml/'

const DATABASE_URL = process.env.DATABASE_URL === undefined ? './database.db' : process.env.DATABASE_URL
process.env.NODE_OPTIONS = '--max_old_space_size=2560'
DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG)
module.exports = {
	VERSION: 'v4.3.6', 
    SESSION_ID: process.env.SESSION_ID || '',
    MODE: (process.env.MODE || 'public').toLowerCase(),
    HANDLERS: (process.env.PREFIX || '^[.,!]').trim(),
    SEND_READ: process.env.READ_COMMAND || false,
    READ_MSG: process.env.READ_MSG === 'true', 
    MSG_LOG: convertToBool(process.env.LOG_MSG) || false, 
    BLOCKCHAT: process.env.BLOCK_CHAT === undefined ? false : process.env.BLOCK_CHAT,
    LANG: process.env.LANGUAGE === undefined ? 'EN' : process.env.LANGUAGE.toUpperCase(),
    ALWAYS_ONLINE: toBool(process.env.ALWAYS_ONLINE),
    BOT_NAME: process.env.BOT_NAME || '𝛨𝛯𝑅𝛭𝛪𝑇',
    AUTOMUTE_MSG: process.env.AUTOMUTE_MSG || '_Group automuted!_\n_(Change this by setting var AUTOMUTE_MSG)_',
    AUTOUNMUTE_MSG: process.env.AUTOUNMUTE_MSG || '_Group autounmuted!_\n_(Change this by setting var AUTOUNMUTE_MSG)_',
    ANTILINK_MSG: process.env.ANTILINK_MSG || '_Link Not Allowed!_\n_(Change this by setting var ANTILINK_MSG)_',
    BOT_INFO: process.env.BOT_INFO || '𝛨𝛯𝑅𝛭𝛪𝑇;𝛥𝐷𝛪𝑇𝛨𝑌𝛥𝛮;972528277755;https://i.imgur.com/6oRG106.jpeg',
    AUDIO_DATA: process.env.AUDIO_DATA === undefined ? '𝛨𝛯𝑅𝛭𝛪𝑇;𝛥𝐷𝛪𝑇𝛨𝑌𝛥𝛮;https://i.imgur.com/fj2WE83.jpeg' : process.env.AUDIO_DATA,
    STICKER_DATA: process.env.STICKER_DATA === undefined ? '𝛨𝛯𝑅𝛭𝛪𝑇;𝛥𝐷𝛪𝑇𝛨𝑌𝛥𝛮' : process.env.STICKER_DATA,
    ERROR_MESSAGE: toBool(process.env.ERROR_MESSAGE), 
    SONG_THUMBNAIL: toBool(process.env.SONG_THUMBNAIL),
    WARN: process.env.WARN || '4',
    EXPRESS: toBool(process.env.EXPRESS),
    REJECT_CALL: toBool(process.env.REJECT_CALL),
    KOYEB_API_KEY: process.env.KOYEB_API_KEY || '',
    KOYEB_APP_NAME: process.env.KOYEB_APP_NAME || '',
    TERMUX_VPS: toBool(process.env.TERMUX || process.env.VPS),
    AUTO_STATUS_VIEW: toBool(process.env.AUTO_STATUS_VIEW),
    HEROKU: {
        HEROKU: process.env.HEROKU === undefined ? false : convertToBool(process.env.HEROKU),
        API_KEY: process.env.HEROKU_API_KEY,
        APP_NAME: process.env.HEROKU_APP_NAME
       },
       DATABASE_URL: DATABASE_URL,
       DATABASE:
       DATABASE_URL === './database.db' ? new Sequelize({dialect: 'sqlite', storage: DATABASE_URL, logging: false,}) : new Sequelize(DATABASE_URL, {dialect: 'postgres', ssl: true, protocol: 'postgres', dialectOptions: {native: true, ssl: { require: true, rejectUnauthorized: false },}, logging: false,}),
       RBG_API_KEY: process.env.REMOVE_BG_API_KEY === undefined ? false : process.env.REMOVE_BG_API_KEY,
       BRAIN_ID: process.env.BRAIN_ID || 'bid=168613&key=EfbnX54Iy9PFIFp3',
       SUDO: process.env.SUDO || '972528277755,0',
       DEBUG: DEBUG
};