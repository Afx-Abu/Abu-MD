const WhatsAlexa = require('../events');
const {MessageType, GroupSettingChange, Mimetype, MessageOptions} = require('@adiwajshing/baileys');
const fs = require('fs');
const Config = require('../config')
const axios = require('axios')
const request = require('request');
const os = require('os');
var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '' }    
var ggg = Buffer.from(clh.cd, 'base64')
var ddd = ggg.toString('utf-8')

let whb = Config.WORKTYPE == 'public' ? false : true

WhatsAlexa.addCommand({pattern: 'check', fromMe: whb, dontAddCommandList: true}, (async (message, match) => {
// send a buttons message!
    const buttons = [
        {buttonId: `${pattern}nothingkkk`, buttonText: {displayText: 'i am fine 🥰'}, type: 1},
        {buttonId: `${pattern}nothingkkka`, buttonText: {displayText: 'Do you like Bot'}, type: 1},
        {buttonId: `${pattern}nothingkkkaa`, buttonText: {displayText: 'Hii'}, type: 1}
      ]
      
      const buttonMessage = {
          contentText: "Hi How Are You ?",
          footerText: 'owner Amalser  ©',
          buttons: buttons,
          headerType: 1
      }
      
      await message.client.sendMessage(message.jid, buttonMessage, MessageType.buttonsMessage)

}));

WhatsAlexa.addCommand({pattern: 'nothingkkk', fromMe: whb, dontAddCommandList: false}, (async (message, match) => {
//await message.client.sendMessage(``)
await message.sendMessage(`Good !!, I'm very happy to hear that you're alright`);
}));

WhatsAlexa.addCommand({pattern: 'nothingkkka', fromMe: whb, dontAddCommandList: false}, (async (message, match) => {
//await message.client.sendMessage(``)
await message.sendMessage(`Glad to hear you liked me`);
}));

WhatsAlexa.addCommand({pattern: 'nothingkkkaa', fromMe: whb, dontAddCommandList: false}, (async (message, match) => {
//await message.client.sendMessage(``)
await message.sendMessage(`Hello!!`);
}));
