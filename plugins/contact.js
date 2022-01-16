const Ktb = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const exec = require('child_process').exec;
const os = require("os");
const fs = require('fs');
const Config = require('../config')
Ktb.addCommand({ pattern: 'git ?(.*)', fromMe: false, desc: 'owner number' }, (async (message, match) => {

//coded by saidali
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:AMRU SER [OWNER]\n'917025631103// full name
            + 'ORG:AMRU SER;\n' // 
            + 'TEL;type=CELL;type=VOICE;waid=917025631103:\n' // WhatsApp ID +917025631103
            + 'END:VCARD'
await message.client.sendMessage(message.jid,{displayname: "AMRU SER [OWNER]", vcard: vcard}, MessageType.contact)
}))
