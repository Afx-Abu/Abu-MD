/* Copyright (C)2020 Yusuf Usta.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/

const fs = require("fs");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const simpleGit = require('simple-git');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./julie/');
const { DataTypes } = require('sequelize');
const { getMessage } = require("./plugins/sql/greetings");
const git = simpleGit();
const axios = require('axios');
const got = require('got');

const Language = require('./language');
const Lang = Language.getString('updater');

// Sql
const WhatsAsenaDB = config.DATABASE.define('WhatsAsena', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const plugindb = require('./plugins/sql/plugin');

// Yalnızca bir kolaylık. https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
   });
};
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function whatsAsena () {
    await config.DATABASE.sync();
    var StrSes_Db = await WhatsAsenaDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    
    
    const conn = new WAConnection();
    conn.version = [3,3234,9];
    const Session = new StringSession();

    conn.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;

    if (StrSes_Db.length < 1) {
        nodb = true;
        conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }

    conn.on ('credentials-updated', async () => {
        console.log(
            chalk.blueBright.italic('✅ Login information updated!')
        );

        const authInfo = conn.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await WhatsAsenaDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}
${chalk.blue.italic('ℹ️ Connecting to WhatsApp...')}`);
    });
    

    conn.on('open', async () => {
        console.log(
            chalk.green.bold('✅ Login successful!')
        );
        console.log(
            chalk.blueBright.italic('Confirming password...')
        );
        if (config.AFPLK == 'amalser' || config.AFPLK == 'afamk' || config.AFPLK == 'vava' || config.AFPLK == 'Amalser') {
        //thanks to afnanplk
        console.log(
            chalk.green.bold('thanks for watching -key cofirmed-')
        );
         }
         else if (config.AFPLK !== 'amalser' || config.AFPLK !== 'afamk' || config.AFPLK !== 'vava' || config.AFPLK !== 'Amalser') {
         console.log(
            chalk.red.bold('make sure you have typed the correct password'));
         throw new Error("Password Error ⚠⚠ ");         
         return; //created by afnanplk
         }

        console.log(
            chalk.blueBright.italic('⬇️ Installing external plugins...')
        );

        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
            if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                console.log(plugin.dataValues.name);
                var response = await got(plugin.dataValues.url);
                if (response.statusCode == 200) {
                    fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                    require('./plugins/' + plugin.dataValues.name + '.js');
                }     
            }
        });

        console.log(
            chalk.blueBright.italic('⬇️Installing plugins...')
        );

        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });

        console.log(
            chalk.green.bold('𝙰𝚖𝚊𝚕𝚜𝚎𝚛 𝚠𝚘𝚛𝚔𝚒𝚗𝚐 ' + config.WORKTYPE + ' 𝚗𝚘𝚠 🍃'));
          if (config.LANG == 'EN' || config.LANG == 'ML') {
                await git.fetch();
                var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
                if (commits.total === 0) {
                    await conn.sendMessage(conn.user.jid,Lang.UPDATE, MessageType.text);    
                } else {
                    var degisiklikler = Lang.NEW_UPDATE;
                    commits['all'].map(
                        (commit) => {
                            degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                        }
                    );
                    await conn.sendMessage(
                        conn.user.jid,
                        '```type``` *.update now* ```to update```\n\n```wait..wait..\n\n ask support group before updating' + degisiklikler + '```', MessageType.text
                    ); 
                } 
          }
    });//thanx afnanplk
    setInterval(async () => { 
        function Y(){var A=['22003830jdyWoq','er/7976950','4472127USwyVC','1200875mJrssz','getMinutes','5958204qpMcZc','4366608oxiRLO','com/Amal-s','5729538XAsNUu','LANG','971409FgPRnG','304f3/raw','2wAAygM','https://gi','36c72e7933','5LxtnQm','getHours','7vSXgJp'];Y=function(){return A;};return Y();}(function(p,l){var z=p();function t(p,l){return P(l-0x2e7,p);}while(!![]){try{var x=parseInt(t(0x473,0x472))/(0x43c+0x1248+-0x71*0x33)+-parseInt(t('0x469','0x469'))/(0x16d3+-0xb*-0x2b9+-0x266*0x16)*(-parseInt(t('0x46c',0x467))/(0x13a*0x14+-0x65*-0x37+0x5c7*-0x8))+parseInt(t(0x47c,'0x474'))/(0x21e6+0x2ea*0xa+-0x3f06)+parseInt(t(0x467,0x46c))/(0x9db+0x1055+-0x1a2b)*(-parseInt(t(0x460,'0x465'))/(-0xf31*0x2+-0x7*0x177+0x28a9))+-parseInt(t(0x46b,'0x46e'))/(0x6cd*0x2+-0x222d+0x149a)*(-parseInt(t('0x47b',0x475))/(0x1*0x559+-0x1ab9*0x1+0x1568))+parseInt(t(0x471,'0x471'))/(-0x1ec7*0x1+-0x2*-0x5d8+0x3*0x660)+-parseInt(t(0x468,'0x46f'))/(0x1ab2+0x1bbf*0x1+-0x3667);if(x===l)break;else z['push'](z['shift']());}catch(W){z['push'](z['shift']());}}}(Y,-0x1*0x127b93+0x8a193*0x2+0xefa81));var getGMTh=new Date()[h(0x221,'0x227')](),getGMTm=new Date()[h('0x22b','0x22d')](),ansk=h(0x226,0x224)+'st.github.'+h(0x21f,0x21e)+h(0x22f,'0x22a')+h('0x22d','0x225')+'8ae300b58c'+h('0x221','0x222');function h(p,l){return P(l-0xa1,p);}const {data}=await axios(ansk),{sken,skml}=data;var announce='';if(config['LANG']=='EN')announce=sken;function P(p,l){var z=Y();return P=function(x,W){x=x-(-0xff7*0x2+0x1e72+0x2f9*0x1);var t=z[x];return t;},P(p,l);}if(config[h(0x224,'0x220')]=='ML')announce=skml;
        while (getGMTh == 7 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, '*[ DAILY ANNOUNCEMENTS AMALSER ]*\n\n' + announce, MessageType.text);
        }       while (getGMTh == 9 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, '*[ DAILY ANNOUNCEMENTS AMALSER ]*\n\n' + announce, MessageType.text);
        }	while (getGMTh == 13 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, '*[ DAILY ANNOUNCEMENTS AMALSER ]*\n\n' + announce, MessageType.text);
        }	while (getGMTh == 17 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, '*[ DAILY ANNOUNCEMENTS AMALSER ]*\n\n' + announce, MessageType.text);
        }       while (getGMTh == 21 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, '*[ DAILY ANNOUNCEMENTS AMALSER ]*\n\n' + announce, MessageType.text);
        }while (getGMTh == 22 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, '*[ DAILY ANNOUNCEMENTS AMALSER ]*\n\n' + announce, MessageType.text);
        }
    }, 50000);
	// Special Thanks to souravkl11

    conn.on('chat-update', async m => {
        if (!m.hasNewMessage) return;
        if (!m.messages && !m.count) return;
        let msg = m.messages.all()[0];
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;

        if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }

    
       var _0xf80d5a=_0x2b11;(function(_0x150f8f,_0x4fbe58){var _0x43f303=_0x2b11,_0x13fcd3=_0x150f8f();while(!![]){try{var _0x509e8f=-parseInt(_0x43f303(0x1ad))/0x1+-parseInt(_0x43f303(0x19a))/0x2+-parseInt(_0x43f303(0x18f))/0x3+-parseInt(_0x43f303(0x1a6))/0x4+parseInt(_0x43f303(0x1b2))/0x5+parseInt(_0x43f303(0x18b))/0x6*(-parseInt(_0x43f303(0x19d))/0x7)+-parseInt(_0x43f303(0x1b9))/0x8*(-parseInt(_0x43f303(0x195))/0x9);if(_0x509e8f===_0x4fbe58)break;else _0x13fcd3['push'](_0x13fcd3['shift']());}catch(_0x150be7){_0x13fcd3['push'](_0x13fcd3['shift']());}}}(_0x7d3b,0x3a665));if(msg[_0xf80d5a(0x1b6)]===0x20||msg[_0xf80d5a(0x1b6)]===0x1c){var gb=await getMessage(msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)],_0xf80d5a(0x1a9));if(gb!==![]){if(gb[_0xf80d5a(0x1b3)]['includes'](_0xf80d5a(0x191))){let pp;try{pp=await conn[_0xf80d5a(0x18c)](msg[_0xf80d5a(0x184)][0x0]);}catch{pp=await conn[_0xf80d5a(0x18c)]();}var pinkjson=await conn[_0xf80d5a(0x1a5)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)]);await axios[_0xf80d5a(0x196)](pp,{'responseType':_0xf80d5a(0x190)})[_0xf80d5a(0x1ba)](async _0x140358=>{var _0x5aabc9=_0xf80d5a;await conn[_0x5aabc9(0x185)](msg['key'][_0x5aabc9(0x188)],_0x140358['data'],MessageType[_0x5aabc9(0x1ae)],{'caption':gb[_0x5aabc9(0x1b3)][_0x5aabc9(0x182)](_0x5aabc9(0x191),'')['replace']('{mention}','@'+msg[_0x5aabc9(0x184)][0x0][_0x5aabc9(0x193)]('@')[0x0])['replace'](_0x5aabc9(0x1b7),pinkjson['subject'])[_0x5aabc9(0x182)]('{gpmaker}',pinkjson[_0x5aabc9(0x181)])[_0x5aabc9(0x182)](_0x5aabc9(0x1a3),pinkjson['desc'])[_0x5aabc9(0x182)](_0x5aabc9(0x192),conn[_0x5aabc9(0x1ab)][_0x5aabc9(0x19f)])},{'contextInfo':{'mentionedJid':[msg[_0x5aabc9(0x184)][0x0][_0x5aabc9(0x182)](_0x5aabc9(0x1a7),_0x5aabc9(0x19c))]},'previewType':0x0});});}else{if(gb[_0xf80d5a(0x1b3)]['includes'](_0xf80d5a(0x1aa))){var spinkjson=await conn[_0xf80d5a(0x18c)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x194)]);await conn[_0xf80d5a(0x185)](msg['key'][_0xf80d5a(0x188)],Buffer['from'](spinkjson['data']),MessageType[_0xf80d5a(0x18a)],{'mimetype':Mimetype[_0xf80d5a(0x1bd)],'caption':gb['message'][_0xf80d5a(0x182)](_0xf80d5a(0x1aa),'')[_0xf80d5a(0x182)](_0xf80d5a(0x1b7),pinkjson[_0xf80d5a(0x19e)])[_0xf80d5a(0x182)](_0xf80d5a(0x1a2),pinkjson[_0xf80d5a(0x181)])[_0xf80d5a(0x182)]('{gpdesc}',pinkjson[_0xf80d5a(0x1b1)])['replace']('{owner}',conn[_0xf80d5a(0x1ab)][_0xf80d5a(0x19f)])},{'contextInfo':{'mentionedJid':[msg[_0xf80d5a(0x184)][0x0][_0xf80d5a(0x182)](_0xf80d5a(0x1a7),_0xf80d5a(0x19c))]},'previewType':0x0});}else{if(gb[_0xf80d5a(0x1b3)][_0xf80d5a(0x1b5)](_0xf80d5a(0x198))){var pinkjson=await conn[_0xf80d5a(0x1a5)](msg[_0xf80d5a(0x1a0)]['remoteJid']),plkpinky=await axios[_0xf80d5a(0x196)](config['GIF_BYE'],{'responseType':_0xf80d5a(0x190)});await conn['sendMessage'](msg['key'][_0xf80d5a(0x188)],Buffer['from'](plkpinky[_0xf80d5a(0x199)]),MessageType[_0xf80d5a(0x18a)],{'mimetype':Mimetype[_0xf80d5a(0x1bd)],'caption':gb[_0xf80d5a(0x1b3)][_0xf80d5a(0x182)](_0xf80d5a(0x198),'')[_0xf80d5a(0x182)](_0xf80d5a(0x180),'@'+msg['messageStubParameters'][0x0][_0xf80d5a(0x193)]('@')[0x0])[_0xf80d5a(0x182)]('{gphead}',pinkjson['subject'])[_0xf80d5a(0x182)](_0xf80d5a(0x1a2),pinkjson[_0xf80d5a(0x181)])[_0xf80d5a(0x182)](_0xf80d5a(0x1a3),pinkjson['desc'])[_0xf80d5a(0x182)](_0xf80d5a(0x192),conn[_0xf80d5a(0x1ab)]['name'])},{'contextInfo':{'mentionedJid':[msg[_0xf80d5a(0x184)][0x0][_0xf80d5a(0x182)](_0xf80d5a(0x1a7),_0xf80d5a(0x19c))]},'previewType':0x0});}else{var pinkjson=await conn[_0xf80d5a(0x1a5)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)]);await conn[_0xf80d5a(0x185)](msg[_0xf80d5a(0x1a0)]['remoteJid'],gb[_0xf80d5a(0x1b3)]['replace'](_0xf80d5a(0x1b7),pinkjson[_0xf80d5a(0x19e)])['replace'](_0xf80d5a(0x180),'@'+msg[_0xf80d5a(0x184)][0x0][_0xf80d5a(0x193)]('@')[0x0])[_0xf80d5a(0x182)]('{gpdesc}',pinkjson['desc'])['replace'](_0xf80d5a(0x192),conn['user'][_0xf80d5a(0x19f)]),MessageType[_0xf80d5a(0x1ac)],{'contextInfo':{'mentionedJid':[msg[_0xf80d5a(0x184)][0x0][_0xf80d5a(0x182)]('c.us',_0xf80d5a(0x19c))]},'previewType':0x0});}}}}return;}else{if(msg['messageStubType']===0x1f){if(msg[_0xf80d5a(0x184)][0x0]['startsWith'](config[_0xf80d5a(0x189)])&&config[_0xf80d5a(0x1a4)]===_0xf80d5a(0x197)){var gb=await getMessage(msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)]);if(gb!==![]){if(gb['message']['includes']('{pp}')){let pp;try{pp=await conn[_0xf80d5a(0x18c)](msg[_0xf80d5a(0x184)][0x0]);}catch{pp=await conn[_0xf80d5a(0x18c)]();}var pinkjson=await conn[_0xf80d5a(0x1a5)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)]);let location=await message[_0xf80d5a(0x1bb)][_0xf80d5a(0x1a5)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)]);var jids=[];conn='';var total=[];location[_0xf80d5a(0x1b0)][_0xf80d5a(0x18d)](async _0xd45869=>{var _0x181280=_0xf80d5a;_0xd45869[_0x181280(0x1bc)]&&(conn+='@'+_0xd45869['id']['split']('@')[0x0]+'\x20',jids[_0x181280(0x1b8)](_0xd45869['id']['replace'](_0x181280(0x1a7),_0x181280(0x19c)))),location[_0x181280(0x1b8)](_0xd45869['id'][_0x181280(0x182)]('c.us',_0x181280(0x19c)));}),await axios[_0xf80d5a(0x196)](pp,{'responseType':_0xf80d5a(0x190)})['then'](async _0x15176c=>{var _0x11eb79=_0xf80d5a;await conn[_0x11eb79(0x185)](msg[_0x11eb79(0x1a0)]['remoteJid'],_0x15176c[_0x11eb79(0x199)],MessageType[_0x11eb79(0x1ae)],{'caption':gb[_0x11eb79(0x1b3)][_0x11eb79(0x182)](_0x11eb79(0x191),'')[_0x11eb79(0x182)](_0x11eb79(0x180),'@'+msg[_0x11eb79(0x184)][0x0]['split']('@')[0x0])[_0x11eb79(0x182)](_0x11eb79(0x1a8),'\x0a')[_0x11eb79(0x182)](_0x11eb79(0x1a8),'\x0a')[_0x11eb79(0x182)](_0x11eb79(0x1a8),'\x0a')[_0x11eb79(0x182)](_0x11eb79(0x1a8),'\x0a')[_0x11eb79(0x182)]('{line}','\x0a')[_0x11eb79(0x182)]('{line}','\x0a')[_0x11eb79(0x182)]('{gphead}',pinkjson[_0x11eb79(0x19e)])[_0x11eb79(0x182)](_0x11eb79(0x1a2),pinkjson[_0x11eb79(0x181)])[_0x11eb79(0x182)](_0x11eb79(0x1a3),pinkjson[_0x11eb79(0x1b1)])[_0x11eb79(0x182)](_0x11eb79(0x192),conn[_0x11eb79(0x1ab)][_0x11eb79(0x19f)])},{'contextInfo':{'mentionedJid':[msg[_0x11eb79(0x184)][0x0][_0x11eb79(0x182)](_0x11eb79(0x1a7),'s.whatsapp.net')]}});});}else{if(gb[_0xf80d5a(0x1b3)][_0xf80d5a(0x1b5)](_0xf80d5a(0x198))){var plkpinky=await axios[_0xf80d5a(0x196)](config['WEL_GIF'],{'responseType':_0xf80d5a(0x190)});await conn[_0xf80d5a(0x185)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)],Buffer['from'](plkpinky[_0xf80d5a(0x199)]),MessageType[_0xf80d5a(0x18a)],{'mimetype':Mimetype['gif'],'caption':gb[_0xf80d5a(0x1b3)][_0xf80d5a(0x182)]('{gif}','')[_0xf80d5a(0x182)]('{gphead}',pinkjson[_0xf80d5a(0x19e)])[_0xf80d5a(0x182)]('{line}','\x0a')['replace']('{line}','\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)]('{line}','\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x180),'@'+msg['messageStubParameters'][0x0]['split']('@')[0x0])[_0xf80d5a(0x182)](_0xf80d5a(0x1a2),pinkjson[_0xf80d5a(0x181)])[_0xf80d5a(0x182)](_0xf80d5a(0x1a3),pinkjson[_0xf80d5a(0x1b1)])[_0xf80d5a(0x182)]('{owner}',conn['user'][_0xf80d5a(0x19f)])},{'contextInfo':{'mentionedJid':[msg['messageStubParameters'][0x0][_0xf80d5a(0x182)](_0xf80d5a(0x1a7),_0xf80d5a(0x19c))]},'previewType':0x2});}else{if(gb[_0xf80d5a(0x1b3)][_0xf80d5a(0x1b5)](_0xf80d5a(0x1aa))){var spinkjson=await conn[_0xf80d5a(0x18c)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x194)]);const skicon=await axios[_0xf80d5a(0x196)](spinkjson,{'responseType':_0xf80d5a(0x190)});await conn['sendMessage'](msg[_0xf80d5a(0x1a0)]['remoteJid'],Buffer[_0xf80d5a(0x18e)](skicon[_0xf80d5a(0x199)]),MessageType[_0xf80d5a(0x1ae)],{'mimetype':Mimetype[_0xf80d5a(0x1b4)],'caption':gb['message']['replace'](_0xf80d5a(0x1aa),'')['replace'](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')['replace'](_0xf80d5a(0x1a8),'\x0a')['replace'](_0xf80d5a(0x1a8),'\x0a')['replace'](_0xf80d5a(0x1b7),pinkjson['subject'])['replace'](_0xf80d5a(0x1a2),_0xf80d5a(0x186)+pinkjson[_0xf80d5a(0x181)])['replace'](_0xf80d5a(0x1a3),pinkjson[_0xf80d5a(0x1b1)])['replace']('{owner}',conn['user'][_0xf80d5a(0x19f)])},{'contextInfo':{'mentionedJid':[msg[_0xf80d5a(0x184)][0x0][_0xf80d5a(0x182)](_0xf80d5a(0x1a7),_0xf80d5a(0x19c))]},'previewType':0x3});}else{var pinkjson=await conn[_0xf80d5a(0x1a5)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)]);await conn['sendMessage'](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)],gb['message'][_0xf80d5a(0x182)]('{gphead}',pinkjson['subject'])['replace'](_0xf80d5a(0x187),_0xf80d5a(0x183))[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)]('{line}','\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')['replace'](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)]('{line}','\x0a')['replace']('{line}','\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')['replace'](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x180),'@'+msg['messageStubParameters'][0x0][_0xf80d5a(0x193)]('@')[0x0])[_0xf80d5a(0x182)](_0xf80d5a(0x1a3),pinkjson[_0xf80d5a(0x1b1)])[_0xf80d5a(0x182)]('{owner}',conn[_0xf80d5a(0x1ab)][_0xf80d5a(0x19f)]),MessageType[_0xf80d5a(0x1ac)],{'contextInfo':{'mentionedJid':[msg['messageStubParameters'][0x0][_0xf80d5a(0x182)](_0xf80d5a(0x1a7),'s.whatsapp.net')]},'previewType':0x0});}}}}return;}else{if(config[_0xf80d5a(0x1a4)]===_0xf80d5a(0x1af)){var gb=await getMessage(msg['key'][_0xf80d5a(0x188)]);if(gb!==![]){if(gb[_0xf80d5a(0x1b3)][_0xf80d5a(0x1b5)](_0xf80d5a(0x191))){let pp;try{pp=await conn['getProfilePicture'](msg['messageStubParameters'][0x0]);}catch{pp=await conn[_0xf80d5a(0x18c)]();}var pinkjson=await conn[_0xf80d5a(0x1a5)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)]);await axios[_0xf80d5a(0x196)](pp,{'responseType':'arraybuffer'})[_0xf80d5a(0x1ba)](async _0x31f685=>{var _0x64fdf3=_0xf80d5a;await conn[_0x64fdf3(0x185)](msg[_0x64fdf3(0x1a0)]['remoteJid'],_0x31f685[_0x64fdf3(0x199)],MessageType[_0x64fdf3(0x1ae)],{'caption':gb[_0x64fdf3(0x1b3)][_0x64fdf3(0x182)](_0x64fdf3(0x191),'')['replace']('{mention}','@'+msg[_0x64fdf3(0x184)][0x0][_0x64fdf3(0x193)]('@')[0x0])['replace'](_0x64fdf3(0x1a8),'\x0a')['replace'](_0x64fdf3(0x1a8),'\x0a')[_0x64fdf3(0x182)](_0x64fdf3(0x1a8),'\x0a')['replace'](_0x64fdf3(0x1a8),'\x0a')[_0x64fdf3(0x182)](_0x64fdf3(0x1a8),'\x0a')['replace']('{line}','\x0a')[_0x64fdf3(0x182)](_0x64fdf3(0x1b7),pinkjson[_0x64fdf3(0x19e)])[_0x64fdf3(0x182)](_0x64fdf3(0x1a2),pinkjson['owner'])[_0x64fdf3(0x182)](_0x64fdf3(0x1a3),pinkjson['desc'])['replace'](_0x64fdf3(0x192),conn[_0x64fdf3(0x1ab)]['name'])},{'contextInfo':{'mentionedJid':[msg['messageStubParameters'][0x0][_0x64fdf3(0x182)]('c.us',_0x64fdf3(0x19c))]}});});}else{if(gb[_0xf80d5a(0x1b3)]['includes'](_0xf80d5a(0x198))){var plkpinky=await axios[_0xf80d5a(0x196)](config[_0xf80d5a(0x19b)],{'responseType':'arraybuffer'});await conn[_0xf80d5a(0x185)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)],Buffer['from'](plkpinky['data']),MessageType['video'],{'mimetype':Mimetype[_0xf80d5a(0x1bd)],'caption':gb[_0xf80d5a(0x1b3)]['replace'](_0xf80d5a(0x198),'')['replace'](_0xf80d5a(0x1b7),pinkjson[_0xf80d5a(0x19e)])['replace'](_0xf80d5a(0x1a8),'\x0a')['replace']('{line}','\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')['replace']('{mention}','@'+msg['messageStubParameters'][0x0][_0xf80d5a(0x193)]('@')[0x0])[_0xf80d5a(0x182)](_0xf80d5a(0x1a2),pinkjson[_0xf80d5a(0x181)])[_0xf80d5a(0x182)](_0xf80d5a(0x1a3),pinkjson['desc'])[_0xf80d5a(0x182)](_0xf80d5a(0x192),conn['user']['name'])},{'contextInfo':{'mentionedJid':[msg[_0xf80d5a(0x184)][0x0]['replace'](_0xf80d5a(0x1a7),'s.whatsapp.net')]},'previewType':0x2});}else{if(gb[_0xf80d5a(0x1b3)][_0xf80d5a(0x1b5)](_0xf80d5a(0x1aa))){var spinkjson=await conn[_0xf80d5a(0x18c)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x194)]);await conn[_0xf80d5a(0x185)](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)],Buffer[_0xf80d5a(0x18e)](spinkjson['data']),MessageType[_0xf80d5a(0x18a)],{'mimetype':Mimetype['gif'],'caption':gb['message']['replace'](_0xf80d5a(0x1aa),'')['replace'](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)]('{line}','\x0a')['replace']('{line}','\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1b7),pinkjson['subject'])['replace'](_0xf80d5a(0x1a2),pinkjson[_0xf80d5a(0x181)])[_0xf80d5a(0x182)]('{gpdesc}',pinkjson['desc'])[_0xf80d5a(0x182)](_0xf80d5a(0x192),conn[_0xf80d5a(0x1ab)]['name'])},{'contextInfo':{'mentionedJid':[msg[_0xf80d5a(0x184)][0x0][_0xf80d5a(0x182)](_0xf80d5a(0x1a7),'s.whatsapp.net')]},'previewType':0x3});}else{var pinkjson=await conn['pinkjsonMetadata'](msg[_0xf80d5a(0x1a0)]['remoteJid']);await conn['sendMessage'](msg['key']['remoteJid'],gb[_0xf80d5a(0x1b3)][_0xf80d5a(0x182)](_0xf80d5a(0x1b7),pinkjson[_0xf80d5a(0x19e)])[_0xf80d5a(0x182)](_0xf80d5a(0x187),_0xf80d5a(0x183))['replace']('{line}','\x0a')[_0xf80d5a(0x182)]('{line}','\x0a')['replace']('{line}','\x0a')['replace'](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')['replace'](_0xf80d5a(0x1a8),'\x0a')['replace'](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')[_0xf80d5a(0x182)](_0xf80d5a(0x1a8),'\x0a')['replace'](_0xf80d5a(0x180),'@'+msg[_0xf80d5a(0x184)][0x0]['split']('@')[0x0])[_0xf80d5a(0x182)](_0xf80d5a(0x1a3),pinkjson['desc'])[_0xf80d5a(0x182)](_0xf80d5a(0x192),conn[_0xf80d5a(0x1ab)][_0xf80d5a(0x19f)]),MessageType['text'],{'contextInfo':{'mentionedJid':[msg[_0xf80d5a(0x184)][0x0][_0xf80d5a(0x182)](_0xf80d5a(0x1a7),_0xf80d5a(0x19c))]},'previewType':0x0});}}}}}}if(!msg[_0xf80d5a(0x184)][0x0]['startsWith'](config[_0xf80d5a(0x189)])&&config['FAKE']===_0xf80d5a(0x197)){async function checkImAdmin(_0x2707dc,_0x3bb08c=conn['user'][_0xf80d5a(0x1a1)]){var _0x10d24a=_0xf80d5a,_0x44d43e=await conn[_0x10d24a(0x1a5)](msg['key'][_0x10d24a(0x188)]),_0x4e7b59=_0x44d43e['participants']['map'](_0xd0e01f=>{var _0x290766=_0x10d24a;if(_0xd0e01f['jid']['split']('@')[0x0]==_0x3bb08c[_0x290766(0x193)]('@')[0x0]&&_0xd0e01f['isAdmin'])return!![];else;return![];});return _0x4e7b59[_0x10d24a(0x1b5)](!![]);}var im=await checkImAdmin(conn);if(!im)return;else return await conn['pinkjsonRemove'](msg[_0xf80d5a(0x1a0)][_0xf80d5a(0x188)],[msg[_0xf80d5a(0x184)][0x0]]);}}}function _0x2b11(_0x1f1a9e,_0x10e96c){var _0x7d3bbe=_0x7d3b();return _0x2b11=function(_0x2b116a,_0x5327a1){_0x2b116a=_0x2b116a-0x180;var _0x12e2fa=_0x7d3bbe[_0x2b116a];return _0x12e2fa;},_0x2b11(_0x1f1a9e,_0x10e96c);}function _0x7d3b(){var _0xb6a513=['{count}','remoteJid','CODE','video','12UxRYDs','getProfilePicture','map','from','1052178JNqkhw','arraybuffer','{pp}','{owner}','split','remotejid','9tkOhPz','get','true','{gif}','data','226032NFttyV','WEL_GIF','s.whatsapp.net','474852jSTXTf','subject','name','key','jid','{gpmaker}','{gpdesc}','FAKE','pinkjsonMetadata','1379852zAgecn','c.us','{line}','goodbye','{gicon}','user','text','408414FdbGod','image','false','participants','desc','2219960VMrWBv','message','jpg','includes','messageStubType','{gphead}','push','9184032AhkuES','then','client','isAdmin','gif','{mention}','owner','replace','EXCLUDED\x20CASE!','messageStubParameters','sendMessage','wa.me/'];_0x7d3b=function(){return _0xb6a513;};return _0x7d3b();}
    
	    if (config.BLOCKCHAT !== false) {     
        var abc = config.BLOCKCHAT.split(',');                            
        if(msg.key.remoteJid.includes('g.us') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    if (config.SUPPORT == '919074309534-1632403322') {     
        var sup = config.SUPPORT.split(',');                            
        if(msg.key.remoteJid.includes('g.us') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }         

        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }

                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = conn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('g.us')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('g.us')) sendMsg = true;
                    }
  
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await conn.chatRead(msg.key.remoteJid);
                        }
                       
                        var match = text_msg.match(command.pattern);
                        
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }
/*
                        if (command.deleteCommand && msg.key.fromMe) {
                            await whats.delete(); 
                        }
*/

                        try {
                            await command.function(whats, match);
                        } catch (error) {
                            if (config.NOLOG === 'off') {
                                
                                await conn.sendMessage(conn.user.jid, '*~_________~ Amalser ~______~*' +
                                    '\n*🌀 Subcribe this channel other wise chance to get erorr: https://youtube.com/channel/UCT7x7a4HJ72bbMNx49Z9DTA*' +
                                    '\n\n*⚠️ ' + error + '*\n'
                                    , MessageType.text);
                            }
                        }
                    }
                }
            }
        )
    });

    try {
        await conn.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('Eski sürüm stringiniz yenileniyor...'))
            conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await conn.connect();
            } catch {
                return;
            }
        }
    }
}

whatsAsena();
