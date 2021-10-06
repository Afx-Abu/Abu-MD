/* COPYRIGHT © HISHAN-SOPHIA
   RE-CODED - TERROR BOY
*/
const Hisham = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const exec = require('child_process').exec;
const os = require("os");
const fs = require('fs');
const Config = require('../config')

// Inbox Block System
// This Plugins By Hisham Muhammed 
const INBO1 = "_~~~••• AMALSER_V2 •••~~~_* \n\n\n *i am blocking you.* \n\n *REASON:THERI ITTATH KOND🖐🏻🖐🏻"
 if (Config.INBO1 == 'true') {
Hisham.addCommand({on: 'text', fromMe: false, delownsewcmd: false, onlyPm: true }, (async (message, match) => {
        let regexb1ichu = new RegExp('thayoli')
        let regexb2ichu = new RegExp('myre')
        let regexb3ichu = new RegExp('kunna')
        let regexb4ichu = new RegExp('poorimone')
        let regexb5ichu = new RegExp('myr')
        let regexb6ichu = new RegExp('patti')
        let regexb7ichu = new RegExp('oombi')
        let regexb8ichu = new RegExp('thendi')
// export data -(Hisham-muhammed)
          if (regexb1ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO1 + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          } 
        else if (regexb2ichu.test(message.message)) {
          
           await message.client.sendMessage(message.jid, '*' + INBO1 + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
         else if (regexb3ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO1 + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
        else if (regexb4ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO1 + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
          else if (regexb5ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO1 + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
          else if (regexb6ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO1 + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
         else if (regexb6ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO1 + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
         else if (regexb7ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO1 + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
         else if (regexb8ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO1 + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
          
}));


}
