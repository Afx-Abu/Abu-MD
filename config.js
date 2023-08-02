const toBool = (x) => x == "true"

const { Sequelize } = require("sequelize")

const { existsSync } = require("fs")

if (existsSync("config.env")) require("dotenv").config({ path: "./config.env" })

const DATABASE_URL = process.env.DATABASE_URL === undefined ? "./lib/database.db" : process.env.DATABASE_URL

module.exports = {

  ANTILINK: toBool(process.env.ANTI_LINK) || false,

  LOGS: toBool(process.env.LOGS) || true,

  ALIVE_DATA : process.env.ALIVE_DATA || "_

        *😇I am Online👨🏻‍💻*


*😌میـــں آپــــ کی کـیا مــدد کـــر سکــتا ہــوں😍💃🏻*



*𝖴𝗉𝗍𝗂𝗆𝖾* : *#uptime*

#header\_

____" 🖤🥀 __" 

_" اب ہم اتنـــے ہـــی میـــسر ہونگے ، جتنـــے لوگ مستـــحق ہـیـــں ۔  💯🔥_ "





🦋~👑):~💔 میــــٗــٗــٗــرے ارمــٗــٗــان ســٗــٗــارے ᴋɪʟʟ کــٗــٗــر گئـــٗــٗـی 💔 💫💫



 𝑈𝑆𝛭𝛥𝛮
923090658722

  DATABASE: DATABASE_URL === "./lib/database.db" ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: false }) : new Sequelize(DATABASE_URL, {dialect: "postgres", ssl: true, protocol: "postgres", dialectOptions: { native: true, ssl: { require: true, rejectUnauthorized: false },}, logging: false }),

  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",

  SESSION_ID: (process.env.SESSION_ID || '').trim(),

  LANGUAGE: process.env.LANGUAGE || "EN",

  WARN_LIMIT: process.env.WARN_LIMIT || "1",

  HANDLERS:process.env.HANDLER === "false" || process.env.HANDLERS || '^,',

  IMGBB_KEY: ["76a050f031972d9f27e329d767dd988f", "deb80cd12ababea1c9b9a8ad6ce3fab2", "78c84c62b32a88e86daf87dd509a657a"],

  RMBG_KEY: process.env.RMBG_KEY || false,

  BGMBOT: process.env.BGMBOT || true,

  BRANCH: "master",

  ANTIFAKE : process.env.ANTIFAKE || '',

  FORWARD: process.env.FORWARD || '𝑈𝑆𝛭𝛥𝛮-𝐵𝛩𝑇;UᎦMᏘＮ;Copyright by Usman;https://i.ibb.co/nc4MKWb/ae8d07d7943e.jpg;audio;audio/mp4;https://github.com/Afx-Abu/Abu-MD',
  
  BOT_INFO: process.env.BOT_INFO || '𝑈𝑆𝛭𝛥𝛮-𝐵𝛩𝑇;UᎦMᏘＮ;Copyright by Usman Bot;https://i.imgur.com/UCxG4Ok.jpeg',

  WELCOME_MSG: process.env.WELCOME_MSG || "Hi @user Welcome to @gname
    Powered By 𝑈𝑆𝛭𝛥𝛮-𝐵𝛩𝑇",

  GOODBYE_MSG: process.env.GOODBYE_MSG || "Hi @user It was Nice Seeing you"
    Powered By 𝑈𝑆𝛭𝛥𝛮-𝐵𝛩𝑇,

  STICKER_DATA: process.env.STICKER_DATA || "𝑈𝑆𝛭𝛥𝛮-𝐵𝛩𝑇",

  ACR_A: "ff489a0160188cf5f0750eaf486eee74",

  ACR_S: "ytu3AdkCu7fkRVuENhXxs9jsOW4YJtDXimAWMpJp",

  SUDO: process.env.SUDO || "923090658722",

  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",

  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",

  MODE: process.env.MODE || "public",

};
