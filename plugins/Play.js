const Asena = require('../events');
const { MessageType } = require('@adiwajshing/baileys');
const got = require('got');
const Config = require('../config');
const LOAD_ING = "*RESULT FOUND UPLOADING...* \n\n *🛑SONG IS UNDER MAINTAINCE🛑*"
const axios = require('axios')


Asena.addCommand({pattern: 'play ?(.*)', fromMe: false, desc: 'play song' , dontAddCommandList: true }, async (message, match) => {
	
	await message.client.sendMessage(message.jid, '*SEARCHING YOU DATA*' , MessageType.text, { quoted: message.data });
	
	const {data} = await axios(`https://zenzapi.xyz/api/play/playmp3?query=${match[1]}&apikey=whitedevil-terrorboy`)
	
        const { status, result } = data
	
        if(!status) return await message.sendMessage('*NO RESULT FOUND*')
	
        await message.client.sendMessage(message.jid, LOAD_ING , MessageType.text, { quoted: message.data });
        let msg = '```'
        msg +=  `TITLE :${result.title}\n\n`
        msg +=  `THUMBNAIL :${result.thumb}\n\n`
        msg +=  `CHANNEL :${result.channel}\n\n`
        msg +=  `DATE OF PUBLISHED :${result.published}\n\n`
        msg +=  `TOTAL VIEWS :${result.views}\n\n`
        msg += '```'
         return await message.client.sendMessage(message.jid, msg, MessageType.text, { quoted: message.data });
	
        });
