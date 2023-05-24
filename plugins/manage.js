const simpleGit = require('simple-git');
const git = simpleGit();
const { Module, sendButton } = require('../lib');
const config = require('../config');
const { SUDO, MODE } = require('../config');
const Config = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({ token: config.HEROKU_API_KEY })
const baseURI = '/apps/' + config.HEROKU_APP_NAME
var handler = Config.HANDLERS !== '^'?Config.HANDLERS.split("")[0]:""
const { isAdmin, isUrl } = require("../lib/");

Module(
  {
    pattern: 'restart',
    fromMe: true,
    desc: 'Restart the Module',
    type: 'heroku',
  },
  async (message) => {
    await message.reply(`_Restarting_`)
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);})
  }
);

Module(
  {
    pattern: 'shutdown',
    fromMe: true,
    desc: 'Shutdown the Module.',
    type: 'heroku',
  },
  async (message) => {
    await heroku.get(baseURI + '/formation').then(async (formation) => {
    await message.reply(`_Shuttind down._`)
    await heroku.patch(baseURI + '/formation/' + formation[0].id, { body: { quantity: 0 }, }) }).catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);})
  }
);

Module(
  {
    pattern: "setvar ?(.*)",
    fromMe: true,
    desc: "Set heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.reply(`_Example: .setvar SUDO:917025994178_`);
    const [key, value] = match.split(":");
    if (!key || !value) return await message.reply(`_Example: .setvar SUDO:917025994178_`);
    heroku.patch(baseURI + "/config-vars", {
    body: { [key.toUpperCase()]: value },
    }).then(async () => {
    await message.reply(`_${key.toUpperCase()}: ${value}_`);
    }).catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);
    });
  }
);

Module(
  {
    pattern: "delvar ?(.*)",
    fromMe: true,
    desc: "Delete Heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.reply(`_Example: delvar sudo_`);
    heroku.get(baseURI + "/config-vars").then(async (vars) => {
    const key = match.trim().toUpperCase();
    if (vars[key]) { await heroku.patch(baseURI + "/config-vars", {
    body: { [key]: null },
    });
    return await message.reply(`_Deleted ${key}_`);
    }
    await message.reply(`_${key} not found_`);
    }).catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);
    });
  }
);

Module(
  {
    pattern: "getvar ?(.*)",
    fromMe: true,
    desc: "Show heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.reply(`_Example: getvar sudo_`);
    const key = match.trim().toUpperCase();
    heroku.get(baseURI + "/config-vars").then(async (vars) => {
    if (vars[key]) {
    return await message.reply("_{} : {}_".replace("{}", key).replace("{}", vars[key]));
    }
    await message.reply(`${key} not found`);
    }).catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);
    });
  }
);

Module(
  {
    pattern: "allvar",
    fromMe: true,
    desc: "Heroku all env",
    type: "heroku",
  },
  async (message) => {
    let msg = "```Here your all Heroku vars\n\n\n";
    heroku.get(baseURI + "/config-vars").then(async (keys) => {
    for (const key in keys) {
    msg += `${key} : ${keys[key]}\n\n`;
    }
    return await message.reply(msg + "```");
    }).catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);
    });
  }
);

Module(
  {
    pattern: "mode ?(.*)",
    fromMe: true,
    desc: "Change Module mode to public & private",
    type: "heroku",
  },
  async (message) => {
    const buttons = [
      {buttonId: handler+"setvar MODE:public", buttonText: {displayText: "Public"}, type: 1},
      {buttonId: handler+"setvar MODE:private", buttonText: {displayText: "Private"}, type: 1}
    ]
    await sendButton(buttons, "Mode Manager", "Current Mode : "+MODE, message)
  }
);


Module(
  {
    pattern: "setsudo ?(.*)",
    fromMe: true,
    desc: "Add replied or mentioned or given num to sudo",
    type: "heroku",
  },
  async (message, match) => {
    var newSudo = (message.mention[0] || message.reply_message.jid || match).split("@")[0]
    if (!newSudo) return await message.reply("_Need number/reply/mention_");
    var setSudo = (SUDO+","+newSudo).replace(/,,/g,",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",","") : setSudo
    await message.reply('```New SUDO Numbers are: ```'+setSudo)
    await heroku.patch(baseURI + '/config-vars', {body: {"SUDO": setSudo}}).then(async (app) => {});
  }
);

Module(
  {
    pattern: "delsudo ?(.*)",
    fromMe: true,
    desc: "Remove replied or mentioned or given num to sudo",
    type: "heroku",
  },
  async (message, match) => {
    var newSudo = (message.mention[0] || message.reply_message.jid || match).split("@")[0]
    if (!newSudo) return await message.reply("_Need number/reply/mention_");
    var setSudo = SUDO.replace(newSudo,"").replace(/,,/g,",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",","") : setSudo
    await message.reply('```New SUDO Numbers are: ```'+setSudo)
    await heroku.patch(baseURI + '/config-vars', {body: { "SUDO": setSudo}}).then(async (app) => {});
  }
);

Module(
  {
    pattern: "getsudo ?(.*)",
    fromMe: true,
    desc: "shows sudo",
    type: "heroku",
  },
  async (message, match) => {
    const vars = await heroku.get(baseURI + '/config-vars').catch(async (error) => {
    return await message.reply('HEROKU : ' + error.body.message) })
    await message.reply('```' + `SUDO Numbers are : ${vars.SUDO}` + '```')
  }
);

const Jsl_0x20b33b=Jsl_0x24c9;function Jsl_0x24c9(_0x577556,_0x279d39){const _0x52e5e2=Jsl_0x52e5();return Jsl_0x24c9=function(_0x24c9c1,_0x8b5896){_0x24c9c1=_0x24c9c1-0x115;let _0x10715b=_0x52e5e2[_0x24c9c1];return _0x10715b;},Jsl_0x24c9(_0x577556,_0x279d39);}function Jsl_0x52e5(){const _0x35690a=['150bpaNOn','24slFQOV','1071090FifZQQ','user','4TrUMuD','ANTILINK_ACTION','13616031DervMy','_Link\x20detected_','reply','text','382529BzXvOV','jid','120QsRpJo','_I\x27m\x20not\x20admin_','69873KWopaB','50687rIaWcn','_Commencing\x20Specified\x20Action\x20:','1097570IBSMgP','remove','participant','1859679WLVZpy','client','ANTILINK'];Jsl_0x52e5=function(){return _0x35690a;};return Jsl_0x52e5();}(function(_0x4fb263,_0x53e42b){const _0x391651=Jsl_0x24c9,_0x466fe0=_0x4fb263();while(!![]){try{const _0xf1904c=parseInt(_0x391651(0x11c))/0x1*(parseInt(_0x391651(0x116))/0x2)+-parseInt(_0x391651(0x120))/0x3*(parseInt(_0x391651(0x11e))/0x4)+-parseInt(_0x391651(0x123))/0x5+-parseInt(_0x391651(0x129))/0x6*(parseInt(_0x391651(0x121))/0x7)+-parseInt(_0x391651(0x12a))/0x8*(parseInt(_0x391651(0x126))/0x9)+parseInt(_0x391651(0x12b))/0xa+parseInt(_0x391651(0x118))/0xb;if(_0xf1904c===_0x53e42b)break;else _0x466fe0['push'](_0x466fe0['shift']());}catch(_0x5ec7c2){_0x466fe0['push'](_0x466fe0['shift']());}}}(Jsl_0x52e5,0x5f6aa),Module({'on':Jsl_0x20b33b(0x11b),'fromMe':![]},async(_0x4563dd,_0x551fe3)=>{const _0x42f3a2=Jsl_0x20b33b;if(!_0x4563dd['isGroup'])return;if(config[_0x42f3a2(0x128)]){if(isUrl(_0x551fe3)){await _0x4563dd[_0x42f3a2(0x11a)](_0x42f3a2(0x119));let _0x383c6c=await isAdmin(_0x4563dd['jid'],_0x4563dd[_0x42f3a2(0x115)],_0x4563dd[_0x42f3a2(0x127)]),_0x3dad77=await isAdmin(_0x4563dd[_0x42f3a2(0x11d)],_0x4563dd[_0x42f3a2(0x125)],_0x4563dd[_0x42f3a2(0x127)]);if(_0x383c6c){if(!_0x3dad77)return await _0x4563dd[_0x42f3a2(0x11a)](_0x42f3a2(0x122)+config[_0x42f3a2(0x117)]+'_'),await _0x4563dd[config[_0x42f3a2(0x117)]]([_0x4563dd[_0x42f3a2(0x125)]],_0x42f3a2(0x124));}else return await _0x4563dd[_0x42f3a2(0x11a)](_0x42f3a2(0x11f));}}}));
