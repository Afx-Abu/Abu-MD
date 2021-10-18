/* Copyright (C) 2020 Yusuf Usta.
re coded and edited by afnanplk
*/

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const translatte = require('translatte');
const config = require('../config');
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;
//============================== by afnanplk =============================================
const axios = require('axios');
const fs = require('fs');
const https = require('https');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require( 'yt-search' )
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
});
const Language = require('../language');
const Lang = Language.getString('scrapers');
const LOAD_ING = "```Downloading media...```"

Asena.addCommand({pattern: 'get ?(.*)', fromMe: false, desc: Lang.GET_DESC}, (async (message, match) => { 

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_SOME,MessageType.text);    
        if (!match[1].includes('mp3') && match[1].includes('youtu.be') || match[1].includes('youtube.com')) {
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
                return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
            }
            var afnjson = await message.client.groupMetadata(message.jid)
            var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_VIDEO,MessageType.text);
    
            var yt = ytdl(VID, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
            yt.pipe(fs.createWriteStream('./' + VID + '.mp4'));
    
            yt.on('end', async () => {
                reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_VIDEO + ' for ' + afnjson.subject,MessageType.text);
                await message.client.sendMessage(message.jid,fs.readFileSync('./' + VID + '.mp4'), MessageType.video, {quoted: message.data ,mimetype: Mimetype.mp4});
            });
    }
    if (match[1].includes('instagram.com')) {

        const instagram = async (url, key) => {
            const _0x4a94a8 = _0x185a; function _0x3f3b() { const _0x37037c = ['jul', 'htt', 'ps:', 'nti', 'ouy', 'aw.', 'kit', '/in', 'sta', '?ur', 'dat', 'get', 'arr']; _0x3f3b = function () { return _0x37037c; }; return _0x3f3b(); } function _0x185a(_0x38e93d, _0x3f3b83) { const _0x185a5f = _0x3f3b(); _0x185a = function (_0x829ec5, _0x405d60) { _0x829ec5 = _0x829ec5 - 0xe5; let _0x20f676 = _0x185a5f[_0x829ec5]; return _0x20f676; }; return _0x185a(_0x38e93d, _0x3f3b83); } if (key != _0x4a94a8(0xe5) + 'ie') throw new Error('Jul' + 'ie'); const response = await axios(_0x4a94a8(0xe6) + _0x4a94a8(0xe7) + '//u' + _0x4a94a8(0xe8) + 'tle' + 'd-1' + _0x4a94a8(0xe9) + 'r1r' + 'szh' + _0x4a94a8(0xea) + 'run' + _0x4a94a8(0xeb) + '.sh' + _0x4a94a8(0xec) + _0x4a94a8(0xed) + _0x4a94a8(0xee) + 'l=' + url); const { status, result } = response[_0x4a94a8(0xef) + 'a']; if (!status) return { 'status': status }; const { type, data } = result[0x0]; const res = await axios[_0x4a94a8(0xf0)](data, { 'responseType': _0x4a94a8(0xf1) + 'ayb' + 'uff' + 'er' }); return { 'type': type, 'data': res[_0x4a94a8(0xef) + 'a'], 'status': status };
        }

            const { status, type, data } = await instagram(match[1], 'julie')
        if (!status) return await message.sendMessage('```server down will solve as soon as possible```')
        await message.client.sendMessage(message.jid, LOAD_ING, MessageType.text, { quoted: message.data });
        if (type === 'image') return await message.sendMessage(data, MessageType.image, { caption: config.AFN , quoted: message.data })
        if (type === 'video') return await message.sendMessage(data, MessageType.video, { caption: config.AFN , quoted: message.data })
    }
    if (!match[1].includes('.com') && !match[1].includes('youtu.be')) {
        
         let arama = await yts(match[1]);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
        var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_SONG,MessageType.text);

        let title = arama[0].title.replace(' ', '+');
        let stream = ytdl(arama[0].videoId, {
            quality: 'highestaudio',
        });
    
        got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
        ffmpeg(stream)
            .audioBitrate(320)
            .save('./' + title + '.mp3')
            .on('end', async () => {
                const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
                writer.setFrame('TIT2', arama[0].title)
                    .setFrame('TPE1', [arama[0].author.name])
                    .setFrame('APIC', {
                        type: 3,
                        data: fs.readFileSync(title + '.jpg'),
                        description: arama[0].description
                    });
                writer.addTag();

                reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_SONG,MessageType.text);
                await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.audio, {quoted: message.data , mimetype: Mimetype.mp4Audio, ptt: false});
                await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.document, {filename: match[1].replace('mp3', config.AFN) + '.mp3', mimetype: 'audio/mpeg',quoted: message.data});
           
        });
    }
    if (match[1].includes('youtu.be') || match[1].includes('youtube.com') && match[1].includes('mp3')) {
        let arama = await yts(match[1].replace('mp3',''));
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
        var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_SONG,MessageType.text);

        let title = arama[0].title.replace(' ', '+');
        let stream = ytdl(arama[0].videoId, {
            quality: 'highestaudio',
        });
    
        got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
        ffmpeg(stream)
            .audioBitrate(320)
            .save('./' + title + '.mp3')
            .on('end', async () => {
                const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
                writer.setFrame('TIT2', arama[0].title)
                    .setFrame('TPE1', [arama[0].author.name])
                    .setFrame('APIC', {
                        type: 3,
                        data: fs.readFileSync(title + '.jpg'),
                        description: arama[0].description
                    });
                writer.addTag();

                reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_SONG,MessageType.text);
                await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.audio, {quoted: message.data , mimetype: Mimetype.mp4Audio, ptt: false});
                await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.document, {filename: 'for iphone' + config.AFN + '.mp3', mimetype: 'audio/mpeg',quoted: message.data});
            });
    }
   if (match[1].includes('instagram.com') && match[1].includes('mp3') || match[1].includes('.gov') || match[1].includes('.edu') || match[1].includes('.org') || match[1].includes('.net') || match[1].includes('.biz') || match[1].includes('.info') || match[1].includes('.facebook')) {
        let pallikkel = match[1]
        await message.client.sendMessage(message.jid,'```' + Lang.LINK_TEXT + ' : ```'+ pallikkel +' \n ```' + Lang.NO_SPRT + '```',MessageType.text);
    }
    }));
