const Ktb = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const exec = require('child_process').exec;
const os = require("os");
const fs = require('fs');
const Pinky = require('Pinky');
const Config = require('../config')
Ktb.addCommand({ pattern: 'git ?(.*)', fromMe: false, desc: 'owner number' }, (async (message, match) => {

//coded by saidali
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:' + Pinky.OA_NAME + '\n' //created afnanplk, please copy this with credit..
            + 'ORG:pinky julie fam;\n'
            + 'TEL;type=CELL;type=VOICE;waid=' + Pinky.PHONE + ':' + Pinky.PHONE + ' \n'
            + 'END:VCARD'
await message.client.sendMessage(message.jid, {displayname: "PINKY", vcard: p_lk}, MessageType.contact);
}))
