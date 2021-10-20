const {MessageType, MessageOptions, Mimetype} = require("@adiwajshing/baileys");
const Skueletor = require('../events');
const Config = require('../config');
const id = '51912545279@s.whatsapp.net' // el ID del WhatsApp

const buttons = [
    {buttonId: '51912545279@s.whatsapp.net', buttonText: {displayText: 'fine'}, type: 1},
    {buttonId: '51912545279@s.whatsapp.net', buttonText: {displayText: 'welcome'}, type: 1}
  ]
  
  const buttonMessage = {
      contentText: "How are you 🥰",
      footerText: 'Hello World',
      buttons: buttons,
      headerType: 1
  }


  Skueletor.addCommand({pattern: 'bot', fromMe: true, dontAddCommandList: true}, (async (message, match) => {

    await conn.sendMessage(id, buttonMessage, MessageType.buttonsMessage)

        }));
