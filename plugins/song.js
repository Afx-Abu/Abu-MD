const {
  Module,
  isPublic,
  getSong,
  getVideo
} = require("../lib/");

Module
	(
		{
            pattern: "song?(.*)",
	    fromMe: isPublic,
	    desc: "downloading your YouTube song",
            type: "downloader",
            },
		async (message, match) => {
                if(!match) return await message.reply("_enter song url/name_")			
		return await getSong(message, match);

})

Module
	(
		{
            pattern: "video?(.*)",
	    fromMe: isPublic,
	    desc: "downloading your YouTube videos",
            type: "downloader",
            },
		async (message, match) => {
                if(!match) return await message.reply("_enter song url/name_")			
		return await getVideo(message, match);

})

