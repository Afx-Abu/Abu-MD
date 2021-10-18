/* Copyright (C) 2021 Amalser.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Amalser - Amal
Wa.me/+919895828468
*/

const Neotro = require('../events');
const {MessageType, GroupSettingChange, Mimetype, MessageOptions} = require('@adiwajshing/baileys');
const fs = require('fs');
const Config = require('../config')
const axios = require('axios')
const request = require('request');
const os = require('os');
const Language = require('../language');
const Lang = Language.getString('amalser');
var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '' }    
var ggg = Buffer.from(clh.cd, 'base64')
var ddd = ggg.toString('utf-8')
let td = Config.WORKTYPE == 'public' ? false : true

Neotro.addCommand({pattern: 'bttn', fromMe: td, desc: Lang.MENU}, (async (message, match) => {
// send a buttons message!
    const buttons = [
        {buttonId: 'id1', buttonText: {displayText: 'Hii ❣️'}, type: 1},
        {buttonId: 'id2', buttonText: {displayText: 'How are you ?'}, type: 1},
        {buttonId: 'id3', buttonText: {displayText: '.menu'}, type: 1}
        ]
      //you can edite All display text
      const buttonMessage = {
          contentText: "Hey 🥰 its me Amalser Bot 💌",
          footerText: 'Owners: Amal ©',
          buttons: buttons,
          headerType: 1
      }
      
      await message.client.sendMessage(message.jid, buttonMessage, MessageType.buttonsMessage)

}));
