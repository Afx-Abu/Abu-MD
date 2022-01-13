const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('wallpaper');

Asena.addCommand({pattern: 'git', fromMe: false, desc: "Gives github link of the bot"}, (async (message, match) => {

    var skl = await axios.get("https://www.linkpicture.com/q/IMG-20220108-WA0143.jpg", { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(skl.data), MessageType.image, {mimetype: Mimetype.png, caption: `*Bᴏᴛ Nᴀᴍᴇ 🇦 🇧 🇺  🇸 🇪 🇷  🇧 🇴 🇹 *

*Cʀᴇᴀᴛᴇʀ number : wa.me/917025994178?text=Hi%20ᴀʙᴜ%20bro.%20*


 *Kᴀʟᴀɴ sᴇʀ Cʜᴀɴᴀʟ : https://youtu.be/OYhA_ZNQ4GQ*
     
 *Iɴsᴛᴀɢʀᴀᴍ ɪᴅ: https://instagram.com/_.jasil_rx?utm_medium=copy_link*

 *Kᴀʟɴ sᴇʀ Bᴏᴛ Gʀᴏᴜᴘ: https://chat.whatsapp.com/Bq0eHs3UpGJ2BKIHOmy7mk*

 *Gɪᴛ Lɪɴᴋ : https://github.com/Arx-Abu/Abu_ser*

 *Aʙᴜ-ʙᴏᴛꫂ⁩..♡︎*
`}) 

}));
