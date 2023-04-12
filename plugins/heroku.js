const simpleGit = require('simple-git');
const git = simpleGit();
const { Module, sendButton } = require('../lib');
const config = require('../config');
const { SUDO, MODE } = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({ token: config.HEROKU_API_KEY })
const baseURI = '/apps/' + config.HEROKU_APP_NAME

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
      {buttonId: "setvar MODE:public", buttonText: {displayText: "Public"}, type: 1},
      {buttonId: "setvar MODE:private", buttonText: {displayText: "Private"}, type: 1}
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
