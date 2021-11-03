/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const Config = require('../config');

const KeyLol = ['UAkOKdct','tJgWUsGV', 'gZuwdayT', 'vw6q6fEr', 'S6bEnCiS', 'zekais', 'FMoh8lhs']
const Lol = KeyLol[Math.floor(Math.random() * KeyLol.length)]

const DESC_BOB = "Make text on sponge bob's board"

const DESC_GURA = "Create gawr gura text"

const Language = require('../language');
const Lang = Language.getString('ttp');


if (Config.WORKTYPE == 'private') {
    Asena.addCommand({ pattern: 'ttp ?(.*)', fromMe: true, desc: Lang.TTP_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://api.xteam.xyz/ttp?file&text=' + uri, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Made by publicbot' })
    }));
    Asena.addCommand({ pattern: 'attp ?(.*)', fromMe: true, desc: Lang.ATTP_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://api.xteam.xyz/attp?file&text=' + uri, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.sticker, { mimetype: Mimetype.webp })
    }));
Asena.addCommand({ pattern: 'bob ?(.*)', fromMe: true, desc: DESC_BOB }, (async (message, match) => {
if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
var uria = encodeURI(match[1])
var ttinullimageh = await axios.get(`https://zekais-api.herokuapp.com/sbburn?text=${uria}&apikey=${Lol}`, { responseType: 'arraybuffer' })
await message.client.sendMessage(message.jid,Buffer.from(ttinullimageh.data), MessageType.image)
}));
 Asena.addCommand({ pattern: 'gura ?(.*)', fromMe: true, desc: DESC_GURA }, (async (message, match) => {
if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
var uria = encodeURI(match[1])
var ttinullimageh = await axios.get(`https://hardianto-chan.herokuapp.com/api/bot/gura?apikey=hardianto&nama=${uria}`, { responseType: 'arraybuffer' })
await message.client.sendMessage(message.jid,Buffer.from(ttinullimageh.data), MessageType.image)
}));
}
else if (Config.WORKTYPE == 'public') {
    Asena.addCommand({ pattern: 'ttp ?(.*)', fromMe: false, desc: Lang.TTP_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://api.xteam.xyz/ttp?file&text=' + uri, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Made by publicbot' })
    }));
    Asena.addCommand({ pattern: 'attp ?(.*)', fromMe: false, desc: Lang.ATTP_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://api.xteam.xyz/attp?file&text=' + uri, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.sticker, { mimetype: Mimetype.webp })
    }));
    
Asena.addCommand({ pattern: 'bob ?(.*)', fromMe: false, desc: DESC_BOB }, (async (message, match) => {
if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
var uria = encodeURI(match[1])
var ttinullimageh = await axios.get(`https://zekais-api.herokuapp.com/sbburn?text=${uria}&apikey=${Lol}`, { responseType: 'arraybuffer' })
await message.client.sendMessage(message.jid,Buffer.from(ttinullimageh.data), MessageType.image)
}));
    
Asena.addCommand({ pattern: 'gura ?(.*)', fromMe: true, desc: DESC_GURA }, (async (message, match) => {
if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
var uria = encodeURI(match[1])
var ttinullimageh = await axios.get(`https://hardianto-chan.herokuapp.com/api/bot/gura?apikey=hardianto&nama=${uria}`, { responseType: 'arraybuffer' })
await message.client.sendMessage(message.jid,Buffer.from(ttinullimageh.data), MessageType.image)
}));
}
