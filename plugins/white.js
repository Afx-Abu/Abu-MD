/* Copyright (C) 2021 TERROR-BOY.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Amalser-------© Amal
*/

const Ktb = require('../events');
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const Config = require('../config');

    Ktb.addCommand({pattern: 'send$', fromMe: true, desc: 'Download status from whatsapp'}, (async (message, match) => {    

        if (message.reply_message === false) return await message.client.sendMessage(message.jid,'reply to a status', MessageType.text);
        var downloading = await message.client.sendMessage(message.jid,'*Downloading Status*',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        if (message.reply_message.video === false && message.reply_message.image) {
            ffmpeg(location)
                .save('status.png')
                .on('end', async () => {
                    await message.client.sendMessage(message.jid,fs.readFileSync('status.png'), MessageType.image ,{caption: '```STATUS 🍃```'  , mimetype: Mimetype.jpg, quoted: message.data,thumbnail: White.tm_b});
            });
        return 
        }

        ffmpeg(location)
            .save('status.mp4')
            .on('end', async () => {
                await message.client.sendMessage(message.client.jid,fs.readFileSync('status.mp4'), MessageType.video , {caption: '```STATUS 🍃```'  , mimetype: Mimetype.mp4, quoted: message.data,thumbnail: White.tm_b});
            });
        return 
    }));
