/* Copyright (C) 2020 Yusuf Usta.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
RE CODE - KTB 
*/

const Ktb = require('../events');
const {WAConnection , MessageType} = require('@adiwajshing/baileys');
const {spawnSync} = require('child_process');
const Config = require('../config');
const config = require('../config');
const util = require('util')
const parseInt = require('parse-int');
const chalk = require('chalk');
const conn = new WAConnection();
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('system_mk');


const conf = require('../config');
let wk = conf.WORKTYPE == 'public' ? false : true

  Ktb.addCommand({pattern: 'kill', fromMe: wk, desc: Lang.ALIVE_DESC}, (async (message, match) => {
    //  ....................................................................................................
      var plk_say = new Date().toLocaleString('HI', { timeZone: 'Asia/Kolkata' }).split(' ')[1]           // .
        const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };   // .   
        var plk_here = new Date().toLocaleDateString(get_localized_date)                                  // .  --------->>> CREDIT:-AFNAN PLK PINKYMWOL 
	  var afnplk = '```⏱ Time :' + plk_say + '```\n\n ```📅 Date :' + plk_here + '```'                  // .
                                                                                                          // . 
    // ..................................................................................................  
        let pp
        try { pp = await message.client.getProfilePicture(message.jid.includes('-') ? message.data.participant : message.jid ); } catch { pp = await message.client.getProfilePicture(); }
        await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => { await message.client.sendMessage(message.jid, res.data, MessageType.image,{ quoted: message.data,caption: Config.ALIVEMSG.replace('{pp}', '').replace('{time}', afnplk).replace('{qt}' )})}); 
}));

     
     
     
    Ktb.addCommand({pattern: 'jk', fromMe: wk, desc: Lang.SYSD_DESC}, (async (message, match) => {

        const child = spawnSync('neofetch', ['--stdout']).stdout.toString('utf-8')
        await message.sendMessage(
            '```' + child + '```', MessageType.text
        );
    }));



Ktb.addCommand({pattern: 'al', fromMe: wk, desc: Lang.ALIVE_DESC}, (async (message, match) => {

             const buttons = [
  {buttonId: '!git', buttonText: {displayText: 'chumma'}, type: '!git'},
  {buttonId: 'owner', buttonText: {displayText: '😀😀😀'}, type: 'owner'}
]

const buttonMessage = {
    contentText: 'Hi Friends',
    footerText: 'Amalser ©',
    buttons: buttons,
    headerType: "EMPTY"
}

   await message.client.sendMessage(message.jid, buttonMessage, MessageType.buttonsMessage)})); 



    
    Ktb.addCommand({pattern: 'njn', fromMe: wk, desc: Lang.SYSD_DESC, dontAddCommandList: true }, (async (message, match) => {

        
        await message.sendMessage(message.jid, "I'm " +conn.user.name+'\n Wa version :' +conn.user.phone.wa_version+'\n Version :' + Config.VERSION +'\n Phone Version :' + conn.user.phone.os_version+'\n Device Model :' +conn.user.phone.device_model+ '\n Phone Manufacturer :' +conn.user.phone.device_manufacturer  , MessageType.text);
    
                                                                           

    
    }))
