const config = require("../config");
const { Module, isPublic, getJson, sleep, tiny, webp2mp4, toAudio } = require("../lib/");
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

Module(
	{
		pattern: 'aqt ?(.*)',
		fromMe: true,
		desc: 'Random anime quote',
		type: 'info',
	},
	async (m, match, client) => {
		const { anime, character, quote } = await getJson('https://animechan.vercel.app/api/random')
		await m.reply( ` ☄️ *ANIME* : _${anime}_\n 🌻 *CHARACTER* : _${character}_\n🖇️ *quote* : ${quote}` )
	}
)

Module({pattern: 'base64|b64 ?(.*)', fromMe: isPublic, desc: 'base64 encoder', type: 'encode'}, async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("Give me text to encode")
await m.reply(btoa(match));
});
Module({pattern: 'dbase64|db64 ?(.*)', fromMe: isPublic, desc: 'base64 decoder', type: 'encode'}, async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("Give me text to encode")
await m.reply(atob(match));
});
Module({pattern: 'hex ?(.*)', fromMe: isPublic, desc: 'hex encoder', type: 'encode'}, async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("Give me text to encode")
await m.reply(Buffer.from(match, 'utf8').toString('hex'));
});
Module({pattern: 'dhex ?(.*)', fromMe: isPublic, desc: 'hex decoder', type: 'encode'}, async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("Give me text to encode")
await m.reply(Buffer.from(match, 'hex').toString());
});



Module(
  {
    pattern: "tgs",
    fromMe: isPublic,
    desc: "Download Sticker From Telegram",
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
    type: "info",
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
    desc: "Changes sticker to Photo",
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
    desc: "Changes sticker to Video",
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
