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

WhatsAlexa.addCommand({pattern: 'live', fromMe: whb, dontAddCommandList: true}, (async (message, match) => {
// send a buttons message!
var r_text = new Array ();
    
  
r_text[0] = "https://i.imgur.com/w89FHm7.jpeg";
r_text[1] = Config.LG_LOGO
   
var i = Math.floor(2*Math.random())
    const buttons = [
        {buttonId: 'id1', buttonText: {displayText: 'Hii'}, type: 1},
        {buttonId: 'id2', buttonText: {displayText: 'Bot'}, type: 1}
      ]
      
      const buttonMessage = {
          contentText: ' ``` '+Config.BOT+'\n\n```'+Config.ALIVEMSG+'\n',
          footerText: 'Amalser ©',
          buttons: buttons,
          headerType: 1
      }
      
      await message.client.sendMessage(message.jid, buttonMessage, MessageType.buttonsMessage)

}));
