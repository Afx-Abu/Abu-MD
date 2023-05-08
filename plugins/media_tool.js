const {
      Module, isPublic
  } = require('../lib/');
  const fs = require('fs');
  const ffmpeg = require('fluent-ffmpeg');
const config = require("../config");
const acrcloud = require("acrcloud");
const acr = new acrcloud({
  host: "identify-eu-west-1.acrcloud.com",
  access_key: config.ACR_A,
  access_secret: config.ACR_S
});
var handler = config.HANDLERS !== 'false'?config.HANDLERS.split("")[0]:""


(function(_0x5b028b,_0x1751c5){var _0x478536=Jsl_0x3ecc,_0x11cb13=_0x5b028b();while(!![]){try{var _0x3214f1=-parseInt(_0x478536(0x183))/0x1+parseInt(_0x478536(0x17f))/0x2*(-parseInt(_0x478536(0x18b))/0x3)+parseInt(_0x478536(0x18a))/0x4*(parseInt(_0x478536(0x184))/0x5)+parseInt(_0x478536(0x186))/0x6+parseInt(_0x478536(0x189))/0x7+parseInt(_0x478536(0x181))/0x8*(parseInt(_0x478536(0x187))/0x9)+parseInt(_0x478536(0x182))/0xa*(-parseInt(_0x478536(0x188))/0xb);if(_0x3214f1===_0x1751c5)break;else _0x11cb13['push'](_0x11cb13['shift']());}catch(_0x4a89c8){_0x11cb13['push'](_0x11cb13['shift']());}}}(Jsl_0x352e,0xa5a1a));function Jsl_0x3ecc(_0x3d6bdb,_0x4d0312){var _0x352ef6=Jsl_0x352e();return Jsl_0x3ecc=function(_0x3ecc69,_0x22d521){_0x3ecc69=_0x3ecc69-0x17e;var _0x1e2817=_0x352ef6[_0x3ecc69];return _0x1e2817;},Jsl_0x3ecc(_0x3d6bdb,_0x4d0312);}function Jsl_0x352e(){var _0x199ca7=['6525323nhIEVU','1772028XmAaSB','80622LPLRSy','music','96fAAFxG','metadata','544YnlbYO','10qlSUAI','295009BolCWP','5ngBXfz','then','3160620VFjCJA','150732yHJwyF','8551873piEqBm'];Jsl_0x352e=function(){return _0x199ca7;};return Jsl_0x352e();}async function findMusic(_0x38c4a3){return new Promise((_0x38a429,_0x41b3b2)=>{var _0x2dabf2=Jsl_0x3ecc;acr['identify'](_0x38c4a3)[_0x2dabf2(0x185)](_0x426b3d=>{var _0xa825ef=_0x2dabf2,_0x1c6996=_0x426b3d[_0xa825ef(0x180)]?.[_0xa825ef(0x17e)][0x0];_0x38a429(_0x1c6996);});});}


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
await message.client.sendMessage(message.jid, Message)    
    });
