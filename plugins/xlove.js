const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('config');
const Language = require('../language');
const Lang = Language.getString('wallpaper');

Asena.addCommand({pattern: 'git', fromMe: false, desc: Lang.WP}, (async (message, match) => {

    var r_text = new Array ();
    
    
   
    r_text[0] = "https://i.imgur.com/w89FHm7.jpeg";
    r_text[1] = Config.LG_LOGO
    

    var i = Math.floor(2*Math.random())

    var respoimage = await axios.get(`${r_text[i]}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.png, caption: `*Amalser 💌*

 *To check update .update   To update Bot .update now*

 *Bot making video* :( https://youtu.be/5MKycJxmA4c )
     
 Instagram id     https://www.instagram.com/p/CCdcH3FBd1a/?utm_medium=copy_link

 *Yt_PASSWORD: _________(password on this video watch it full)*

 *githublink* : https://github.com/Amal-ser/Amalser 
 *Amalser New Acoount Git Link Old Account Is Flagged Hope you Enjoy This Thanku* 🥰
`}) 

}));
