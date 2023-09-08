const {
  Module,
  setFilter,
  getFilter,
  deleteFilter,
} = require("../lib/");

Module(
  {
    pattern: "filter ?(.*)",
    fromMe: true,
    desc: "add filters in chat",
    type: "group",
  },
  async (message, match) => {
    match = match.match(/[\'\"](.*?)[\'\"]/gms)
    if (!match) {
      const filters = await getFilter(message.jid)
      if (!filters) return await message.reply(`_Not set any filter_\n*Example filter 'hi' 'hello'*`)
      let msg = ''
      filters.map(({ pattern }) => { msg += `=> ${pattern} \n` })
      return await message.send(msg.trim())
    } else {
      if (match.length < 2) {
      return await message.send(`Example filter 'hi' 'hello'`)
    }
    await setFilter(message.jid, match[0].replace(/['"]+/g, ''), match[1].replace(/['"]+/g, ''), match[0][0] === "'" ? true : false)
    await message.send(`_${match[0].replace(/['"]+/g, '')}_ added to filters.`)
    }
  }
);

Module(
  {
    pattern: "stop ?(.*)",
    fromMe: true,
    desc: "delete filters in chat",
    type: "group",
  },
  async (message, match) => {
    if (!match) return await message.send(`*Example : .stop hi*`)
    const isDel = await deleteFilter(message.jid, match)
    if (!isDel) return await message.reply(`_${match} not found in filters_`)
    return await message.repy(`_${match} deleted._`)
  }
);

Module(
  {
    on: "text",
    fromMe: false,
  },
  async (message, match) => {
    const filters = await getFilter(message.jid)
    if (filters) 
      filters.map(async ({ pattern, regex, text }) => {
      pattern = new RegExp(regex ? pattern : `\\b(${pattern})\\b`, 'gm')
    if (pattern.test(message.text)) {
      await message.reply(text, { quoted: message })
      }
     }
   )
  }
);
