const Ktb = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');

// ENCRYPTION PLUGIN FOR FUN, IF U NEED COPY PASTE THIS 
// NO NEED CREDIT
const b64 = "Text encryption using base64."
const usage = ".b64en <text>"

const encypt = "```Enter the text which you need to encrypt!```"

Ktb.addCommand({ pattern: 'encrpt ?(.*)', fromMe: false, desc: b64, usage: usage }, async (message, match) => {

        const Wtb = match[1]
        
        if (match[1] === '') return await message.client.sendMessage(message.jid, encypt, MessageType.text);

        await axios
          .get(`https://xteam.xyz/encrypt/b64enc?APIKEY=ab9942f95c09ca89&text=${Wtb}`)
          .then(async (response) => {
            const {
              status,
              result,
            } = response.data

            const msg = `*CONNECTION STATUS ✔:* ${status}\n\n\n *ENCRYPTED TEXT:* ${result}`
            await message.client.sendMessage(message.jid, msg, MessageType.text)
           })
      },
    )
