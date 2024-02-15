const {
    Module,
    isPublic,
    TTS,
    lang,
    TRT
} = require('../lib');

Module({
    pattern: 'tts',
    fromMe: isPublic,
    desc: lang.TTS_DESC,
    type: "converter"
}, async (message, match) => {
        match = match || message.reply_message.text;
        if (!match) return await message.reply(lang.BASE.TEXT);
        let slang = match.match('\\{([a-z]+)\\}');
        let lang = "en";
        if (slang) {
            lang = slang[1];
            match = match.replace(slang[0], '');
        }
        return await message.send(await TTS(match,lang),{
            mimetype: 'audio/ogg; codecs=opus',
            ptt: false,
            quoted: message
        },'audio');
});


Module(
	{
		pattern: 'trt ?(.*)',
		fromMe: isPublic,
		desc: lang.TRT.DESC,
		type: 'search',
	},
	async (message, match) => {
		if (!message.reply_message.text)
			return await message.reply(
				lang.TRT.NEED
			)
                if(!match) return await message.reply(lang.TRT.NEED_LANG);
                const {text} = await TRT(message.reply_message.text, match)
		return await message.reply(text);
	}
)
