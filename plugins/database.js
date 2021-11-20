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

WhatsAlexa.addCommand({pattern: 'bot', fromMe: whb, dontAddCommandList: true}, (async (message, match) => {
// send a buttons message! Amalser.
    var plk_say = new Date().toLocaleString('HI', { timeZone: 'Asia/Kolkata' }).split(' ')[1]
const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var plk_here = new Date().toLocaleDateString(get_localized_date)
var afnplk = '```⏱ Time :' + plk_say + '```\n\n ```📅 Date :' + plk_here + '```'
	const buttons = [

        {buttonId: 'id1', buttonText: {displayText: 'OWN\n\n*Amalser v2 two types of alive message*\n\n*Hi i am live {pp}*\n\n*Hi i am alive {qt}*\n\n*welcome message addedd simple way*\n\n*.welcome {pp} {gphead} {gpmaker} {gpdesc}{owner}*\n\n*Another way*\n*.welcome {gif} {gphead} {gpmaker} {gpdesc} {time} {owner}*\n\n*Broadcast adedd replay with any message .bc*\n\n*Alive message time set*\n\n*Button message added .bot and .help*\n\n*All type of downloading command example .yt, .video, .song, .get*\n\n '}, type: 1},
        {buttonId: 'id2', buttonText: {displayText: 'GIT\n\n```youtube Video: https://youtu.be/5MKycJxmA4c```\n\n```Github link: https://github.com/Amal-ser/Amalser```\n\n```YT_PASSWORD:  password in youtube channel video watch it full and subcribe for more updations```\n\n```For making photo to link - https://t.me/HK_telegraph_BOT```\n'  }, type: 1},

      ]
      
      const buttonMessage = {
          contentText: ' ʜʏ ᴅᴜᴅᴇ....👋🏻\n\n```BOT NAME:``` *'+Config.BOT+'*\n\n🃏 ᴛɪᴍᴇ   : ```' + plk_say + '```\n🍒 ᴅᴀᴛᴇ : ```' + plk_here + '```\n\n🃏 ᴄʟɪᴄᴋ ᴍᴇɴᴜ ᴀɴᴅ ᴇɴᴊᴏʏ ᴛʜᴇ ʙᴏᴛ\n',
          footerText: '© Amalser',
          buttons: buttons,
          headerType: 1
      }
      
      await message.client.sendMessage(message.jid, buttonMessage, MessageType.buttonsMessage)

}));

