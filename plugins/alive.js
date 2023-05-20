const { Module, 
       isPublic, 
       sendMenu,
       aliveMessage,
       sendList

}  = require("../lib");




Module(

  {

    pattern: "alive ?(.*)",

    fromMe: isPublic,

    desc: "Does bot work?",

    type: "info"

  },

  async (message, match) => {

    await aliveMessage(message, match);

  }

);



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
