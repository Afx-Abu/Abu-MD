const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const config = require('../config');
const fs = require("fs")
const Language = require('../language');
const Lang = Language.getString('gitlink');

Asena.addCommand({pattern: 'git', fromMe: false, desc: Lang.GL}, (async (message, match) => {

    var respoimage = await axios.get(config.LIZA, { responseType: 'arraybuffer' })


    await message.sendMessage(Buffer(respoimage.data), MessageType.image, {quoted: message.data , thumbnail: fs.readFileSync('https://www.linkpicture.com/q/20220115_085729.jpg'), mimetype: Mimetype.png, caption: `*≈≈≈≈≈≈≈Links ☟︎︎︎≈≈≈≈≈≈≈≈*
 
*ᴏᴡɴᴇʀ number wa.me/917025994178*
   
*ᴏᴡɴᴇʀ ɴᴀᴍᴇ _» Aʙᴜ - Jᴀsɪʟ*


*ᴡʜᴀᴛsᴀᴘᴘ ɢʀᴏᴜᴘ : https://chat.whatsapp.com/Bq0eHs3UpGJ2BKIHOmy7mk*


*ɢɪᴛʜᴜʙ ʟɪɴᴋ     _https://github.com/Arx-Abu/Abu_ser*


*ᴀᴜᴅɪᴏ ᴄᴏᴍᴍᴀɴᴅs _https://github.com/Arx-Abu/uplods*

*Bᴏᴛ Mᴀᴋᴇ Vɪᴅᴇᴏ Yᴛᴜʙᴇ -💖https://youtu.be/OYhA_ZNQ4GQ

*Sᴛɪᴄᴋᴇʀ ᴄᴏᴍᴍᴀɴᴅs _https://github.com/Arx-Abu/sticker*     
`}) 

})); 
