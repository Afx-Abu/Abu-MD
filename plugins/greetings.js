let WhatsAlexa = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let sql = require('./sql/greetings');
let Language = require('../language');
let Lang = Language.getString('greetings');

WhatsAlexa.addCommand({pattern: 'welcome$', fromMe: true, desc: Lang.WELCOME_DESC}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid);
    if (hg === false) {
        await message.client.sendMessage(message.jid,Lang.NOT_SET_WELCOME,MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
    } else {
        await message.client.sendMessage(message.jid,Lang.WELCOME_ALREADY_SETTED + hg.message + '```',MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
    }
}));

WhatsAlexa.addCommand({pattern: 'welcome (.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,Lang.NEED_WELCOME_TEXT, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,Lang.WELCOME_DELETED,MessageType.text); return await sql.deleteMessage(message.jid, 'welcome'); }
        await sql.setMessage(message.jid, 'welcome', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,Lang.WELCOME_SETTED,MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
    }
}));

WhatsAlexa.addCommand({pattern: 'goodbye$', fromMe: true, desc: Lang.GOODBYE_DESC}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid, 'goodbye');
    if (hg === false) {
        await message.client.sendMessage(message.jid,Lang.NOT_SET_GOODBYE,MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
    } else {
        await message.client.sendMessage(message.jid,Lang.GOODBYE_ALREADY_SETTED + hg.message + '```',MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
    }
}));

WhatsAlexa.addCommand({pattern: 'goodbye (.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,Lang.NEED_GOODBYE_TEXT,MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,Lang.GOODBYE_DELETED,MessageType.text); return await sql.deleteMessage(message.jid, 'goodbye'); }
        await sql.setMessage(message.jid, 'goodbye', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,Lang.GOODBYE_SETTED,MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
    }
}));
