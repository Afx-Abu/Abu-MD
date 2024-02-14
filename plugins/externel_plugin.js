const {
    Module,
    runtime,
    personalDB,
    extractUrlsFromString,
    lang,
    config
} = require('../lib');

const {
    exec
} = require("child_process");
const axios = require("axios");
const fs = require("fs");

Module({
    pattern: 'restart ?(.*)',
    desc: lang.RESTART.DESC,
    react: "🥱",
    type: "system",
    fromMe: true
}, async (message, match) => {
    await message.reply(lang.RESTART.INFO)
    exec('pm2 restart all')
})
Module({
    pattern: 'plugin ?(.*)',
    desc: lang.EXTERNAL_PLUGIN.DESC,
    react: "🦥",
    type: "system",
    fromMe: true
}, async (message, match) => {
    match = match || message.reply_message.text;
    let text = "",
        name, urls;
    if (match && extractUrlsFromString(match)) {
        await message.reply(lang.BASE.WAIT)
        const urll = extractUrlsFromString(match);
        if (!urll[0]) return message.send(lang.BASE.NEED_URL)
        urll.map(async (url) => {
            let NewUrl = !url?.toString().includes('/raw') ? url.toString() : url.toString().split('/raw')[0];
            let plugin_name;
            let {
                data,
                status
            } = await axios(NewUrl + '/raw').catch((e) => {
                return message.reply(lang.BASE.INVALID_URL)
            })
            if (status == 200) {
                try {
                    plugin_name = data.match(/(?<=pattern:) ["'](.*?)["']/g).map(match => match.trim().split(" ")[0]).join(', ').replace(/'/g, '').replace(/"/g, '');
                    fs.writeFileSync(__dirname + "/" + plugin_name.split(',')[0] + ".js", data);
                    require("./" + plugin_name.split(',')[0]);
                } catch (e) {
                    fs.unlinkSync(__dirname + "/" + plugin_name.split(',')[0] + ".js");
                    return await message.reply(e);
                }
                await message.reply(lang.EXTERNAL_PLUGIN.INSTALLED.format(plugin_name));
                await personalDB(['plugins'], {
                    content: {
                        [plugin_name.split(',')[0]]: NewUrl
                    }
                }, 'add');
                fs.unlinkSync(__dirname + "/" + plugin_name.split(',')[0] + ".js");
            }
        });
    } else {
        const {
            plugins
        } = await personalDB(['plugins'], {
            content: {}
        }, 'get');
        if (!Object.keys(plugins)[0]) return await message.reply(lang.EXTERNAL_PLUGIN.NO_PLUGIN)
        let text = lang.EXTERNAL_PLUGIN.LIST
        for (const p in plugins) {
            text += `_*${p}*_\n_${plugins[p]}_\n\n`;
        };
        return await message.reply(text)
    }
})
Module({
    pattern: 'remove ?(.*)',
    desc: lang.EXTERNAL_PLUGIN.REMOVE_DESC,
    react: "😶",
    type: "system",
    fromMe: true
}, async (message, match) => {
    if (!match) return await message.send("*Give me a plugin name thet you want to remove*");
    const {
        plugins
    } = await personalDB(['plugins'], {
        content: {}
    }, 'get');
    if (!Object.keys(plugins)[0]) return await message.reply(lang.EXTERNAL_PLUGIN.NO_PLUGIN)
    let Available = false;
    for (const p in plugins) {
        if (p == match) {
            Available = true;
            await personalDB(['plugins'], {
                content: {
                    id: match
                }
            }, 'delete');
            await message.send(lang.EXTERNAL_PLUGIN.REMOVED);
            break;
        }
    }
    if (!Available) return await message.reply(lang.EXTERNAL_PLUGIN.NO_PLUGIN);
});
