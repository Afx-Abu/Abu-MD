const { Module, isPublic } = require("../lib/");
const { isAdmin, parsedJid, isUrl } = require("../lib");
const { cron, saveSchedule } = require("../lib/scheduler");
let {
getString
} = require("../lib/lang");
let Lang = getString('group');

Module({
pattern: "add",
fromMe: true,
desc: Lang.ADD_DESC,
type: "group",

}, async (message, match, m) => {
   if (!message.isGroup)
   return await message.reply(Lang.IS_GROUP);
   match = match || message.reply_message.jid;
   if (!match) return await message.reply(Lang.ADD_USER);
   let isadmin = await isAdmin(message.jid, message.user, message.client);
   if (!isadmin) return await message.reply(Lang.NOT_ADMIN);
   let jid = parsedJid(match);
   await message.add(jid);
   return await message.reply(`@${jid[0].split("@")[0]} 𝙰𝙳𝙳𝙴𝙳`, {
   mentions: jid,
    });
  }
);



Module({
pattern: "kick",
fromMe: true,
desc: Lang.KICK_DESC,
type: "group",

}, async (message, match, m) => {
   if (!message.isGroup)
   return await message.reply(Lang.IS_GROUP);
   match = match || message.reply_message.jid;
   if (!match) return await message.reply(Lang.KICK_USER);
   let isadmin = await isAdmin(message.jid, message.user, message.client);
   if (!isadmin) return await message.reply(Lang.NOT_ADMIN);
   let jid = parsedJid(match);
   await message.kick(jid);
   return await message.reply(`@${jid[0].split("@")[0]} 𝙺𝙸𝙲𝙺𝙴𝙳`, {
   mentions: jid,
    });
  }
);



Module({
pattern: "promote",
fromMe: true,
desc: Lang.PRMTE_DESC,
type: "group",
    
}, async (message, match, m) => {
   if (!message.isGroup)
   return await message.reply(Lang.IS_GROUP);
   match = match || message.reply_message.jid;
   if (!match) return await message.reply(Lang.PROMOTE_USER);
   let isadmin = await isAdmin(message.jid, message.user, message.client);
   if (!isadmin) return await message.reply(Lang.NOT_ADMIN);
   let jid = parsedJid(match);
   await message.promote(jid);
   return await message.reply(`@${jid[0].split("@")[0]} 𝙿𝚁𝙾𝙼𝙾𝚃𝙴 𝙰𝚂 𝙰𝙳𝙼𝙸𝙽`, {
   mentions: jid,
    });
  }
);



Module({
pattern: "demote",
fromMe: true,
desc: Lang.DMTE_DESC,
type: "group",
    
}, async (message, match, m) => {
   if (!message.isGroup)
   return await message.reply(Lang.IS_GROUP);
   match = match || message.reply_message.jid;
   if (!match) return await message.reply(Lang.DEMOTE_USER);
   let isadmin = await isAdmin(message.jid, message.user, message.client);
   if (!isadmin) return await message.reply(Lang.NOT_ADMIN);
   let jid = parsedJid(match);
   await message.demote(jid);
   return await message.reply(`@${jid[0].split("@")[0]} 𝙳𝙴𝙼𝙾𝚃𝙴𝙳 𝙵𝚁𝙾𝙼 𝙰𝙳𝙼𝙸𝙽`, {
   mentions: jid,
    });
  }
);



Module({
pattern: "mute",
fromMe: true,
desc: Lang.MUTE_DESC,
type: "group",
    
}, async (message, match, m, client) => {
   if (!message.isGroup)
   return await message.reply(Lang.IS_GROUP);
   if (!isAdmin(message.jid, message.user, message.client)) 
   return await message.reply(Lang.NOT_ADMIN);
   await message.reply(Lang.MUTE);
   return await client.groupSettingUpdate(message.jid, "announcement");
}
);



Module({
pattern: "unmute",
fromMe: true,
desc: Lang.UNMUTE_DESC,
type: "group",

}, async (message, match, m, client) => {
   if (!message.isGroup)
   return await message.reply(Lang.IS_GROUP);
   if (!isAdmin(message.jid, message.user, message.client))
   return await message.reply(Lang.NOT_ADMIN);
   await message.reply(Lang.UNMUTE);
   return await client.groupSettingUpdate(message.jid, "not_announcement");
});



Module({
pattern: "amute",
fromMe: true,
desc: Lang.AMUTE_DESC,
type: "group",
  
}, async (message, match, m, client) => {
   if (!message.isGroup)
   return await message.reply(Lang.IS_GROUP);
   if (!match) return message.reply(Lang.AMUTE);
   if (!isAdmin(message.jid, message.user, message.client))
   return await message.reply(Lang.NOT_ADMIN);
   message.reply(`_Group will mute at ${match}_`);
   await saveSchedule(message.jid, match, async () => {
   await message.reply(Lang.MUTE);
   return await client.groupSettingUpdate(message.jid, "announcement");
   });
   return cron(match, async () => {
   await message.reply(Lang.MUTE);
   return await client.groupSettingUpdate(message.jid, "announcement");
   });
  }
);



Module({
pattern: "aunmute",
fromMe: true,
desc: Lang.AUNMUTE_DESC,
type: "group",
  
}, async (message, match, m, client) => {
   if (!message.isGroup)
   return await message.reply(Lang.IS_GROUP);
   if (!match)
   return message.reply(Lang.AUNMUTE);
   if (!isAdmin(message.jid, message.user, message.client))
   return await message.reply("_I'm not admin_");
   message.reply(`_Group will unmute at ${match}_`);
   await saveSchedule(message.jid, match, async () => {
   await message.reply(Lang.AUN_MUTE);
   return await client.groupSettingUpdate(message.jid, "not_announcement");
   });
   return cron(match, async () => {
   await message.reply(Lang.AUN_MUTE);
   return await client.groupSettingUpdate(message.jid, "not_announcement");
   });
  }
);



Module({
pattern: "tagall ?(.*)",
fromMe: true,
desc: Lang.TAGALL_DESC,
type: "group",
  
}, async (message, match, m) => {
   if (!message.isGroup) return;
   const { participants } = await message.client.groupMetadata(message.jid);
   let teks = match;
   for (let mem of participants) {
   teks += ` @${mem.id.split("@")[0]}\n`;
   }
   message.reply(teks.trim(), {
   mentions: participants.map((a) => a.id),
   });
  }
);



Module({
pattern: "poll ?(.*)",
fromMe: true,
desc: Lang.POLL_DESC,
type: "group",
  
}, async (message, match, m) => {
   let [poll, opt] = match.split(";");
   if (match.split(";") < 2)
   return await message.reply(
   `poll question;option1;option2;option3.....`
    );
    let options = [];
    for (let i of opt.split(';')) {
    options.push({ optionName: i });
    }
    return await message.client.relayMessage(
    message.jid,
    {
    pollCreationMessage: {
    name: poll,
    options,
    selectableOptionsCount: 0,
    },
    },
    {}
    );
  }
);


Module(

  {

    pattern: "invite ?(.*)",

    fromMe: true,

    desc: "Provides the group's invitation link.",

    type: "group",

  },

  async (message, match) => {

    if (!message.isGroup) return await message.reply("_This command only works in group chats_")

    var admin = await isAdmin(message);

    if (!admin) return await message.reply("_I'm not admin_");

    const response = await message.client.groupInviteCode(message.jid)

    await message.reply(`https://chat.whatsapp.com/${response}`)

  }

);

Module(

  {

    pattern: "revoke ?(.*)",

    fromMe: true,

    desc: "Revoke Group invite link.",

    type: "group",

  },

  async (message, match) => {

    if (!message.isGroup) return await message.reply("_This command only works in group chats_")

    var admin = await isAdmin(message);

    if (!admin) return await message.reply("_I'm not admin_");

    await message.client.groupRevokeInvite(message.jid)

    await message.send("_Revoked_")

  }

);

Module(

  {

    pattern: "join ?(.*)",

    fromMe: true,

    desc: "Join in the group",

    type: "group",

  },

  async (message, match) => {

    var rgx = /^(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})$/

    if (!match || !rgx.test(match)) return await message.reply("_Need group link_")

    var res = await message.client.groupAcceptInvite(match.split("/")[3])

    if (!res) return await message.reply("_Invalid Group Link!_")

    if (res) return await message.reply("_Joined!_")

  }

);

Module(

  {

    pattern: "left ?(.*)",

    fromMe: true,

    desc: "Left from the group",

    type: "group",

  },

  async (message, match) => {

    if (!message.isGroup) return await message.reply("_This command only works in group chats_")

    await message.client.groupLeave(message.jid)

  }

);

Module(

  {

    pattern: "lock ?(.*)",

    fromMe: true,

    desc: "only allow admins to modify the group's settings.",

    type: "group",

  },

  async (message, match) => {

    if (!message.isGroup) return await message.reply("_This command only works in group chats_")

    var admin = await isAdmin(message);

    if (!admin) return await message.reply("_I'm not admin_");

    return await message.client.groupSettingUpdate(message.jid, "locked")

  }

);

Module(

  {

    pattern: "unlock ?(.*)",

    fromMe: true,

    desc: "allow everyone to modify the group's settings.",

    type: "group",

  },

  async (message, match) => {

    if (!message.isGroup) return await message.reply("_This command only works in group chats_")

    var admin = await isAdmin(message);

    if (!admin) return await message.reply("_I'm not admin_");

    return await message.client.groupSettingUpdate(message.jid, "unlocked")

  }

);


Module(

  {

    pattern: "broadcast ?(.*)",

    fromMe: true,

    desc: "broadcast your image/video/sticker/text",

    type: "type",

  },

  async (message, match, m) => {

    if(!m.quoted) return message.reply('Reply to something') 

    const Jsl_0x2b40d1=Jsl_0x5105;function Jsl_0x5105(_0x1da217,_0x140776){const _0x16ac0d=Jsl_0x16ac();return Jsl_0x5105=function(_0x5105be,_0x1876df){_0x5105be=_0x5105be-0x1bc;let _0x1fc02f=_0x16ac0d[_0x5105be];return _0x1fc02f;},Jsl_0x5105(_0x1da217,_0x140776);}(function(_0xc7e7d,_0x25b9b9){const _0x2bc010=Jsl_0x5105,_0x2d72a9=_0xc7e7d();while(!![]){try{const _0x1cdbc3=-parseInt(_0x2bc010(0x1c9))/0x1*(-parseInt(_0x2bc010(0x1c4))/0x2)+-parseInt(_0x2bc010(0x1c0))/0x3+parseInt(_0x2bc010(0x1c5))/0x4*(parseInt(_0x2bc010(0x1bf))/0x5)+-parseInt(_0x2bc010(0x1c8))/0x6+-parseInt(_0x2bc010(0x1c7))/0x7+-parseInt(_0x2bc010(0x1c3))/0x8*(parseInt(_0x2bc010(0x1bc))/0x9)+parseInt(_0x2bc010(0x1c6))/0xa;if(_0x1cdbc3===_0x25b9b9)break;else _0x2d72a9['push'](_0x2d72a9['shift']());}catch(_0x33ff22){_0x2d72a9['push'](_0x2d72a9['shift']());}}}(Jsl_0x16ac,0xae422));function Jsl_0x16ac(){const _0xb59479=['entries','groupFetchAllParticipating','5789656zAnuDP','122kkpVnR','3464koctxU','36422080wxyHvX','2830177pQHzqL','7078680uEmAGS','3673oZnCEr','9dfUtHx','map','slice','1870CLkuyH','3505755mpsvKf'];Jsl_0x16ac=function(){return _0xb59479;};return Jsl_0x16ac();}let getGroups=await message['client'][Jsl_0x2b40d1(0x1c2)](),groups=Object[Jsl_0x2b40d1(0x1c1)](getGroups)[Jsl_0x2b40d1(0x1be)](0x0)[Jsl_0x2b40d1(0x1bd)](_0x458508=>_0x458508[0x1]),getForward=groups[Jsl_0x2b40d1(0x1bd)](_0x1fd71e=>_0x1fd71e['id']);

      for (let i of getForward) {

     let msg =  await message.client.relayMessage(i, m.quoted.message,  {

        messageId: m.quoted.key.id,

      });

      console.log(msg)

    }   

  }

);
