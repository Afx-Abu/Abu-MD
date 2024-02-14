const {
    Module,
    commands,
    send_alive,
    send_menu,
    tiny,
    lang,
    personalDB,
    isPublic
} = require('../lib')

Module({
	pattern: 'list',
	desc: lang.LIST.DESC,
	type: 'info',
	fromMe: isPublic
}, async (message) => {
	let count = 1,
		list = "";
	commands.map((cmd => {
		if (cmd.pattern && cmd.desc) {
			list += `${count++} : *${cmd.pattern.replace(/[^a-zA-Z0-9,-]/g,"")}*\n_${cmd.desc}_\n\n`;
		} else {
			list += `${count++} *${cmd.pattern?cmd.pattern.replace(/[^a-zA-Z0-9,-]/g,""):''}*\n`
		}
	}));
	var jsl = await tiny(list)
	return await message.reply(jsl);
});

Module({
    pattern: "menu",
    desc: lang.MENU.DESC,
    type: 'whatsapp',
    fromMe: isPublic
}, async (message, match) => {
    return await send_menu(message, 'non button');
});

Module({
    pattern: "alive",
    desc: lang.ALIVE.DESC,
    type: 'info',
    usage:lang.ALIVE.HELP,
    fromMe: isPublic
}, async (message, match) => {
    if(match == "get" && message.isCreator){
	    const {alive} = await personalDB(['alive'], {content:{}},'get');
	    return await message.send(alive);
    } else if(match && message.isCreator){
	    await personalDB(['alive'], {content: match},'set');
	    return await message.reply('_Alive Message Updated_');
    }
    const {alive} = await personalDB(['alive'], {content:{}},'get');
    return await send_alive(message, alive);
});
