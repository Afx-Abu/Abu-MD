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
const { getBuffer } = require("../White/cofig");
const os = require('os');
var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '' }    
var ggg = Buffer.from(clh.cd, 'base64')
var ddd = ggg.toString('utf-8')

Neotro.addCommand({pattern: 'bot', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
// send a buttons message!
    const buttons = [
        {buttonId: 'id1', buttonText: {displayText: 'Hii ❤️'}, type: 1},
        {buttonId: 'id2', buttonText: {displayText: 'I am fine 🤩'}, type: 1},
        {buttonId: 'id3', buttonText: {displayText: 'Welcome 🥳'}, type: 1}
      ]
      
      const buttonMessage = {
          contentText: "Hi How are you ?",
          footerText: 'owner  Amal  ©',
          buttons: buttons,
          headerType: 1
      }
      
      await message.client.sendMessage(message.jid, buttonMessage, MessageType.buttonsMessage)

}));
