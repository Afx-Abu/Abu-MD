/* Amalser Bot
Re-edit Amalser
*/

const Amalser = require('../events');
const {MessageType, GroupSettingChange, Mimetype, MessageOptions} = require('@adiwajshing/baileys');
const fs = require('fs');
const Config = require('../config')
const config = require('../config')
const axios = require('axios')
const request = require('request');
const os = require('os');
var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '' }    
var ggg = Buffer.from(clh.cd, 'base64')
var ddd = ggg.toString('utf-8')


let whb = Config.WORKTYPE == 'public' ? false : true

Amalser.addCommand({pattern: 'git', fromMe: whb, dontAddCommandList: true}, (async (message, match) => {
// send a buttons message!credit Amal
    const buttons = [
        {buttonId: 'id1', buttonText: {displayText: '.update' }, type: 1},
        {buttonId: 'id2', buttonText: {displayText: '.updatenow' }, type: 1}
      ]
      
      const buttonMessage = {
          contentText: '◩ Bot name: Amalser\n\n*To check update .update   To update Bot .update now*\n\n*Bot making video* : https://youtu.be/5MKycJxmA4c\n\nInstagram id :  https://www.instagram.com/p/CCdcH3FBd1a/?utm_medium=copy_link\n\n*Yt_PASSWORD: _________password on this video watch it full*\n\n*githublink* : https://github.com/Amal-ser/Amalser\n\n*Amalser New Acoount Git Link Old Account Is Flagged Hope you Enjoy This Thanku* 🥰\n',
          footerText: 'Amalser ©',
          buttons: buttons,
          headerType: 1
      }
      
      await message.client.sendMessage(message.jid, buttonMessage, MessageType.buttonsMessage)

}));
