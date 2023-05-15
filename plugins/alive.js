const { Module, aliveMessage, isPublic }  = require("../lib");

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
