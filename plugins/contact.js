const Pinky = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const exec = require('child_process').exec;
const os = require("os");
const fs = require('fs');
Pinky.addCommand({ pattern: 'git ?(.*)', fromMe: false, desc: 'owner number' }, (async (message, match) => {
const Pinky = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:' + Pinky.OA_NAME + '\n' //created afnanplk, please copy this with credit..
            + 'ORG:pinky julie fam;\n'
            + 'TEL;type=CELL;type=VOICE;waid=' + Pinky.PHONE + ':' + Pinky.PHONE + ' \n'
            + 'END:VCARD'
await message.client.sendMessage(message.jid, {displayname: "PINKY", vcard: Pinky}, MessageType.contact);
}))
