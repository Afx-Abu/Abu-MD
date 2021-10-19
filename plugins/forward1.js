Asena.addCommand({ pattern: "f ?(.*)", fromMe: true, desc: 'Forwards replied audio' },
  async (message, match) => {
    if (match == "") return await message.sendMessage('Give any JID');
    if (!message.reply_message) return await message.sendMessage('```Forwarding audio...```');
    match.match(parseJid).map((jid) => {forwardOrBroadCast(match[1], message);
    });
  }
);
