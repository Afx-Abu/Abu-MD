const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const MyPnky = require('../events');
const Config = require('../config');
const { igDownloader, igstalk } = require('../scraper.js')
const { errorMessage, infoMessage } = require('../helpers');
const axios = require('axios');
const fs = require('fs');
const gis = require('g-i-s');
const got = require("got");

let wk = Config.WORKTYPE == 'public' ? false : true


MyPnky.addCommand({pattern: 'insta ?(.*)', fromMe: wk, desc: "download from Instagram"}, async (message, match) => {
  try{
    if (!match[1]) return await message.sendMessage("enter a link");
    await message.sendMessage("ꜱᴇᴀʀᴄʜɪɴɢ...")

    res = await igDownloader(match[1])
    ytm = res.result
    const profileBuffer = await axios.get(`${ytm.link}`, {responseType: 'arraybuffer'})
    const msg = `${ytm.link}`
     if (msg.includes('.mp4')) { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, { caption: `video`, quoted: message.data })}
     if (msg.includes('.jpg')) { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, { caption: `image`, quoted: message.data })}
  } catch {
     await message.sendMessage("error")
  }
});
