/* Copyright (C) 2020 afnanplk.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/


const {MessageType, GroupSettingChange, ChatModification, WAConnectionTest} = require('@adiwajshing/baileys');
const Asena = require('../events');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('admin');
const mut = Language.getString('mute');
const END = "clear all messages"

async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {
        if (member.id.split('@')[0] === user.split('@')[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}

Asena.addCommand({pattern: 'clear', fromMe: true, desc: END, dontAddCommandList: true}, (async (message, match) => {

    await message.sendMessage('```cleaning chat...```');
    await message.client.modifyChat (message.jid, ChatModification.delete);
    await message.sendMessage('```🏳 Chat cleared 🏳```');
}));

Asena.addCommand({pattern: 'clean ?(.*)', fromMe: true, desc: END, dontAddCommandList: true}, (async (message, match) => {

    await message.sendMessage('Chat clearing...');   
    await message.client.modifyChat (match[1] == '' ? message.jid : match [1], ChatModification.delete);
    await message.sendMessage('🚮 Chat cleared');
}));