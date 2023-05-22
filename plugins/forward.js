const { Module } = require("../lib/");

Module(

  {

    pattern: "forward ?(.*)",

    fromMe: true,

    desc: "forward any messages",

    type: "misc",

  },

  async (message, match, m) => {

    if(!m.quoted) return message.reply('Reply to something') 

    let jid = (match);

     {

     let msg =  await message.client.relayMessage(jid, m.quoted.message, {

        messageId: m.quoted.key.id,

      });

      console.log(msg)

    }   

  }

);



Module(

  {

    pattern: "send ?(.*)",

    fromMe: true,

    desc: "forward your message",

    type: "misc",

  },

  async (message, match, m) => {

    if(!m.quoted) return message.reply('Reply to something') 

    let jid = (match);

     {

     let msg =  await message.client.relayMessage(jid, m.quoted.message, {

        messageId: m.quoted.key.id,

      });

      console.log(msg)

    }   

  }

);
