const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('gitlink');

Asena.addCommand({pattern: 'git', fromMe: false, desc: Lang.GL}, (async (message, match) => {

    var r_text = new Array ();
    
    
   
  r_text[0] = "https://i.imgur.com/K4xzd0M.jpeg";
    
    
    var i = Math.floor(1*Math.random())

    var respoimage = await axios.get(`${r_text[i]}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.png, caption: `*•━━━━╼⤏FidhaMwol⤎╾━━━•*
 

        *ɢɪᴛʜᴜʙ ʟɪɴᴋ        _http://github.com/Hypersir/Fidha-Mwol_*
 

       *ʙᴏᴛ ᴍᴀᴋɪɴɢ ᴠɪᴅᴇᴏ    _https://youtu.be/WGfDEHJyV1I_*
 
 
       *ᴏᴡɴᴇʀ ɴᴜᴍʙᴇʀ        _https://Wa.me/+917025967090_*
  
  
      *ɢɪᴛʜᴜʙ ᴘʀᴏғɪʟᴇ ʟɪɴᴋ _https://github.com/Hypersir_*
`}) 

})); 
