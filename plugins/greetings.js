const {
    setMessage,
    getMessage,
    delMessage,
    getStatus,
    toggleStatus,
    Module,
    tiny
} = require("../lib/");

Module(

  {

    pattern: "welcome ?(.*)",

    fromMe: true,

    desc: "send your group welcome message",

    type: "group",

  },

  async (message, match) => {

    if (!message.isGroup) return;

    let status = await getStatus(message.jid, "welcome");

    let toggler = status ? "off" : "on";

    let stat = status ? "on" : "off";

    if (!match) {

      return await message.reply(`_Welcome Message\nstatus ${stat}_`);

    }

    if (match === "get") {

      let msg = await getMessage(message.jid, "welcome");

      if (!msg) return await message.reply("_There is no welcome set_");

      return message.reply(msg.message);

    }

    if (match === "on") {

      let msg = await getMessage(message.jid, "welcome");

      if (!msg)

        return await message.reply("_There is no welcome message to enable_");

      if (status) return await message.reply("_Welcome already enabled._");

      await toggleStatus(message.jid);

      return await message.reply("_Welcome enabled..✅_");

    }

    if (match === "off") {

      if (!status) return await message.reply("_Welcome already disabled_");

      await toggleStatus(message.jid, "welcome");

      return await message.reply("_Welcome disabled..✅_");

    }

    if (match == "delete") {

      await delMessage(message.jid, "welcome");

      return await message.reply("_Welcome deleted succesfully..✅_");

    }

    await setMessage(message.jid, "welcome", match);

    return await message.reply("_Welcome set succesfully..✅_");

  }

);

Module(

  {

    pattern: "goodbye ?(.*)",

    fromMe: true,

    desc: "send you group goodbye message",

    type: "group",

  },

  async (message, match) => {

    if (!message.isGroup) return;

    let status = await getStatus(message.jid, "goodbye");

    let toggler = status ? "off" : "on";

    let stat = status ? "on" : "off";

    if (!match) {


return await message.reply(`_Goobye Message\nstatus ${stat}_`);

    }

    if (match === "get") {

      let msg = await getMessage(message.jid, "goodbye");

      if (!msg) return await message.reply("_There is no goodbye set_");

      return message.reply(msg.message);

    }

    if (match === "on") {

      await toggleStatus(message.jid, "goodbye");

      return await message.reply("_Goodbye enabled..✅_");

    }

    if (match === "off") {

      await toggleStatus(message.jid);

      return await message.reply("_Goodbye disabled_");

    }

    if (match == "delete") {

      await delMessage(message.jid, "goodbye");

      return await message.reply("_Goodbye deleted succesfully_");

    }

    await setMessage(message.jid, "goodbye", match);

    return await message.reply("_Goodbye set succesfully..✅_");

  }

);

