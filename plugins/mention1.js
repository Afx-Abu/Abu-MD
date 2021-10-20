const Asena = require('../events');
const{MessageType} = require('@adiwajshing/baileys')
const tor = "Envía una Advertencia a un usuario"
const rep = "*¡Por favor responda al usuario para Advertirle!*"
const rap = "=== ```1er advertencia``` ===\n\n"

Asena.addCommand({pattern: 'm1 ?(.*)', fromMe: false, OnlyGroup: true, desc: tor}, (async (message, match) => {

    if (match[1] == '' && message.reply_message) {

        let group = await message.client.groupMetadata(message.jid);

        var jids = [];

        message = '';

        group['participants'].map(async (member) => {

            if (user.isAdmin) {

                message += '@' + user.id.split('@')[0] + ' ';

                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));

            }

        });

        await message.client.sendMessage(message.jid,rap + '*Usuario:* ' + '@' + message.reply_message.jid.split('@')[0] , MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})

        

    }

    else if (match[1] !== '' && message.reply_message) {

        let group = await message.client.groupMetadata(message.jid);

        var jids = [];

        message = '';

        group['participants'].map(async (member) => {

            if (user.isAdmin) {

                message += '@' + user.id.split('@')[0] + ' ';

                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));

            }

        });

        await message.client.sendMessage(message.jid,rap + '*Usuario:* ' + '@' + message.reply_message.jid.split('@')[0] + `\n*Razón:* ${match [1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})

    }

    else if (!message.reply_message) {

        return message.client.sendMessage(message.jid,rep, MessageType.text);

    }

}));
