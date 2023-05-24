const {

  Function,

  isPublic,

  getUrl,

  fromBuffer,

  getBuffer,

  getJson,

  AddMp3Meta,

  createMap,

  formatBytes,

  parseJid,

  isUrl,

  parsedJid,

  styletext,

  decodeJid,

  yt,

  ytIdRegex,

  yta,

  ytv,

  runtime,

  insta,

  clockString,

  sleep,

  Module,

} = require("../lib/");

const util = require("util");

const config = require("../config");

Module({pattern:'eval', 

         on: "text",

         fromMe: true,

         desc :'Runs a server code',

         type: "user"}, 

         async (message, match, m, client) => {

  if (match.startsWith(">")) {

    try {

      let evaled = await eval(`${match.replace(">", "")}`);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      await message.reply(evaled);

    } catch (err) {

      await message.reply(util.format(err));

    }

  }

});



Module({pattern:'eval', 

         on: "text",

         fromMe: true,

         desc :'Runs a server code',

         type: "user"}, 

         async (message, match, m, client) => {

  if (match.startsWith("#")) {

    try {

      let evaled = await eval(`(async () => { ${match.replace("#","")} })()`);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      await message.reply(evaled);

    } catch (err) {

      await message.reply(util.format(err));

    }

  }

});
