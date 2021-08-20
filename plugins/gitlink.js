const Asena = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const Config = require('../config');


Asena.addCommand({pattern: 'git', fromMe: true,dontAddCommandList: true}, (async (message, match) => {
        
    var r_text = new Array ();    
r_text[0] = "•━━━━╼⤏FidhaMwol⤎╾━━━•\n\n ɢɪᴛʜᴜʙ:http://github.com/Hypersir/Fidha-Mwol\n\nʙᴏᴛ ᴍᴀᴋɪɴɢ ᴠɪᴅᴇᴏ ʟɪɴᴋ:https://youtu.be/WGfDEHJyV1I \n\n ᴏᴡɴᴇʀ ɴᴜᴍʙᴇʀ:Wa.me/+917025967090";
r_text[1] = "•━━━━╼⤏FidhaMwol⤎╾━━━•\n ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʜʏᴘᴇʀꜱɪʀ \n\n to know how to deploy click on the link given below \n\n https://youtu.be/WGfDEHJyV1I \n\n contact ʜʏᴘᴇʀꜱɪʀ \n Wa.me/+917025967090 ";
  var i = Math.floor(2*Math.random())

await message.sendMessage(r_text[i]);

}));
