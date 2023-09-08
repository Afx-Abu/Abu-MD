const {
       Module,
       isPublic,
       getInsta,
       sendInsta,
       getStory,
       sendGpt
} = require("../lib/");


Module(
        {
         
        pattern: "insta?(.*)",
        fromMe: isPublic,
        desc: "insta video photo downloader",
        type: "downloader",
},
		async (message, match) => {			
        match = match || message.reply_message.text;
        if (!match) return await message.reply("*_Need instagram link!_*");
		return await getInsta(message, match);

})



Module(
        {
         
        pattern: "https?(.*)",
        fromMe: isPublic,
},
		async (message, match) => {			
        match = match || message.reply_message.text;
        if (!match) return await message.reply("*_Need instagram link!_*");
		return await sendInsta(message, match);

})


Module(
  {
    pattern: "story ?(.*)",
    fromMe: isPublic,
    desc: "downloads story from instagram",
    type: "downloader",
  },
  async (message, match) => {
  match = match || message.reply_message.text;
    if (!match) return await message.reply("_Need an instagram username or link!_");
     return await getStory(message, match);
})



Module({
	pattern: 'gpt ?(.*)',
	fromMe: isPublic,
	desc: 'chat gpt',
	type: 'ai',
}, async (message, match) => {
match = match || message.reply_message.text;
 if (!match) return await message.reply("*_Enter Gpt Wods_*");
return await sendGpt(message, match);
})



Module({
    pattern: 'whois',
    fromMe: isPublic,
    desc: 'it send information of user',
    type: "utility",
}, async (message, match) => {
    try {
        let pp, from, cap;
        if (message.isGroup) {
            from = message.jid;
            try {
                pp = await message.client.profilePictureUrl(from, 'image')
            } catch {
                pp = 'https://i.ibb.co/gdp7HrS/8390ad4fefbd.jpg'
            }
            //let { id, name } = message.conn.user;
            let {
                status,
                setAt
            } = await message.client.fetchStatus(from)
            let captiOn = "```" /*user : ${name}\nid : ${id}\n*/ + `status :${status}\nstatus setAt : ${setAt}` + "```";
            await message.client.sendMessage(message.jid, {
                image: {
                    url: pp
                },
                caption: captiOn
            }, {
                quoted: message
            });
        } else {
            from = message.jid;
            try {
                pp = await message.client.profilePictureUrl(from, 'image')
            } catch {
                pp = 'https://i.ibb.co/gdp7HrS/8390ad4fefbd.jpg'
            }
            //let { id, name } = message.conn.user;
            let {
                status,
                setAt
            } = await message.client.fetchStatus(from)
            let captiOn = "```" /*user : ${name}\nid : ${id}\n*/ + `status :${status}\nstatus setAt : ${setAt}` + "```";
            await message.client.sendMessage(message.jid, {
                image: {
                    url: pp
                },
                caption: captiOn
            }, {
                quoted: message
            });
        }
    } catch (e) {
        message.reply('_*Failed*_');
    }
});



