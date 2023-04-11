const { Module, isPublic} = require("../lib/");
Module(
  {
    pattern: "ping",
    fromMe: isPublic,
    desc: "To check ping",
    type: "user",
  },
  async (message, match) => {
    const start = new Date().getTime();
    await message.sendMessage("```Ping!```");
    const end = new Date().getTime();
    return await message.sendMessage(
      "*Pong!*\n ```" + (end - start) + "``` *ms*"
    );
  }
);
