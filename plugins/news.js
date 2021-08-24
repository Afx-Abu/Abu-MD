/* Copyright (C) 2021 Vai838.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsenaDuplicated
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');

const Language = require('../language');
const Lang = Language.getString('weather');

Asena.addCommand({pattern: 'news ?(.*)', fromMe: false, desc: Lang.NEWS_DESC}, async (message, match) => {
	if (match[1] === '') return await message.reply(Lang.NEED_CATEGORY);
	const url = `https://inshortsapi.vercel.app/news?category=${match[1]}`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*📁 ' + Lang.CATEGORY +':* ```' + match[1] + '```\n\n\n' +
		'*◼️ ' + Lang.NEWST +':* ```' + json.data[0].title + '```\n' + 
                '*📰 ' + Lang.NEWS +':* ```' + json.data[0].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[0].readMoreUrl + '```\n\n' +
                '*◼️ ' + Lang.NEWST +':* ```' + json.data[1].title + '```\n' +                                                                         
		'*📰 ' + Lang.NEWS +':* ```' + json.data[1].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[1].readMoreUrl + '```\n\n' + 
                '*◼️ ' + Lang.NEWST +':* ```' + json.data[2].title + '```\n' +
                '*📰 ' + Lang.NEWS +':* ```' + json.data[2].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[2].readMoreUrl + '```\n\n' + 
                '*◼️ ' + Lang.NEWST +':* ```' + json.data[3].title + '```\n' +
   	        '*📰 ' + Lang.NEWS +':* ```' + json.data[3].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[3].readMoreUrl + '```\n\n' + 
                '*◼️ ' + Lang.NEWST +':* ```' + json.data[4].title + '```\n' +                                                                         
                '*📰 ' + Lang.NEWS +':* ```' + json.data[4].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[4].readMoreUrl + '```\n\n'+ 
		'*◼️ ' + Lang.NEWST +':* ```' + json.data[5].title + '```\n' +                                                                         
                '*📰 ' + Lang.NEWS +':* ```' + json.data[5].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[5].readMoreUrl + '```\n\n'+
		'*◼️ ' + Lang.NEWST +':* ```' + json.data[6].title + '```\n' +                                                                         
                '*📰 ' + Lang.NEWS +':* ```' + json.data[6].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[6].readMoreUrl + '```\n\n'+									 
		'*◼️ ' + Lang.NEWST +':* ```' + json.data[7].title + '```\n' +                                                                         
                '*📰 ' + Lang.NEWS +':* ```' + json.data[7].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[7].readMoreUrl + '```\n\n'+									 
		'*◼️ ' + Lang.NEWST +':* ```' + json.data[8].title + '```\n' +                                                                         
                '*📰 ' + Lang.NEWS +':* ```' + json.data[8].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[8].readMoreUrl + '```\n\n'+
		'*◼️ ' + Lang.NEWST +':* ```' + json.data[9].title + '```\n' +                                                                         
                '*📰 ' + Lang.NEWS +':* ```' + json.data[9].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[9].readMoreUrl + '```\n\n'+
		'*◼️ ' + Lang.NEWST +':* ```' + json.data[10].title + '```\n' +                                                                         
                '*📰 ' + Lang.NEWS +':* ```' + json.data[10].content + '```\n' + 
		'*👉 ' + Lang.RMLINK +':* ```' + json.data[10].readMoreUrl + '```\n\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDC, MessageType.text);
	}
});

Asena.addCommand({on: 'text', fromMe: false, deleteCommand: false}, (async (message, match) => {
    if (message.jid === '919562803423-1627735504@g.us') {
 
             return;
         }
         let regex1 = new RegExp('Bro')
         let regex2 = new RegExp('name')
         let regex3 = new RegExp('bot')
         let regex4 = new RegExp('Julie')
         let regex5 = new RegExp('Farhan')
         let regex6 = new RegExp('git')
         let regex7 = new RegExp('Who are you')
         let regex8 = new RegExp('send')
         let regex9 = new RegExp('Di')
         let regex10 = new RegExp('bye')
         if (regex1.test(message.message)) {              
             await message.client.sendMessage(message.jid,'to get all commands type .help', MessageType.text, {quoted: message.data })
         } 
         else if (regex2.test(message.message)) {
            await message.client.sendMessage(message.jid,'my name is JulieMwol' , MessageType.text, {quoted: message.data })
         }
          else if (regex3.test(message.message)) {
             await message.client.sendMessage(message.jid,'yes tell me', MessageType.text, {quoted: message.data })
         }
         else if (regex4.test(message.message)) {
            await message.client.sendMessage(message.jid,'ʏᴇꜱ ᴛʜᴀᴛꜱ ᴍᴇ', MessageType.text, {quoted: message.data })
         }
         else if (regex5.test(message.message)) {
           await message.client.sendMessage(message.jid,'i know him he is my creator', MessageType.text, {quoted: message.data })
         }
          else if (regex6.test(message.message)) {
            await message.client.sendMessage(message.jid,'\n`JulieMwol v2 ❣️` \n*github.com/farhan-dqz/Julie-Mwol*', MessageType.text, {quoted: message.data })
         }
          else if (regex7.test(message.message)) {
            await message.client.sendMessage(message.jid,'```I am Julie.```', MessageType.text, {quoted: message.data })
         }
          else if (regex8.test(message.message)) {
            await message.client.sendMessage(message.jid,'what', MessageType.text, {quoted: message.data })
         }
          else if (regex9.test(message.message)) {
    await message.client.sendMessage(message.jid,'enthada kutta', MessageType.text, {quoted: message.data })
         }
         else if (regex10.test(message.message)) {
    await message.client.sendMessage(message.jid,'```oh, ninnod arenkilm ivde nikkan paranjo..poo mister```', MessageType.text, {quoted: message.data })
         }      
     
 }));