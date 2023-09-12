const {
  Module,
  isAdmin,
  getString,
  parsedJid
} = require("../lib/");
let Lang = getString('group');

Module(
  {
    pattern: "add ?(.*)",
    fromMe: true,
    desc: "Adds a person to the group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    let num = match || message.reply_message.jid
    if (!num) return await message.reply("_Enter the number you want to add_");
    let user = num.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    let admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_I'm not admin_");
    await message.client.groupParticipantsUpdate(message.jid, [user], "add")
    return await message.client.sendMessage(message.jid, { text: `_@${user.split("@")[0]}, Added to The Group!_`, mentions: [user] })
  }
);

Module(
  {
    pattern: "kick",
    fromMe: true,
    desc: "Adds a person to group",
    type: "group",
  },
  async (message, match) => {
    if (!match && match !== "all") return await message.reply("_Removing All Group Members_")
    if (match == "all") {
    let { participants } = await message.client.groupMetadata(message.jid);
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_I'm not admin_");

    for (let key of participants) {
      let jid = parsedJid(key.id);
      await message.kick(jid);
      await message.reply(`@${jid[0].split("@")[0]} kicked`, {
        mentions: jid,
      });
    }
  }
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    let user = message.mention[0] || message.reply_message.jid
   var admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_I'm not admin_");
    await message.client.groupParticipantsUpdate(message.jid, [user], "remove")
    return await message.client.sendMessage(message.jid, { text: `_@${user.split("@")[0]}, Kicked From The Group!_`, mentions: [user] })
  }
);

Module(
  {
    pattern: "promote ?(.*)",
    fromMe: true,
    desc: "promote a member",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    let user = message.mention[0] || message.reply_message.jid
    if (!user) return await message.reply("_Give me a user!_");
    var admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_I'm not admin_");
    await message.client.groupParticipantsUpdate(message.jid, [user], "promote")
    return await message.client.sendMessage(message.jid, { text: `_@${user.split("@")[0]}, Is Promoted as Admin!_`, mentions: [user] })
  }
);

Module(
  {
    pattern: "demote ?(.*)",
    fromMe: true,
    desc: "demote a member",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    let user = message.mention[0] || message.reply_message.jid
    if (!user) return await message.reply("_Give me a user!_");
    var admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_I'm not admin_");
    await message.client.groupParticipantsUpdate(message.jid, [user], "demote")
    return await message.client.sendMessage(message.jid, { text: `_@${user.split("@")[0]}, Is no longer an Admin!_`, mentions: [user] })
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


Module(
  {
    pattern: "invite ?(.*)",
    fromMe: true,
    desc: "Provides the group's invitation link.",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    var admin = await isAdmin(message.jid, message.user, message.client);
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
    var admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_I'm not admin_");
    await message.client.groupRevokeInvite(message.jid)
    await message.reply("_Revoked_")
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
    var admin = await isAdmin(message.jid, message.user, message.client);
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
    var admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_I'm not admin_");
    return await message.client.groupSettingUpdate(message.jid, "unlocked")
  }
);

Module(
  {
    pattern: "gname ?(.*)",
    fromMe: true,
    desc: "Change group subject",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    match = match || message.reply_message.text
    if (!match) return await message.reply("_Need Subject!_\n_Example: gname New Subject!_.")
    var { restrict } = message.client.groupMetadata(message.jid);;
    if (restrict && !(await isAdmin(message))) return await message.reply("_I'm not admin_");
    await message.client.groupUpdateSubject(message.jid, match)
    return await message.reply("_Subject updated_")
  }
);

Module(
  {
    pattern: "gdesc ?(.*)",
    fromMe: true,
    desc: "Change group description",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    match = match || message.reply_message.text
    if (!match) return await message.reply("_Need Description!\nExample: gdesc New Description!_")
    const participants =  await message.client.groupMetadata(message.jid)
    if (participants && !(await isAdmin(message.jid, message.user, message.client))) return await message.reply("_I'm not admin_");
    await message.client.groupUpdateDescription(message.jid, match)
    return await message.reply("_Description updated_")
  }
);

Module(
  {
    pattern: "gpp ?(.*)",
    fromMe: true,
    desc: "Change group icon",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("hi_This command only works in group chats_")
    var admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_I'm not admin_");
    if (message.reply_message && message.reply_message.image) {
    var img = await message.reply_message.download()
    await message.client.updateProfilePicture(message.jid, {url: img});
    return await message.reply("_Successfully Profile Picture Updated_")
    }
  } 
);

Module(

  {

    pattern: "broadcast ?(.*)",
    fromMe: true,
    desc: "broadcast your message in all chat",
    type: "group",

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


Module(

  {

    pattern: "forward ?(.*)",
    fromMe: true,
    desc: "forward your messages in your jid",
    type: "group",

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
    type: "group",

  },

  async (message, match, m) => {

    if(!m.quoted) return message.reply('_Reply to something_') 

    let jid = (match);

     {

     let msg =  await message.client.relayMessage(jid, m.quoted.message, {

        messageId: m.quoted.key.id,

      });

      console.log(msg)

    }   

  }

);
