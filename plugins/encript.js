/* Copyright © 2021 TERROR BOY.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WHITE DEVIL ----»»» TERROR BOY
*/


const Ktb = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const translatte = require('translatte');
const fs = require('fs');
const Language = require('../language');
const Lang = Language.getString('scrapers');
const Config = require('../config');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require( 'yt-search' );
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const axios = require('axios')

let TB = Config.WORKTYPE == 'public' ? false : true

Ktb.addCommand({ pattern: 'splay ?(.*)', fromMe: TB,  deleteCommand: false, desc: Lang.SONG_DESC}, (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_VIDEO,MessageType.text, {quoted: message.data});    
    if (match[1].includes('shorts')) return await message.client.sendMessage(message.jid,Lang.SHORTS,MessageType.text, {quoted: message.data});

    var VID = '';
    try {
        if (match[1].includes('watch')) {
            var tsts = match[1].replace('watch?v=', '')
                var alal = tsts.split('/')[3]
                VID = alal
        } else {     
                VID = match[1].split('/')[3]
        }
    } catch {
            return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data});
    }
    var downloading = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_VIDEO,MessageType.text, {quoted: message.data});

    var yt = ytdl(VID, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
        yt.pipe(fs.createWriteStream('./' + VID + '.mp4'));

    yt.on('end', async () => {
        var uploading = await message.client.sendMessage(message.jid,Lang.UPLOADING_VIDEO,MessageType.text, {quoted: message.data});
        await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true});
        await message.client.sendMessage(message.jid,fs.readFileSync('./' + VID + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4, quoted: message.data, filename: title + '.mp4', thumbnail: thumb});
        return await message.client.deleteMessage(message.jid, {id: uploading.key.id, remoteJid: message.jid, fromMe: true})
    });
}));
