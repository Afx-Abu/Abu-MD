const asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const OWNER = "it sends details of owner"
const GIT = "it sends links"
const Config = require('../config');


if (Config.WORKTYPE == 'private') {
        asena.addCommand({pattern: 'owner', fromMe: true, deleteCommand: true, desc: OWNER,}, (async (message, match) => {

    var r_text = new Array ();
    
    r_text[1] = "*╔══■□💙ᴋᴀᴢᴛʀᴏsᴇʀ💙■□══╗*\n           \n*⚜═ᴋᴀᴢᴛʀᴏsᴇʀ═⚜*\n\n*𝕆𝕨𝕟𝕖𝕣 ᴀᴊᴀʏᴀɴ - https://api.whatsapp.com/send?phone=+918281440156&text=Please%20add%20kaztroser%20bot%20gruop%20💙*\n*            *\n*╚══■□💙ᴋᴀᴢᴛʀᴏsᴇʀ💙■□══╝*\n\n*▷Creator: ᴀᴊᴀʏᴀɴ ✝︎*"

    
    await message.client.sendMessage(
        message.jid,(r_text[1]), MessageType.text);

    }));


        asena.addCommand({pattern: 'git', fromMe: true, deleteCommand: true, desc: GIT,}, (async (message, match) => {

        var r_text = new Array ();
    
        r_text[1] = "*Git links*\n           *\n🌟═ᴋᴀᴢᴛʀᴏsᴇʀ ᴏᴡɴᴇʀ ᴀᴊ ғx═🌟*\n\n*🔅https://github.com/Aj-fx/Kaztroserv1*"

    
        await message.client.sendMessage(
            message.jid,(r_text[1]), MessageType.text);
    
        }));    

    }
    

    if (Config.WORKTYPE == 'public') {
        asena.addCommand({pattern: 'owner', fromMe: false, deleteCommand: true, desc: OWNER,}, (async (message, match) => {

    var r_text = new Array ();
    
    r_text[1] = "*╔══■□💙ᴋᴀᴢᴛʀᴏsᴇʀ💙■□══╗*\n           \n*⚜═ᴋᴀᴢᴛʀᴏsᴇʀ═⚜*\n\n*ᴏᴡɴᴇʀ ᴀᴊ ғx - https://api.whatsapp.com/send?phone=+918281440156&text=Please%20add%20kaztroser%20bot%20gruop%20💙*\n*            *\n*╚══■□💙ᴋᴀᴢᴛʀᴏsᴇʀ💙■□══╝*\n\n*▷Creator: ᴀᴊᴀʏᴀɴ ✝︎*"

    
    await message.client.sendMessage(
        message.jid,(r_text[1]), MessageType.text);

    }));


        asena.addCommand({pattern: 'git', fromMe: false, deleteCommand: true, desc: GIT,}, (async (message, match) => {

        var r_text = new Array ();
    
        r_text[1] = "*Git links*\n           *\n🌟═ᴋᴀᴢᴛʀᴏsᴇʀ ᴏᴡɴᴇʀ ᴀᴊ ғx═🌟*\n\n*🔅https://github.com/Aj-fx/Kaztroserv1*"

    
        await message.client.sendMessage(
            message.jid,(r_text[1]), MessageType.text);
    
        }));    

    }
