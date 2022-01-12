const asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const OWNER = "it sends details of owner"
const GIT = "it sends links"
const Config = require('../config');


if (Config.WORKTYPE == 'private') {
        asena.addCommand({pattern: 'owner', fromMe: true, deleteCommand: true, desc: OWNER,}, (async (message, match) => {

    var r_text = new Array ();
    
    r_text[1] = "*╔══■□💙ᴀʙᴜsᴇʀ💙■□══╗*\n           \n*⚜═ᴀʙᴜsᴇʀ═⚜*\n\n*𝕆𝕨𝕟𝕖𝕣 Aʙᴜ-ᴊᴀsɪʟ - https://api.whatsapp.com/send?phone=+917025994178&text=Please%20add%20Aʙᴜsᴇʀ%20bot%20ɢʀᴏᴜᴘ%20💙*\n*            *\n*╚══■□💙ᴀʙᴜsᴇʀ💙■□══╝*\n\n*▷Creator: Aʙᴜ-Jᴀsɪʟ ✝︎*"

    
    await message.client.sendMessage(
        message.jid,(r_text[1]), MessageType.text);

    }));


        asena.addCommand({pattern: 'git', fromMe: true, deleteCommand: true, desc: GIT,}, (async (message, match) => {

        var r_text = new Array ();
    
        r_text[1] = "*Gɪᴛ Lɪɴᴋs*\n           *\n🌟═ᴀʙᴜsᴇʀ ᴏᴡɴᴇʀ ᴀʙᴜ »« ʀᴇᴀʟ ɴᴀᴍᴇ-ᴊᴀsɪʟ═🌟*\n\n*🔅https://github.com/Arx-Abu/Abu_ser*"

    
        await message.client.sendMessage(
            message.jid,(r_text[1]), MessageType.text);
    
        }));    

    }
    

    if (Config.WORKTYPE == 'public') {
        asena.addCommand({pattern: 'owner', fromMe: false, deleteCommand: true, desc: OWNER,}, (async (message, match) => {

    var r_text = new Array ();
    
    r_text[1] = "*╔══■□💙ᴀʙᴜsᴇʀ💙■□══╗*\n           \n*⚜═ᴀʙᴜsᴇʀ═⚜*\n\n*𝕆𝕨𝕟𝕖𝕣 Aʙᴜ-ᴊᴀsɪʟ - https://api.whatsapp.com/send?phone=+917025994178&text=Please%20add%20Aʙᴜsᴇʀ%20bot%20ɢʀᴏᴜᴘ%20💙*\n*            *\n*╚══■□💙ᴀʙᴜsᴇʀ💙■□══╝*\n\n*▷Creator: Aʙᴜ-Jᴀsɪʟ ✝︎*"

    
    await message.client.sendMessage(
        message.jid,(r_text[1]), MessageType.text);

    }));


        asena.addCommand({pattern: 'git', fromMe: false, deleteCommand: true, desc: GIT,}, (async (message, match) => {

        var r_text = new Array ();
    
        r_text[1] = "*Gɪᴛ Lɪɴᴋs*\n           *\n🌟═ᴀʙᴜsᴇʀ ᴏᴡɴᴇʀ ᴀʙᴜ »« ʀᴇᴀʟ ɴᴀᴍᴇ-ᴊᴀsɪʟ═🌟*\n\n*🔅https://github.com/Arx-Abu/Abu_ser*"

    
        await message.client.sendMessage(
            message.jid,(r_text[1]), MessageType.text);
    
        }));    

    }
