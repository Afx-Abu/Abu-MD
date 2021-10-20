const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");
const cn = require('../config');
const Config = require('../config');
const SPDF_DESC = "Converts a Site into PDF"
const SPDF_PROC = "```Convirtiendo el sitio en PDF...```"
const SPDF_LINK = "*Por favor, ingresa un enlace para convertirlo en PDF.*"

if (cn.WORKTYPE == 'private') {
  
  Asena.addCommand({pattern: 'spdf ?(.*)', fromMe: true, desc: SPDF_DESC }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(SPDF_LINK);

    var webimage = await axios.get(`https://api.html2pdf.app/v1/generate?url=${match[1]}&apiKey=uKluwn2F9s3dJ9TH5HU8G9F0VkaltFpLyx6m1WAsGoyO56knH1LbmouKMwuEpm9O`, { responseType: 'arraybuffer' })

    await message.sendMessage(SPDF_PROC);

    await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: Mimetype.pdf, filename: 'Skueletor.pdf'})

})); 
}

else if (cn.WORKTYPE == 'public') {

  Asena.addCommand({pattern: 'spdf ?(.*)', fromMe: false, desc: SPDF_DESC }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(SPDF_LINK);

    var webimage = await axios.get(`https://api.html2pdf.app/v1/generate?url=${match[1]}&apiKey=uKluwn2F9s3dJ9TH5HU8G9F0VkaltFpLyx6m1WAsGoyO56knH1LbmouKMwuEpm9O`, { responseType: 'arraybuffer' })

    await message.sendMessage(SPDF_PROC);

    await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: Mimetype.pdf, filename: 'Skueletor.pdf'})

})); 
}
