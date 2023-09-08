const config = require("../config");
const { Module, isPublic, getJson, sleep, tiny, webp2mp4, toAudio } = require("../lib/");
const { jslbuffer } = require('abu-bot');
const { Image } = require("node-webpmux");

Module(
  {
    pattern: "sticker",
    fromMe: isPublic,
    desc: "converts Photo or video to stickers",
    type: "converter",
  },
  async (message, match, m) => {
    if (!(message.reply_message.video || message.reply_message.image))
      return await message.reply("_Reply to photo or video_");
    let buff = await m.quoted.download();
    message.sendMessage(
      buff,
      { packname: message.pushName, quoted: message },
      "sticker"
    );
  }
);

Module({
          pattern: 'rvtxt ?(.*)',
          fromMe: isPublic,
          desc: 'reverse the given text',
          type: 'converter'}, 
          async (m, match) => {
match = match || m.reply_message.text
if (!match) return await m.reply("Give me a text to reverse")
await m.reply(match.split("").reverse().join(""))
});

Module({
         pattern: 'base64|b64 ?(.*)',
         fromMe: isPublic, 
         desc: 'base64 encoder',
         type: 'converter'}, 
         
          async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("Give me text to encode")
await m.reply(btoa(match));
});

Module({
         pattern: 'dbase64|db64 ?(.*)',
         fromMe: isPublic,
         desc: 'base64 decoder', 
         type: 'converter'},
         
         async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("Give me text to encode")
await m.reply(atob(match));
});

Module({
         pattern: 'hex ?(.*)', 
         fromMe: isPublic,
         desc: 'hex encoder',
         type: 'converter'}, 
         
         async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("Give me text to encode")
await m.reply(Buffer.from(match, 'utf8').toString('hex'));
});

Module({
         pattern: 'dhex ?(.*)', 
         fromMe: isPublic,
         desc: 'hex decoder', 
         type: 'converter'}, 
         
         async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("Give me text to encode")
await m.reply(Buffer.from(match, 'hex').toString());
});



Module(
  {
    pattern: "tgs",
    fromMe: isPublic,
    desc: "download Sticker From Telegram",
    type: "downloader",
  },
  async (message, match) => {
    if (!match)
      return message.reply(
        "_Enter a tg sticker url_\nEg: https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently"
      );
    let packid = match.split("/addstickers/")[1];
    let { result } = await getJson(
      `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(
        packid
      )}`
    );
    if (result.is_animated)
      return message.reply("_Animated stickers are not supported_");
    message.reply(
      `*Total stickers :* ${result.stickers.length}\n*Estimated complete in:* ${
        result.stickers.length * 1.5
      } seconds`.trim()
    );
    for (let sticker of result.stickers) {
      let file_path = await getJson(
        `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${sticker.file_id}`
      );
      await message.sendMessage(
        `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file_path.result.file_path}`,
        { packname: message.pushName, quoted: message },
        "sticker"
      );
      sleep(1500);
    }
  }
);



Module(
  {
    pattern: "take",
    fromMe: isPublic,
    desc: "change sticker & audio name",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message && !message.reply_message.sticker)
      return await message.reply("_Reply to sticker_");
    let buff = await m.quoted.download();
    let [packname] = match.split(",");
    await message.sendMessage(
      buff,
      {
        packname: packname, quoted: message
      },
      "sticker"
    );
  }
);



Module(
  {
    pattern: "getexif",
    fromMe: true,
    desc: "get sticker information",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message || !message.reply_message.sticker)
      return await message.reply("_Reply to sticker_");
    let img = new Image();
    await img.load(await m.quoted.download());
    const exif = JSON.parse(img.exif.slice(22).toString());
    await message.reply(exif);
  }
);

Module(
  {
    pattern: "mp3",
    fromMe: isPublic,
    desc: "converts video/audio/voice to mp3",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message || (!message.reply_message.video && !message.reply_message.audio)) return await message.reply('Reply at audio/voice/video')  
    let buff = await m.quoted.download();
    buff = await toAudio(buff, "mp3");
    return await message.sendMessage(buff, { mimetype: "audio/mpeg", quoted: message }, "audio");
  }
);

Module(
  {
    pattern: "photo",
    fromMe: isPublic,
    desc: "changes sticker to Photo",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(buff, {quoted: message}, "image");
  }
);

Module(
  {
    pattern: "mp4",
    fromMe: isPublic,
    desc: "changes sticker to video",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    let buffer = await webp2mp4(buff);
    return await message.sendMessage(buffer, { quoted: message }, "video");
  }
);

Module({
	pattern: 'ttp ?(.*)',
	fromMe: isPublic,
	desc: 'converter your text to ttp sticker',
	type: 'converter',
}, async (message, match) => {
    if (!match) return await message.reply("_need word_");
const Jsl_0x152d66=Jsl_0x290a;function Jsl_0x290a(_0xac6923,_0x2fd089){const _0x5dbc96=Jsl_0x5dbc();return Jsl_0x290a=function(_0x290ac9,_0x1984cb){_0x290ac9=_0x290ac9-0x19f;let _0xac969c=_0x5dbc96[_0x290ac9];return _0xac969c;},Jsl_0x290a(_0xac6923,_0x2fd089);}function Jsl_0x5dbc(){const _0x101caf=['192398qavkoD','27fNTFVR','9dsqciY','75Kethjb','95132cpJKTv','14753940sovovx','14KgbyZr','https://inrl-web.onrender.com/api/attp?text=','4009032fPsIMe','3783272Cdohqm','957836PEkOMH','2105257lQqIuI','120XtxbmD'];Jsl_0x5dbc=function(){return _0x101caf;};return Jsl_0x5dbc();}(function(_0x557715,_0x50aa0e){const _0x4028a4=Jsl_0x290a,_0x208397=_0x557715();while(!![]){try{const _0xb3b14d=-parseInt(_0x4028a4(0x1a8))/0x1+parseInt(_0x4028a4(0x1ab))/0x2*(parseInt(_0x4028a4(0x19f))/0x3)+-parseInt(_0x4028a4(0x1a2))/0x4*(parseInt(_0x4028a4(0x1a1))/0x5)+parseInt(_0x4028a4(0x1a6))/0x6*(parseInt(_0x4028a4(0x1a4))/0x7)+parseInt(_0x4028a4(0x1a7))/0x8*(-parseInt(_0x4028a4(0x1a0))/0x9)+-parseInt(_0x4028a4(0x1a3))/0xa+-parseInt(_0x4028a4(0x1a9))/0xb*(-parseInt(_0x4028a4(0x1aa))/0xc);if(_0xb3b14d===_0x50aa0e)break;else _0x208397['push'](_0x208397['shift']());}catch(_0xc8655f){_0x208397['push'](_0x208397['shift']());}}}(Jsl_0x5dbc,0xd0481));let a=await jslbuffer(Jsl_0x152d66(0x1a5)+match);
 return message.sendMessage(a,{packname:'👀',
        quoted: message,
      },"sticker") 
         }
     )     
     
     
Module({
	pattern: 'attp ?(.*)',
	fromMe: isPublic,
	desc: 'convert your text to attp sticker',
	type: 'converter',
}, async (message, match) => {
    if (!match) return await message.reply("_Example:ttp Abu_");    
const Jsl_0x152d66=Jsl_0x290a;function Jsl_0x290a(_0xac6923,_0x2fd089){const _0x5dbc96=Jsl_0x5dbc();return Jsl_0x290a=function(_0x290ac9,_0x1984cb){_0x290ac9=_0x290ac9-0x19f;let _0xac969c=_0x5dbc96[_0x290ac9];return _0xac969c;},Jsl_0x290a(_0xac6923,_0x2fd089);}function Jsl_0x5dbc(){const _0x101caf=['192398qavkoD','27fNTFVR','9dsqciY','75Kethjb','95132cpJKTv','14753940sovovx','14KgbyZr','https://inrl-web.onrender.com/api/attp?text=','4009032fPsIMe','3783272Cdohqm','957836PEkOMH','2105257lQqIuI','120XtxbmD'];Jsl_0x5dbc=function(){return _0x101caf;};return Jsl_0x5dbc();}(function(_0x557715,_0x50aa0e){const _0x4028a4=Jsl_0x290a,_0x208397=_0x557715();while(!![]){try{const _0xb3b14d=-parseInt(_0x4028a4(0x1a8))/0x1+parseInt(_0x4028a4(0x1ab))/0x2*(parseInt(_0x4028a4(0x19f))/0x3)+-parseInt(_0x4028a4(0x1a2))/0x4*(parseInt(_0x4028a4(0x1a1))/0x5)+parseInt(_0x4028a4(0x1a6))/0x6*(parseInt(_0x4028a4(0x1a4))/0x7)+parseInt(_0x4028a4(0x1a7))/0x8*(-parseInt(_0x4028a4(0x1a0))/0x9)+-parseInt(_0x4028a4(0x1a3))/0xa+-parseInt(_0x4028a4(0x1a9))/0xb*(-parseInt(_0x4028a4(0x1aa))/0xc);if(_0xb3b14d===_0x50aa0e)break;else _0x208397['push'](_0x208397['shift']());}catch(_0xc8655f){_0x208397['push'](_0x208397['shift']());}}}(Jsl_0x5dbc,0xd0481));let a=await jslbuffer(Jsl_0x152d66(0x1a5)+match);
return message.sendMessage(a,{packname:'👀',
        quoted: message,
      },"sticker") 
         }
     )     
     
	    
	 
