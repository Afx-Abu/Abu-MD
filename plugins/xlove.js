const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('wallpaper');

Asena.addCommand({pattern: 'git', fromMe: false, desc: "Gives github link of the bot"}, (async (message, match) => {

    var skl = await axios.get("https://i.imgur.com/w89FHm7.jpeg", { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(skl.data), MessageType.image, {mimetype: Mimetype.png, caption: `*Bot Name: Amalser*

*Creator number : wa.me/919895828468?text=Hi%20Amal%20Ser.%20*

 *To check update .update   To update Bot .update now*

 *Bot making video : https://youtu.be/Tb1B-rS52uo*
     
 *Instagram id: https://www.instagram.com/p/CCdcH3FBd1a/?utm_medium=copy_link*

 *Yt_PASSWORD: _________(password on this video watch it full)*

 *githublink : https://github.com/Amal-ser/Amalser*

 *Amalser New Acoount Git Link Old Account Is Flagged Hope you Enjoy This Thanku 🥰*
`}) 

}));
