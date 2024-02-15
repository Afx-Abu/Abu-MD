const {
    Module,
    groupDB,
    config
} = require('../lib')

Module({
    pattern: 'welcome ?(.*)',
    desc: 'set welcome message',
    type: 'greetings',
    fromMe: true,
    onlyGroup: true
}, async (message, match) => {
	const {welcome} = await groupDB(['welcome'], {jid: message.jid, content: {}}, 'get');
    if(match.toLowerCase() == 'get'){
        const status = welcome && welcome.status ? welcome. status : 'false';
        if(status == 'false') return await message.reply(`_*Example:* welcome get_\n_welcome hy &mention_`);
        if(!welcome.message) return await message.reply('_*Not Found*_');
        return await message.send(welcome.message);
    } else if(match.toLowerCase() == 'off'){
        const status = welcome && welcome.status ? welcome. status : 'false';
        if(status == 'false') return await message.reply(`_Welcome message already deactivated_`);
        await groupDB(['welcome'], {jid: message.jid, content: {status: 'false',message: welcome.message }}, 'set');
        return await message.reply('_Welcome message disabled_');
    } else if(match.toLowerCase() == 'on'){
        const status = welcome && welcome.status ? welcome. status : 'false';
        if(status == 'true') return await message.reply(`_Welcome message already activated_`);
        await groupDB(['welcome'], {jid: message.jid, content: {status: 'true',message: welcome.message }}, 'set');
        return await message.reply('_*Welcome message Enabled*_');
    } else if(match){
        const status = welcome && welcome.status ? welcome. status : 'false';
        await groupDB(['welcome'], {jid: message.jid, content: {status, message: match}}, 'set');
        return await message.reply('_*Welcome set succesfully*_');
    }
    return await message.reply('_*welcome get*_\n_*Welcome* Hy Bro &mention_\n*_welcome false_*');
});

Module({
    pattern: 'goodbye ?(.*)',
    desc: 'set goodbye message',
    type: 'greetings',
    fromMe: true,
    onlyGroup: true
}, async (message, match) => {
	const {exit} = await groupDB(['exit'], {jid: message.jid, content: {}}, 'get');
    if(match.toLowerCase() == 'get'){
        const status = exit && exit.status ? exit.status : 'false';
        if(status == 'false') return await message.reply(`_*Example:* goodbye get_\n_goodbye hy &mention_`);
        if(!exit.message) return await message.reply('*Not Found*');
        return await message.send(goodbye.message);
    } else if(match.toLowerCase() == 'off'){
        const status = exit && exit.status ? exit.status : 'false';
        if(status == 'false') return await message.reply(`_Goodbye message already activated_`);
        await groupDB(['exit'], {jid: message.jid, content: {status: 'false',message: exit.message }}, 'set');
        return await message.reply('*_Goodbye message Disabled*');
    } else if(match.toLowerCase() == 'on'){
        const status = exit && exit.status ? exit.status : 'false';
        if(status == 'true') return await message.reply(`__Goodbye message already deactivated_`);
        await groupDB(['exit'], {jid: message.jid, content: {status: 'true',message: exit.message }}, 'set');
        return await message.reply('*_Goodbye message Enabled_*');
    } else if(match){
        const status = exit && exit.status ? exit.status : 'false';
        await groupDB(['exit'], {jid: message.jid, content: {status, message: match}}, 'set');
        return await message.reply('*_Goodbye set successfully_*');
    }
    return await message.reply('_*goodbye get*_\n_*goodbye* thank you for joining &mention_*');
});
  
