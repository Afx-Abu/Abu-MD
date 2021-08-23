/* created by hyper,saidali
*/

const Asena = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const Config = require('../config');
const Ln = "*FIDHA-MWOL SETVAR SETTING COMMADS* "
 const code = "*Hi i am help you*\n\n*nigal setvar commad use cheyyan nan nigale sahayikkam*\n\n*ғɪᴅͥʜͭᴀᷤ ᴍͫᴡⷷᴏʟ setvar commads here*\n👇👇👇👇👇👇👇\n*.setvar SUDO:91xxxxxxxxx,0 nigalude number sudo akkuvan*\n*.setvar ALIVE_MESSAGE:alive msg sett cheyyan*\n*.setvar ALL_CAPTION:all image/video caption mattan*\n*. setvar BAN_MESSAGE:ban msg sett cheyyan*\n*.setvar BOT_NAME:bot name sett cheyyan*\n*.setvar KICKME_MESSAGE:kick msg diloge sett akkan*\n*.setvar MUTE_MESSAGE:mute msg set akkan*\n*.setvar OWNER_NAME:owner name mattan*\n*.setvar PROMOTE_MESSAGE:admin akkumbol ulla msg sett akkuvan*\n*.setvar TAG_HEADER:mention tagil heading sett akkuvan*\n*.setvar TAG_REPLY:nigale mention vekkumbol audio/sticker varan ex 91xxxxxxxxxx@s.whatsapp.net*\n\n\n*true and false*\n\n*ture=on*\n*false=off*\n\n*.setvar ALL_LINK_BAN:*\n*.setvar ANTİ_LİNK:*\n*.setvar AUTO_BİO:*\n*.setvar BGM_FILTER:*\n*.setvar BLOCK_CHAT:*\n*.setvar DEBUG:*\n*.setvar FULL_EVA:*\n*.setvar NO_LOG:*\n*.setvar NO_ONLINE:*\n*.setvar SEND_READ:*\n*.setvar STICKER_REPLY:*\n*.setvar THERI_KICK:*\n\n *WORK TYPE CHANGE MEATHEAD*\n*.setvar WORK_TYPE:private*\n*.setvar WORK_TYPE:public*\n *എളുപ്പവഴി*\n*.mlink on/off*\n*.theri no/yes*\n*.fulleva on/off*\n\n\n\n *ALL CREADIT FROM HYPER&SAIDALI AND FIDHAMWOL&LIYAMOL BOTZ*" 
{
    
      Asena.addCommand({pattern: 'setvar', fromMe: false, desc: Ln,}, (async (message, match) => {

    await message.client.sendMessage(
  
      message.jid,code, MessageType.text);
  
  }));
  }
