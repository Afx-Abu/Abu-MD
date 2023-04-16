const {
  Module,
  isPublic,
  getSong,
  getVideo,
  getYts
} = require("../lib/");


Module
	(
		{
            pattern: "play?(.*)",
	    fromMe: isPublic,
	    desc: "downloading your YouTube song",
            type: "downloader",
            },
		async (message, match) => {
                if(!match) return await message.reply("_enter song url/name_")			
		return await getSong(message, match);

})

