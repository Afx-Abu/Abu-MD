/* 
      S
        k
          u
            e
              l
                e
                  t
                    o
                      r
*/

const Skueletor = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const { errorMessage, infoMessage } = require('../helpers');
const Config = require('../config');
const Language = require('../language');
const YTV_DESC = "Youtube Video ."
const YT_NEED = "Necesito que ingreses algún enlace de mediafire para descargar."
const DWLOAD_VID = "*Descargando... 😜*"
const YTV_UP = "*Subiendo... 😜*"
const NO_RESULT = "*no puedo encontrar nada :(...*"


if (Config.WORKTYPE == 'private') {

    Skueletor.addCommand({ pattern: 'mediafire ?(.*)', fromMe: true }, async (message, match) => {

        const link = match[1]
    
        if (!link) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text)
        await message.client.sendMessage(message.jid,DWLOAD_VID,MessageType.text);
        await axios
          .get(`https://api.zeks.xyz/api/mediafire?apikey=ZKgeixXNpKPOs2Xt7HgUIiBaJ6w&url=${link}`)
          .then(async (response) => {
            const {
              download,
            } = response.data
    
            const videoBuffer = await axios.get(download, {responseType: 'arraybuffer'})
    
            await message.client.sendMessage(message.jid,YTV_UP,MessageType.text);
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.document, {mimetype: MimeType, ptt: false})
        })
        .catch(
          async (err) => await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data}),
        )
      },
    )
}

else if (Config.WORKTYPE == 'public') {
    Skueletor.addCommand({ pattern: 'mediafire ?(.*)', fromMe: false }, async (message, match) => {

        const link = match[1]
    
        if (!link) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text, {quoted: message.data})
         await message.client.sendMessage(message.jid,DWLOAD_VID,MessageType.text)
        await axios
          .get(`https://api.zeks.xyz/api/mediafire?apikey=ZKgeixXNpKPOs2Xt7HgUIiBaJ6w&url=${link}`)
          .then(async (response) => {
            const {
              download,
            } = response.data
    
            const videoBuffer = await axios.get(download, {responseType: 'arraybuffer'})
    
            await message.client.sendMessage(message.jid,YTV_UP,MessageType.text, {quoted: message.data});
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.document, {mimetype: Mimetype, ptt: false})
        })
        .catch(
          async (err) => await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data}),
        )
      },
    )
}
