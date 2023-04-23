const {
  Module,
  isPublic,
  sendUrl
} = require("../lib/");

Module
	(
		{
            pattern: "url?(.*)",
	    fromMe: isPublic,
	    desc: "url sender",
            type: "info",
            },
		async (message, match) => {			
		return await sendUrl(message, match);

})
