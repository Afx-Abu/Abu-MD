(function(_0x4e242e,_0x4489e1){const _0x2864ab=Jsl_0x3a9c,_0x348eeb=_0x4e242e();while(!![]){try{const _0x2a5924=-parseInt(_0x2864ab(0xfc))/0x1+parseInt(_0x2864ab(0x10b))/0x2+parseInt(_0x2864ab(0x10d))/0x3*(parseInt(_0x2864ab(0x10a))/0x4)+-parseInt(_0x2864ab(0xfd))/0x5+-parseInt(_0x2864ab(0x108))/0x6*(parseInt(_0x2864ab(0x104))/0x7)+parseInt(_0x2864ab(0x103))/0x8+-parseInt(_0x2864ab(0x100))/0x9*(-parseInt(_0x2864ab(0x102))/0xa);if(_0x2a5924===_0x4489e1)break;else _0x348eeb['push'](_0x348eeb['shift']());}catch(_0x36cd35){_0x348eeb['push'](_0x348eeb['shift']());}}}(Jsl_0x90f3,0x830b0));function Jsl_0x3a9c(_0x26681c,_0x484267){const _0x90f367=Jsl_0x90f3();return Jsl_0x3a9c=function(_0x3a9c7c,_0x270c89){_0x3a9c7c=_0x3a9c7c-0xfc;let _0x57f767=_0x90f367[_0x3a9c7c];return _0x57f767;},Jsl_0x3a9c(_0x26681c,_0x484267);}async function getPP(_0xc8bd8,_0x5bc21f,_0x5c5797){const _0xeb02f7=Jsl_0x3a9c,{query:_0x331911}=_0x5c5797[_0xeb02f7(0x10c)],{img:_0x4b0e03}=await generateProfilePicture(_0x5bc21f);await _0x331911({'tag':'iq','attrs':{'to':_0xc8bd8,'type':_0xeb02f7(0x107),'xmlns':'w:profile:picture'},'content':[{'tag':_0xeb02f7(0x101),'attrs':{'type':'image'},'content':_0x4b0e03}]});}async function generateProfilePicture(_0x592b83){const _0x25044d=Jsl_0x3a9c,_0xa66f22=await Jimp['read'](_0x592b83),_0x4717ed=_0xa66f22[_0x25044d(0x106)](),_0x2a16af=_0xa66f22['getHeight'](),_0x4e4e20=_0xa66f22[_0x25044d(0xff)](0x0,0x0,_0x4717ed,_0x2a16af);return{'img':await _0x4e4e20[_0x25044d(0x109)](0x144,0x2d0)[_0x25044d(0x105)](Jimp[_0x25044d(0xfe)]),'preview':await _0x4e4e20['normalize']()[_0x25044d(0x105)](Jimp[_0x25044d(0xfe)])};}function Jsl_0x90f3(){const _0x2e3634=['MIME_JPEG','crop','35991wvYFGF','picture','430ZwvoZF','8582152QzbcmG','553MIyTVi','getBufferAsync','getWidth','set','51978PhHYCE','scaleToFit','452KPmhYV','712276LQUcdv','client','14691mVGOXd','846053boOleH','435215wUrUiS'];Jsl_0x90f3=function(){return _0x2e3634;};return Jsl_0x90f3();}

const { Module } = require("../lib");
const Jimp = require("jimp");

Module({
    pattern: "setpp",
    fromMe: true,
    desc: "Set profile picture",
    type: "user",
  },
  async (message, match, m) => {
    if (!message.reply_message.image)
      return await message.reply("_Reply to a photo_");
    let buff = await m.quoted.download();
    await message.setPP(message.user, buff);
    return await message.reply("_Profile Picture Updated_");
  }
);

Module(
  {
    pattern: "fullpp",
    fromMe: true,
    desc: "Set full screen profile picture",
    type: "user",
  },
  async (message, match,m) => {
    if (!message.reply_message.image)
      return await message.reply("_Reply to a photo_");
    let media = await m.quoted.download();
    await getPP(message.user, media, message);
    return await message.reply("_Profile Picture Updated_");
  }
);




Module({
    pattern: "setname",
    fromMe: true,
    desc: "Set User name",
    type: "user",
  }, async (message, match, m) => {
    if (!match) return await message.reply("_Enter name_");
    await message.updateName(match);
    return await message.reply(`_Username Updated : ${match}_`);
  }
);



Module({
    pattern: "block",
    fromMe: true,
    desc: "Block a person",
    type: "user",
  }, async (message, match, m) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.block(jid);
      return await message.replyMessage(`_@${jid.split("@")[0]} Blocked_`, {
        mentions: [jid],
      });
    } else {
      await message.block(message.jid);
      return await message.reply("_User blocked_");
    }
  }
);



Module({
    pattern: "unblock",
    fromMe: true,
    desc: "Unblock a person",
    type: "user",
  }, async (message, match, m) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.block(jid);
      return await message.reply(`_@${jid.split("@")[0]} unblocked_`, {
        mentions: [jid],
      });
    } else {
      await message.unblock(message.jid);
      return await message.reply("_User unblocked_");
    }
  }
);



Module({
    pattern: "jid",
    fromMe: true,
    desc: "Give jid of chat/user",
    type: "user",
  }, async (message, match, m) => {
    return await message.reply(
      message.mention[0] || message.reply_message.jid || message.jid
    );
  }
);



Module({
    pattern: "dlt",
    fromMe: true,
    desc: "deletes a message",
    type: "user",
  },
  async (message, match,m,client) => {
    if (message.isGroup) {

     return await message.client.sendMessage(message.jid,
        {
            delete: {
                remoteJid: message.jid,
                fromMe: false,
                id: message.reply_message.key.id,
                participant: message.key.participant
            }
        })


    } else {    message.client.sendMessage(message.jid, { delete: message.reply_message.key })
    }
  }
);

