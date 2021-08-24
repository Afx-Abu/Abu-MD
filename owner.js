const Asena = require('../events');

const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');

const axios = require('axios');

const Language = require('../language');

const Lang = Language.getString('gitlink');

Asena.addCommand({pattern: 'git', fromMe: false, desc: Lang.GL}, (async (message, match) => {

    var r_text = new Array ();

    

    

   

  r_text[0] = "https://i.imgur.com/3UjTtji.jpeg";

    

    

    var i = Math.floor(1*Math.random())

    var respoimage = await axios.get(`${r_text[i]}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.png, caption: `*•━━━━╼⤏ꪶɪᴛs-ᴍᴇ ͢ʜʏᷤᴘͥᴇᷢʀ⁨ꫂ⁩⤎╾━━━•*

 

        *ɢɪᴛʜᴜʙ ʟɪɴᴋ  http://github.com/Hypersir/Fidha-Mwol*

 

 

       *ᴏᴡɴᴇʀ ɴᴜᴍʙᴇʀ   http://Wa.me/+917025967090*

  

  

      *ɢɪᴛʜᴜʙ ᴘʀᴏғɪʟᴇ ʟɪɴᴋ https://github.com/Hypersir*

`}) 

}));
