const {
  PluginDB,
  setPlugin,
  getPlugin,
  delPlugin,
} = require("../lib/db/plugins");
const Config = require('../config');
const {
  Module,
} = require("../lib/");
const fs = require("fs");
const got = require("got");
const axios = require("axios");
const { format } = require("util");
var handler = Config.HANDLERS !== '^'?Config.HANDLERS.split("")[0]:""

Module(
  {
    pattern: "plugin",
    fromMe: true,
    desc: "Installs External plugins",
    type: "owner",
  },
  async (message, match) => {
    match = match || message.reply_message.text
    if (!match && match !== "list") return await message.reply("_Example :_\nplugin url\nplugin list")
    if (match == "list") {
    const plugins = await getPlugin();
    if (!plugins) return await message.reply("_Plugins not installed_");
    let msg = "";
    plugins.map(({ name, url }) => { msg += `*${name}* : ${url}\n` })
    return await message.reply(msg);
    }
    let links = match.match(/\bhttps?:\/\/\S+/gi);
    if (!links) {
    const getplugin = await getPlugin(match);
    if (!getplugin) return await message.reply("_Plugins not installed_");
    let jsl = "";
    getplugin.map(({ url }) => { jsl += url })
    return await message.reply(jsl);
    }
    for (let link of links) {
    try {
      var url = new URL(link);
    } catch {
      return await message.reply("_Invalid url!_");
    }
    if (url.host === "gist.github.com") {
        url.host = "gist.githubusercontent.com";
        url = url.toString() + "/raw"
    } else {
        url = url.toString()
    }
    try {
      var response = await axios(url + "?timestamp=" + new Date());
    } catch {
      return await message.reply("_Invalid url!_")
    }
    let plugin_name = /pattern: ["'](.*)["'],/g.exec(response.data)
    var plugin_name_temp = response.data.match(/pattern: ["'](.*)["'],/g) ? response.data.match(/pattern: ["'](.*)["'],/g).map(e => e.replace("pattern", "").replace(/[^a-zA-Z]/g, "")) : "temp"
    try {
      plugin_name = plugin_name[1].split(" ")[0]
    } catch {
      return await message.reply("_Invalid plugin. No plugin name found!_")
    }
    fs.writeFileSync("./plugins/" + plugin_name + ".js", response.data);
    try {
      require("./" + plugin_name);
    } catch (e) {
      fs.unlinkSync("/root/Abu/plugins/" + plugin_name + ".js")
      return await message.reply("_Error in plugin!_\n" + format(e));
    }
    await setPlugin(url, plugin_name);
    await message.reply("_Newly installed plugin: " + plugin_name_temp.join(", ") + "_");
    }
  }
);

Module(
  {
    pattern: "remove",
    fromMe: true,
    desc: "Remove external plugins",
    type: "owner",
  },
  async (message, match) => {
    if (!match) return await message.reply("_Example :_\nremove emoji\n_remove all_")
    if (match == "all") { 
      await delPlugin()
      return await message.send("_All plugins deleted Successfully_");
    }
    const isDeleted = await delPlugin(match)
    if (!isDeleted) return await message.reply(`_Plugin ${match} not found_`);
    delete require.cache[require.resolve("./" + match + ".js")]
    fs.unlinkSync("./plugins/" + match + ".js");
    await message.reply(`*_Plugin ${match} deleted_*`);
    const buttons = [{buttonId: handler+'restart', buttonText: {displayText: 'Restart'}, type: 1}]
          
          const buttonMessage = {
              text: 'Plugin Manager',
              footer: `_Removed Plugin: ${match}_`,
              buttons: buttons,
              headerType: 1
          }
        await message.client.sendMessage(message.jid,buttonMessage, { quoted: message });
  }
);

