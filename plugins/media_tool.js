const {

      Module, isPublic

  } = require('../lib/');

  const fs = require('fs');

  const ffmpeg = require('fluent-ffmpeg');

  const {jslbuffer} = require('abu-bot');

  const {

      trim,

      trimVideo

  } = require('abu-bot');

const config = require("../config");

const acrcloud = require("acrcloud");

const acr = new acrcloud({

  host: "identify-eu-west-1.acrcloud.com",

  access_key: config.ACR_A,

  access_secret: config.ACR_S

});

var handler = config.HANDLERS !== 'false'?config.HANDLERS.split("")[0]:""

async function findMusic(file){

return new Promise((resolve,reject)=>{

acr.identify(file).then(result => {

  var data = result.metadata?.music[0];

  resolve(data);

});

});

}

Module({

      pattern: "find ?(.*)",

      fromMe: isPublic,

      desc: "Finds music name using AI",

      usage: ".find reply to a music",

      use: 'search'

  }, async (message, match) => {

      if (!message.reply_message?.audio) return await message.reply("_Reply to a music_");

      if (message.reply_message.duration > 60) return await message.send('_Audio too large! Use .trim command and cut the audio to < 60 secs_');

      var audio = await message.reply_message.download('buffer');

      var data = await findMusic(audio)

      if (!data) return await message.reply("_No matching results found!_");

var buttons = [];

function getDuration(millis) {

  var minutes = Math.floor(millis / 60000);

  var seconds = ((millis % 60000) / 1000).toFixed(0);

  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

}

const Message = {

text:  `*Title:* ${data.title}\n

Artists: ${data.artists?.map(e => e.name + " ")}\n

Released on: ${data.release_date}\n

Duration: ${getDuration(data.duration_ms)}\n

Album: ${data.album?.name}\n

Genres: ${data.genres?.map(e => e.name + " ")}\n

Label: ${data.label}\n`,

}

await message.client.sendMessage(message.jid, Message, { quoted: message })    

    });

