 const { Module, getJson, isPublic} = require("../lib/");

const moment = require('moment-timezone')

let gis = require("g-i-s");

const axios = require('axios')

const fetch = require('node-fetch')

Module({

	pattern: 'npm ?(.*)',	fromMe: isPublic,

	desc: 'data of any flim or Series',

	type: 'whatsapp',

}, async (message, match) => {

match = match || message.reply_message.text;

 if (!match) return await message.reply("*_Give me location.india!_*");

axios.get(`https://api.npms.io/v2/search?q=${match}`).then(({ data }) => {

                 let txt = data.results.map(({ package: pkg }) => `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`).join('\n\n')

                 message.reply(txt)

             }).catch(e => console.log(e))

         }

     )


Module(

	{		pattern: 'lyrics',

		fromMe: isPublic,

		desc: 'search lyrics',

		type: 'search',

	},

	async (message, client, match) => {

		if (!match)

			return await message.reply('*Example : lyrics bhla bhla*')

		const { status ,result } = await getJson(

			`https://levanter.up.railway.app/lyrics?name=${match}`

		)

		if (!status) return await message.reply('_Not found_')

		return await message.reply('```' + result + '```')

	}

)
