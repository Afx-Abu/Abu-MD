const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('wallpaper');

Asena.addCommand({pattern: 'git', fromMe: false, desc: "Gives github link of the bot"}, (async (message, match) => {

    var skl = await axios.get("https://i.imgur.com/CtaexU3.jpeg", { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(skl.data), MessageType.image, {mimetype: Mimetype.png, caption: `*Bᴏᴛ Nᴀᴍᴇ 🇦 🇲 🇷 🇺   🇸 🇪 🇷  🇧 🇴 🇹 *

*Cʀᴇᴀᴛᴇʀ number : wa.me/917025631103?text=Hi%20ᴀᴍʀᴜ%20bro.%20*


 *Aᴍʀᴜ sᴇʀ Cʜᴀɴᴀʟ : 💕Cʜᴀɴᴀʟ Oɴɴᴜᴍ Aʏɪᴛɪʟʟᴀ Aʏɪᴛᴛ Kᴏᴅᴋᴋᴀ😁*
     
 *Iɴsᴛᴀɢʀᴀᴍ ɪᴅ: 😊Mᴀʀᴀɴɴᴜ 😍Pᴏʏɪ Iɴsᴛᴀɢʀᴀᴍᴜᴍ Iɴᴅᴀᴋɪᴛɪʟʟᴀ 😁*

 *Aᴍʀᴜ sᴇʀ Bᴏᴛ Gʀᴏᴜᴘ: https://chat.whatsapp.com/Bq0eHs3UpGJ2BKIHOmy7mk*

 *Gɪᴛ Lɪɴᴋ : https://github.com/AMRUSIR/AMRU-SER*

 *Aᴍʀᴜ-sᴇʀ-ʙᴏᴛꫂ⁩..♡︎*
`}) 

}));
