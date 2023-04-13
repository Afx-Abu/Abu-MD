const {
  Module,
  isPublic,
  getSong
} = require("../lib/");

Module
	(
		{
            pattern: "song?(.*)",
	    fromMe: isPublic,
	    desc: "show your menu items",
            type: "downloader",
            },
		async (message, match) => {
                if(!match) return await message.reply("_enter song url/name_")			
		return await getSong(message);

})

