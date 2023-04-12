const { Module, styletext, listall, tiny, isPublic } = require("../lib/");
const axios = require("axios");
const { Image } = require("node-webpmux");





Module(
  {
    pattern: "fancy",
    fromMe: isPublic,
    desc: "converts text to fancy text",
    type: "converter",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.text || !match ||isNaN(match)) {
      let text = tiny(
        "_Reply to a text or type text after command with a numeric code_\n_Hello mention and .fancy 10_"
      );
      listall("Fancy").forEach((txt, num) => {
        text += `${(num += 1)} ${txt}\n`;
      });
      return await message.reply(text);
    } else {
      message.reply(styletext(message.reply_message.text, parseInt(match)));
    }
  }
);

Module(
  {
    pattern: "quote",
    fromMe: isPublic,
    desc: "makes sticker of text",
    type: "converter",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.text) return await message.reply('Please quote any users message.');
      let pfp;
            try {
                pfp = await message.client.profilePictureUrl(message.reply_message.participant, "image");
            } catch (e) {
                pfp = 'https://i.imgur.com/9OEcKL4.jpeg';
            }
            let todlinkf = ["#FFFFFF", "#000000"];
            let todf = todlinkf[Math.floor(Math.random() * todlinkf.length)];
            var tname
            try{
                tname = message.getName(message.reply_message.participant)
            } catch (e) {
                tname = "Abu-MD"
            }
            let body = {
                type: "quote",
                format: "png",
                backgroundColor: todf,
                width: 512,
                height: 512,
                scale: 3,
                messages: [{
                    avatar: true,
                    from: {
                        first_name: tname,
                        language_code: "en",
                        name: tname,
                        photo: {
                            url: pfp,
                        },
                    },
                    text: message.reply_message.text,
                    replyMessage: {},
                }, ],
            };
            let res = await axios.post("https://bot.lyo.su/quote/generate", body);
            let img = Buffer.alloc(res.data.result.image.length, res.data.result.image, "base64");
            return message.sendMessage(img,{packname:'Abu-MD',author:'Quotely',quoted: message},"sticker")
  }
);
