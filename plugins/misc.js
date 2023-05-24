const { Module, styletext, listall, tiny, isPublic } = require("../lib/");
const { FancyRandom } = require('abu-bot');
Module(
  {
    pattern: "ping",
    fromMe: isPublic,
    desc: "Response speed.",
    type: "misc",
  },
  async (message, match) => {
    const start = new Date().getTime();
    const botz = await FancyRandom("Testing Bot Speed")
    await message.reply(botz);
    const end = new Date().getTime();    
const Jsl1 = await FancyRandom("︎︎⟪ Response in " + (end - start) + " ms︎ec ⟫")
    return await message.reply(Jsl1);
  }
);

Module({
  pattern: 'runtime',
  fromMe: isPublic,
  type: 'misc',
  desc: 'Shows Bot Running time'
}, (async (message, match) => {
  var ut_sec = require("os").uptime(); 
  var ut_min = ut_sec/60; 
  var ut_hour = ut_min/60; 
  ut_sec = Math.floor(ut_sec); 
  ut_min = Math.floor(ut_min); 
  ut_hour = Math.floor(ut_hour); 
  ut_hour = ut_hour%60; 
  ut_min = ut_min%60; 
  ut_sec = ut_sec%60; 
  var sec_num = parseInt(process.uptime(), 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  var uptime_process = (`Runtime: ${ut_hour} Hour  ${ut_min} minute ${ut_sec} second`)  
  var Jl1 = await FancyRandom(uptime_process)
    return await message.reply(Jl1);
}));


Module(
  {
    pattern: "readmore ?(.*)",
    fromMe: isPublic,
    desc: "Readmore generator",
    type: "whatsapp",
  },
  async (message, match) => {
    await message.reply(match.replace(/\+/g, (String.fromCharCode(8206)).repeat(4001)))
  }
);

Module(
  {
    pattern: "wame ?(.*)",
    fromMe: isPublic,
    desc: "wame generator",
    type: "whatsapp",
  },
  async (message, match) => {
    let jsl = 'https://wa.me/' + (message.reply_message.jid || message.mention[0] || match).split('@')[0];
    await message.reply(jsl)
  }
);


 Module({pattern: 'getjids ?(.*)', desc: 'Get all groups\' jids',type: 'info',fromMe: true}, async (msg, query) => {

    var groups = Object.keys(await msg.client.groupFetchAllParticipating())

    if (!groups.length) return await msg.reply("_No group chats!_");

    var _msg = "";

    for (let e of groups){

        try {

    var g_name = (await msg.client.groupMetadata(e)).subject

    } catch {var g_name = 'Can\'t load name (rate-overlimit)'}

    _msg+= `_Group:_ ${g_name} \n_JID:_ ${e}\n\n`

    }

    await msg.reply(_msg)

});
