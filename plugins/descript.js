const Ktb = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');

// DECRYPTION PLUGIN FOR FUN, IF U NEED COPY PASTE THIS 
// NO NEED CREDIT
const b64 = "decrypt the encrypted text using base64"
const usage = ".b64de <text>"

const encypt = "```Enter the encrypted text which you need to decrypt!```"

Ktb.addCommand({ pattern: 'dcrpt ?(.*)', fromMe: false, desc: b64, usage: usage }, async (message, match) => {

        const Wtb = match[1]
        
        if (match[1] === '') return await message.client.sendMessage(message.jid, encypt, MessageType.text);

        await axios
          .get(`https://xteam.xyz/encrypt/b64dec?APIKEY=ab9942f95c09ca89&text=${Wtb}`)
          .then(async (response) => {
            const {
              status,
              result,
            } = response.data

            const msg = `*CONNECTION STATUS ✔:* ${status}\n\n\n *DECRYPTED TEXT:* ${result}`
            await message.client.sendMessage(message.jid, msg, MessageType.text)
           })
      },
    )
