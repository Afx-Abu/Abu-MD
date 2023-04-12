const {
  Module,
  isPublic,
  sendMenu,
  sendList
} = require("../lib/");

Module
	(
		{
            pattern: "menu?(.*)",
	    fromMe: isPublic,
	    desc: "show your menu items",
            type: "info",
            },
		async (message, match) => {			
		return await sendMenu(message);

})


Module
	(
		{
            pattern: "list?(.*)",
	    fromMe: isPublic,
	    desc: "show your menu items",
            type: "info",
            },
		async (message, match) => {			
		return await sendList(message);

})
