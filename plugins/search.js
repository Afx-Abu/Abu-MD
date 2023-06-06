 const { Module, getJson, isPublic} = require("../lib/");

const moment = require('moment-timezone')

let gis = require("g-i-s");

const axios = require('axios')

const fetch = require('node-fetch')

Module({

	pattern: 'npm ?(.*)',	fromMe: isPublic,

	desc: 'Search Your Npm package',

	type: 'whatsapp',

}, async (message, match) => {

match = match || message.reply_message.text;

 if (!match) return await message.reply("*_Enter npm username!_*");

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



Module({

	pattern: 'imdb ?(.*)',

	fromMe: isPublic,

	desc: 'Searching Your Filims details',

	type: 'whatsapp',

}, async (message, match) => {

match = match || message.reply_message.text;

 if (!match) return await message.reply("*_Name a Series or movie_*");

let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${match}&plot=full`)

let imdbt = "";            

            imdbt += "_🎬Title      : " + fids.data.Title + "\n_";

            imdbt += "_📅Year       : " + fids.data.Year + "\n_";

            imdbt += "_⭐Rated      : " + fids.data.Rated + "\n_";

            imdbt += "_📆Released   : " + fids.data.Released + "\n_";

            imdbt += "_⏳Runtime    : " + fids.data.Runtime + "\n_";

            imdbt += "_🌀Genre      : " + fids.data.Genre + "\n_";

            imdbt += "_👨🏻‍💻Director   : " + fids.data.Director + "\n_";

            imdbt += "_✍Writer     : " + fids.data.Writer + "\n_";

            imdbt += "_👨Actors     : " + fids.data.Actors + "\n_";

            imdbt += "_📃Plot       : " + fids.data.Plot + "\n_";

            imdbt += "_🌐Language   : " + fids.data.Language + "\n_";

            imdbt += "_🌍Country    : " + fids.data.Country + "\n_";

            imdbt += "_🎖️Awards     : " + fids.data.Awards + "\n_";

            imdbt += "_📦BoxOffice  : " + fids.data.BoxOffice + "\n_";

            imdbt += "_🏙️Production : " + fids.data.Production + "\n_";

            imdbt += "_🌟imdbRating : " + fids.data.imdbRating + "\n_";

            imdbt += "_❎imdbVotes  : " + fids.data.imdbVotes + "";

await message.client.sendMessage(message.jid, {

                image: {

                    url: fids.data.Poster,

                },

                caption: imdbt,

            }, {

                quoted: message,

            });

        }

    )

Module({

	pattern: 'weather ?(.*)',	fromMe: isPublic,

	desc: 'data of any flim or Series',

	type: 'whatsapp',

}, async (message, match) => {

match = match || message.reply_message.text;

 if (!match) return await message.reply("*_Give me location.india!_*");

let wdata = await axios.get(

                `https://api.openweathermap.org/data/2.5/weather?q=${match}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`

            );

            let textw = "";

            textw += `*_Weather of  ${match}*\n\n_`;

            textw += `_*Weather:-* ${wdata.data.weather[0].main}\n_`;

            textw += `_*Description:-* ${wdata.data.weather[0].description}\n_`;

            textw += `_*Avg Temp:-* ${wdata.data.main.temp}\n_`;

            textw += `_*Feels Like:-* ${wdata.data.main.feels_like}\n_`;

            textw += `_*Pressure:-* ${wdata.data.main.pressure}\n_`;

            textw += `_*Humidity:-* ${wdata.data.main.humidity}\n_`;

            textw += `_*Humidity:-* ${wdata.data.wind.speed}\n_`;

            textw += `$*Latitude:-* ${wdata.data.coord.lat}\n_`;

            textw += `_*Longitude:-* ${wdata.data.coord.lon}\n_`;

            textw += `_*Country:-* ${wdata.data.sys.country}\n_`;

            await message.client.sendMessage(

                message.jid, {

                    text: textw,

                }, {

                    quoted: message,

                }

            );

        }

    )


Module({

	pattern: 'google ?(.*)',

	fromMe: isPublic,

	desc: 'Searching Frome Google',

	type: 'search',

}, async (message, match) => {

match = match || message.reply_message.text;

 if (!match) return await message.reply("*_Enter a Google searching query!_*");

let google = require('google-it')

            google({ 'query': match }).then(res => {

                let text = `_Google Search From : ${match}\n\n_`

                for (let g of res) {

                    text += `_*Title* : ${g.title}\n_`

                    text += `_*Description* : ${g.snippet}\n_`

                    text += `_*Link* : ${g.link}\n\n────────────────────────\n\n_`

                }

                message.reply(text)

            })

        }

    )
