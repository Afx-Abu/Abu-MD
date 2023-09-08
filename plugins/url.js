const {
       Module,
       isPublic,
       sendUrl
} = require("../lib/");

Module(
        {
         
        pattern: "url?(.*)",
        fromMe: isPublic,
        desc: "its convert your image/mp3/video/sticker to url",
        type: "converter",
},
		async (message, match) => {			
		await sendUrl(message, match);

})
