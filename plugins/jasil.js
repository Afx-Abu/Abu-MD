const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('wallpaper');

Asena.addCommand({pattern: 'git', fromMe: false, desc: "Gives github link of the bot"}, (async (message, match) => {

    var skl = await axios.get("https://i.imgur.com/CtaexU3.jpeg", { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(skl.data), MessageType.image, {mimetype: Mimetype.png, caption: `*Bᴏᴛ Nᴀᴍᴇ 🇦 🇧 🇺  🇸 🇪 🇷  🇧 🇴 🇹 *

 *Cʀᴇᴀᴛᴇʀ number : wa.me/917025631103?text=Hi%20Amruser%20bro.%20*

 *Kᴀʟᴀɴ sᴇʀ Cʜᴀɴᴀʟ : https://youtu.be/OYhA_ZNQ4GQ*
     
 *Cʀᴇᴀᴛᴇʀ ɴᴀᴍᴇs: Aᴍʀᴜ sᴇʀ  & Aʙᴜ sᴇʀ *

 *Oᴡɴᴇʀ : Aᴍʀᴜ sᴇʀ Bᴏᴛ ᴘʜ:» wa.me/917025631103*

 *Gɪᴛ Lɪɴᴋ Fᴏʀ Aᴍʀᴜ Sᴇʀ : https://github.com/AMRUSIR/AMRU-SER*

 *Gɪᴛ Lɪɴᴋ Fᴏʀ Aʙᴜ Sᴇʀ : https://github.com/Arx-Abu/Abu_ser*

 *Aʙᴜ-ʙᴏᴛꫂ⁩..♡︎*
`}) 

}));
