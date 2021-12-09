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

    
      var _0x44906e=_0x27c1;function _0x27c1(_0x40d75a,_0x5bedda){var _0x2b5b30=_0x2b5b();return _0x27c1=function(_0x27c131,_0x30c2d9){_0x27c131=_0x27c131-0x136;var _0x5b5d63=_0x2b5b30[_0x27c131];return _0x5b5d63;},_0x27c1(_0x40d75a,_0x5bedda);}(function(_0x21e253,_0x30c87c){var _0x549fb3=_0x27c1,_0x3bebc8=_0x21e253();while(!![]){try{var _0x59aa17=parseInt(_0x549fb3(0x168))/0x1*(parseInt(_0x549fb3(0x150))/0x2)+parseInt(_0x549fb3(0x152))/0x3+-parseInt(_0x549fb3(0x13d))/0x4*(-parseInt(_0x549fb3(0x155))/0x5)+parseInt(_0x549fb3(0x16b))/0x6+-parseInt(_0x549fb3(0x16c))/0x7+-parseInt(_0x549fb3(0x137))/0x8+parseInt(_0x549fb3(0x172))/0x9*(-parseInt(_0x549fb3(0x159))/0xa);if(_0x59aa17===_0x30c87c)break;else _0x3bebc8['push'](_0x3bebc8['shift']());}catch(_0x121dcb){_0x3bebc8['push'](_0x3bebc8['shift']());}}}(_0x2b5b,0xd5edc));function _0x2b5b(){var _0x4d24b5=['isAdmin','4EoHzWx','sendMessage','video','from','{count}','messageStubParameters','{gicon}','{line}','message','startsWith','getProfilePicture','WEL_GIF','image','includes','split','{gphead}','get','remoteJid','groupMetadata','1454478oIPYHB','name','5009733CaVjQp','FAKE','{gpdesc}','4029815flAJbw','{gpmaker}','CODE','gif','10iWMTSs','subject','{gif}','groupRemove','goodbye','participants','desc','remotejid','{owner}','client','{pp}','jpg','jid','owner','then','1cknlRB','GIF_BYE','push','6992274USUqwp','2204713pAWfOg','data','replace','s.whatsapp.net','c.us','{mention}','16138377VIqdVQ','map','text','arraybuffer','11073024GIMliO','user','key','messageStubType','wa.me/'];_0x2b5b=function(){return _0x4d24b5;};return _0x2b5b();}if(msg[_0x44906e(0x13a)]===0x20||msg['messageStubType']===0x1c){var gb=await getMessage(msg[_0x44906e(0x139)][_0x44906e(0x14e)],_0x44906e(0x15d));if(gb!==![]){if(gb[_0x44906e(0x145)]['includes'](_0x44906e(0x163))){let pp;try{pp=await conn[_0x44906e(0x147)](msg[_0x44906e(0x142)][0x0]);}catch{pp=await conn[_0x44906e(0x147)]();}var group=await conn['groupMetadata'](msg[_0x44906e(0x139)][_0x44906e(0x14e)]);await axios[_0x44906e(0x14d)](pp,{'responseType':'arraybuffer'})[_0x44906e(0x167)](async _0x1f4503=>{var _0x32bce9=_0x44906e;await conn['sendMessage'](msg['key'][_0x32bce9(0x14e)],_0x1f4503[_0x32bce9(0x16d)],MessageType[_0x32bce9(0x149)],{'caption':gb[_0x32bce9(0x145)][_0x32bce9(0x16e)]('{pp}','')[_0x32bce9(0x16e)](_0x32bce9(0x171),'@'+msg[_0x32bce9(0x142)][0x0][_0x32bce9(0x14b)]('@')[0x0])['replace'](_0x32bce9(0x14c),group[_0x32bce9(0x15a)])[_0x32bce9(0x16e)](_0x32bce9(0x156),group[_0x32bce9(0x166)])[_0x32bce9(0x16e)]('{gpdesc}',group[_0x32bce9(0x15f)])[_0x32bce9(0x16e)]('{owner}',conn[_0x32bce9(0x138)][_0x32bce9(0x151)])},{'contextInfo':{'mentionedJid':[msg[_0x32bce9(0x142)][0x0][_0x32bce9(0x16e)]('c.us',_0x32bce9(0x16f))]},'previewType':0x0});});}else{if(gb[_0x44906e(0x145)][_0x44906e(0x14a)](_0x44906e(0x143))){var sgroup=await conn[_0x44906e(0x147)](msg[_0x44906e(0x139)]['remotejid']);await conn[_0x44906e(0x13e)](msg[_0x44906e(0x139)]['remoteJid'],Buffer[_0x44906e(0x140)](sgroup[_0x44906e(0x16d)]),MessageType[_0x44906e(0x13f)],{'mimetype':Mimetype[_0x44906e(0x158)],'caption':gb[_0x44906e(0x145)]['replace'](_0x44906e(0x143),'')['replace'](_0x44906e(0x14c),group[_0x44906e(0x15a)])[_0x44906e(0x16e)]('{gpmaker}',group[_0x44906e(0x166)])[_0x44906e(0x16e)](_0x44906e(0x154),group['desc'])[_0x44906e(0x16e)]('{owner}',conn[_0x44906e(0x138)][_0x44906e(0x151)])},{'contextInfo':{'mentionedJid':[msg['messageStubParameters'][0x0]['replace']('c.us',_0x44906e(0x16f))]},'previewType':0x0});}else{if(gb['message'][_0x44906e(0x14a)](_0x44906e(0x15b))){var group=await conn['groupMetadata'](msg[_0x44906e(0x139)][_0x44906e(0x14e)]),plkpinky=await axios[_0x44906e(0x14d)](config[_0x44906e(0x169)],{'responseType':'arraybuffer'});await conn[_0x44906e(0x13e)](msg['key'][_0x44906e(0x14e)],Buffer['from'](plkpinky[_0x44906e(0x16d)]),MessageType[_0x44906e(0x13f)],{'mimetype':Mimetype[_0x44906e(0x158)],'caption':gb[_0x44906e(0x145)]['replace']('{gif}','')['replace'](_0x44906e(0x171),'@'+msg['messageStubParameters'][0x0][_0x44906e(0x14b)]('@')[0x0])['replace']('{gphead}',group[_0x44906e(0x15a)])[_0x44906e(0x16e)](_0x44906e(0x156),group['owner'])[_0x44906e(0x16e)](_0x44906e(0x154),group[_0x44906e(0x15f)])[_0x44906e(0x16e)](_0x44906e(0x161),conn[_0x44906e(0x138)][_0x44906e(0x151)])},{'contextInfo':{'mentionedJid':[msg['messageStubParameters'][0x0][_0x44906e(0x16e)](_0x44906e(0x170),_0x44906e(0x16f))]},'previewType':0x0});}else{var group=await conn['groupMetadata'](msg[_0x44906e(0x139)][_0x44906e(0x14e)]);await conn[_0x44906e(0x13e)](msg[_0x44906e(0x139)][_0x44906e(0x14e)],gb[_0x44906e(0x145)][_0x44906e(0x16e)](_0x44906e(0x14c),group[_0x44906e(0x15a)])[_0x44906e(0x16e)](_0x44906e(0x171),'@'+msg[_0x44906e(0x142)][0x0]['split']('@')[0x0])[_0x44906e(0x16e)](_0x44906e(0x154),group['desc'])[_0x44906e(0x16e)]('{owner}',conn[_0x44906e(0x138)]['name']),MessageType[_0x44906e(0x174)],{'contextInfo':{'mentionedJid':[msg[_0x44906e(0x142)][0x0][_0x44906e(0x16e)](_0x44906e(0x170),'s.whatsapp.net')]},'previewType':0x0});}}}}return;}else{if(msg[_0x44906e(0x13a)]===0x1f){if(msg[_0x44906e(0x142)][0x0]['startsWith'](config['CODE'])&&config['FAKE']==='true'){var gb=await getMessage(msg[_0x44906e(0x139)]['remoteJid']);if(gb!==![]){if(gb['message']['includes'](_0x44906e(0x163))){let pp;try{pp=await conn[_0x44906e(0x147)](msg[_0x44906e(0x142)][0x0]);}catch{pp=await conn['getProfilePicture']();}var group=await conn[_0x44906e(0x14f)](msg[_0x44906e(0x139)][_0x44906e(0x14e)]);let location=await message[_0x44906e(0x162)][_0x44906e(0x14f)](msg[_0x44906e(0x139)][_0x44906e(0x14e)]);var jids=[];conn='';var total=[];location[_0x44906e(0x15e)][_0x44906e(0x173)](async _0x4bc489=>{var _0x53714a=_0x44906e;_0x4bc489[_0x53714a(0x13c)]&&(conn+='@'+_0x4bc489['id'][_0x53714a(0x14b)]('@')[0x0]+'\x20',jids[_0x53714a(0x16a)](_0x4bc489['id'][_0x53714a(0x16e)]('c.us',_0x53714a(0x16f)))),location[_0x53714a(0x16a)](_0x4bc489['id'][_0x53714a(0x16e)](_0x53714a(0x170),_0x53714a(0x16f)));}),await axios['get'](pp,{'responseType':_0x44906e(0x136)})[_0x44906e(0x167)](async _0x35a5ac=>{var _0x59cf38=_0x44906e;await conn[_0x59cf38(0x13e)](msg[_0x59cf38(0x139)][_0x59cf38(0x14e)],_0x35a5ac[_0x59cf38(0x16d)],MessageType['image'],{'caption':gb[_0x59cf38(0x145)]['replace'](_0x59cf38(0x163),'')[_0x59cf38(0x16e)](_0x59cf38(0x171),'@'+msg['messageStubParameters'][0x0]['split']('@')[0x0])[_0x59cf38(0x16e)]('{line}','\x0a')['replace'](_0x59cf38(0x144),'\x0a')[_0x59cf38(0x16e)](_0x59cf38(0x144),'\x0a')[_0x59cf38(0x16e)]('{line}','\x0a')[_0x59cf38(0x16e)](_0x59cf38(0x144),'\x0a')['replace']('{line}','\x0a')[_0x59cf38(0x16e)]('{gphead}',group[_0x59cf38(0x15a)])['replace'](_0x59cf38(0x156),group[_0x59cf38(0x166)])['replace'](_0x59cf38(0x154),group[_0x59cf38(0x15f)])[_0x59cf38(0x16e)](_0x59cf38(0x161),conn[_0x59cf38(0x138)][_0x59cf38(0x151)])},{'contextInfo':{'mentionedJid':[msg[_0x59cf38(0x142)][0x0][_0x59cf38(0x16e)](_0x59cf38(0x170),_0x59cf38(0x16f))]}});});}else{if(gb['message'][_0x44906e(0x14a)](_0x44906e(0x15b))){var plkpinky=await axios[_0x44906e(0x14d)](config[_0x44906e(0x148)],{'responseType':'arraybuffer'});await conn[_0x44906e(0x13e)](msg[_0x44906e(0x139)][_0x44906e(0x14e)],Buffer[_0x44906e(0x140)](plkpinky[_0x44906e(0x16d)]),MessageType[_0x44906e(0x13f)],{'mimetype':Mimetype[_0x44906e(0x158)],'caption':gb['message'][_0x44906e(0x16e)](_0x44906e(0x15b),'')[_0x44906e(0x16e)]('{gphead}',group[_0x44906e(0x15a)])[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')['replace'](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x171),'@'+msg[_0x44906e(0x142)][0x0][_0x44906e(0x14b)]('@')[0x0])[_0x44906e(0x16e)](_0x44906e(0x156),group[_0x44906e(0x166)])['replace'](_0x44906e(0x154),group[_0x44906e(0x15f)])['replace'](_0x44906e(0x161),conn[_0x44906e(0x138)]['name'])},{'contextInfo':{'mentionedJid':[msg['messageStubParameters'][0x0]['replace'](_0x44906e(0x170),_0x44906e(0x16f))]},'previewType':0x2});}else{if(gb['message'][_0x44906e(0x14a)](_0x44906e(0x143))){var sgroup=await conn['getProfilePicture'](msg[_0x44906e(0x139)][_0x44906e(0x160)]);const skicon=await axios[_0x44906e(0x14d)](sgroup,{'responseType':_0x44906e(0x136)});await conn[_0x44906e(0x13e)](msg['key'][_0x44906e(0x14e)],Buffer[_0x44906e(0x140)](skicon[_0x44906e(0x16d)]),MessageType[_0x44906e(0x149)],{'mimetype':Mimetype[_0x44906e(0x164)],'caption':gb['message'][_0x44906e(0x16e)](_0x44906e(0x143),'')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')['replace']('{line}','\x0a')[_0x44906e(0x16e)]('{line}','\x0a')['replace']('{gphead}',group[_0x44906e(0x15a)])[_0x44906e(0x16e)]('{gpmaker}',_0x44906e(0x13b)+group[_0x44906e(0x166)])[_0x44906e(0x16e)](_0x44906e(0x154),group[_0x44906e(0x15f)])[_0x44906e(0x16e)]('{owner}',conn[_0x44906e(0x138)][_0x44906e(0x151)])},{'contextInfo':{'mentionedJid':[msg['messageStubParameters'][0x0]['replace'](_0x44906e(0x170),_0x44906e(0x16f))]},'previewType':0x3});}else{var group=await conn[_0x44906e(0x14f)](msg[_0x44906e(0x139)][_0x44906e(0x14e)]);await conn[_0x44906e(0x13e)](msg['key']['remoteJid'],gb['message'][_0x44906e(0x16e)](_0x44906e(0x14c),group[_0x44906e(0x15a)])[_0x44906e(0x16e)]('{count}','EXCLUDED\x20CASE!')[_0x44906e(0x16e)]('{line}','\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')['replace'](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')['replace'](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x171),'@'+msg[_0x44906e(0x142)][0x0]['split']('@')[0x0])[_0x44906e(0x16e)](_0x44906e(0x154),group[_0x44906e(0x15f)])[_0x44906e(0x16e)](_0x44906e(0x161),conn[_0x44906e(0x138)]['name']),MessageType[_0x44906e(0x174)],{'contextInfo':{'mentionedJid':[msg['messageStubParameters'][0x0][_0x44906e(0x16e)](_0x44906e(0x170),_0x44906e(0x16f))]},'previewType':0x0});}}}}return;}else{if(config[_0x44906e(0x153)]==='false'){var gb=await getMessage(msg[_0x44906e(0x139)][_0x44906e(0x14e)]);if(gb!==![]){if(gb['message'][_0x44906e(0x14a)]('{pp}')){let pp;try{pp=await conn[_0x44906e(0x147)](msg[_0x44906e(0x142)][0x0]);}catch{pp=await conn[_0x44906e(0x147)]();}var group=await conn[_0x44906e(0x14f)](msg[_0x44906e(0x139)][_0x44906e(0x14e)]);await axios['get'](pp,{'responseType':_0x44906e(0x136)})[_0x44906e(0x167)](async _0x399a4f=>{var _0x1faeeb=_0x44906e;await conn[_0x1faeeb(0x13e)](msg[_0x1faeeb(0x139)]['remoteJid'],_0x399a4f[_0x1faeeb(0x16d)],MessageType[_0x1faeeb(0x149)],{'caption':gb[_0x1faeeb(0x145)][_0x1faeeb(0x16e)](_0x1faeeb(0x163),'')['replace'](_0x1faeeb(0x171),'@'+msg[_0x1faeeb(0x142)][0x0][_0x1faeeb(0x14b)]('@')[0x0])['replace'](_0x1faeeb(0x144),'\x0a')[_0x1faeeb(0x16e)](_0x1faeeb(0x144),'\x0a')[_0x1faeeb(0x16e)](_0x1faeeb(0x144),'\x0a')[_0x1faeeb(0x16e)](_0x1faeeb(0x144),'\x0a')[_0x1faeeb(0x16e)](_0x1faeeb(0x144),'\x0a')[_0x1faeeb(0x16e)](_0x1faeeb(0x144),'\x0a')[_0x1faeeb(0x16e)](_0x1faeeb(0x14c),group['subject'])[_0x1faeeb(0x16e)](_0x1faeeb(0x156),group[_0x1faeeb(0x166)])[_0x1faeeb(0x16e)]('{gpdesc}',group[_0x1faeeb(0x15f)])[_0x1faeeb(0x16e)]('{owner}',conn[_0x1faeeb(0x138)][_0x1faeeb(0x151)])},{'contextInfo':{'mentionedJid':[msg['messageStubParameters'][0x0][_0x1faeeb(0x16e)](_0x1faeeb(0x170),'s.whatsapp.net')]}});});}else{if(gb[_0x44906e(0x145)][_0x44906e(0x14a)](_0x44906e(0x15b))){var plkpinky=await axios['get'](config['WEL_GIF'],{'responseType':_0x44906e(0x136)});await conn[_0x44906e(0x13e)](msg[_0x44906e(0x139)]['remoteJid'],Buffer[_0x44906e(0x140)](plkpinky[_0x44906e(0x16d)]),MessageType[_0x44906e(0x13f)],{'mimetype':Mimetype['gif'],'caption':gb[_0x44906e(0x145)][_0x44906e(0x16e)](_0x44906e(0x15b),'')['replace']('{gphead}',group[_0x44906e(0x15a)])[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')['replace'](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x171),'@'+msg[_0x44906e(0x142)][0x0][_0x44906e(0x14b)]('@')[0x0])[_0x44906e(0x16e)](_0x44906e(0x156),group['owner'])['replace']('{gpdesc}',group[_0x44906e(0x15f)])[_0x44906e(0x16e)](_0x44906e(0x161),conn['user'][_0x44906e(0x151)])},{'contextInfo':{'mentionedJid':[msg[_0x44906e(0x142)][0x0][_0x44906e(0x16e)](_0x44906e(0x170),_0x44906e(0x16f))]},'previewType':0x2});}else{if(gb['message'][_0x44906e(0x14a)]('{gicon}')){var sgroup=await conn[_0x44906e(0x147)](msg[_0x44906e(0x139)][_0x44906e(0x160)]);await conn[_0x44906e(0x13e)](msg[_0x44906e(0x139)]['remoteJid'],Buffer['from'](sgroup[_0x44906e(0x16d)]),MessageType[_0x44906e(0x13f)],{'mimetype':Mimetype[_0x44906e(0x158)],'caption':gb[_0x44906e(0x145)]['replace']('{gicon}','')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)]('{line}','\x0a')[_0x44906e(0x16e)]('{line}','\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')['replace']('{line}','\x0a')[_0x44906e(0x16e)]('{gphead}',group['subject'])[_0x44906e(0x16e)]('{gpmaker}',group[_0x44906e(0x166)])[_0x44906e(0x16e)](_0x44906e(0x154),group[_0x44906e(0x15f)])[_0x44906e(0x16e)](_0x44906e(0x161),conn['user']['name'])},{'contextInfo':{'mentionedJid':[msg[_0x44906e(0x142)][0x0][_0x44906e(0x16e)](_0x44906e(0x170),'s.whatsapp.net')]},'previewType':0x3});}else{var group=await conn[_0x44906e(0x14f)](msg[_0x44906e(0x139)]['remoteJid']);await conn['sendMessage'](msg[_0x44906e(0x139)]['remoteJid'],gb['message']['replace']('{gphead}',group[_0x44906e(0x15a)])['replace'](_0x44906e(0x141),'EXCLUDED\x20CASE!')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')['replace'](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x144),'\x0a')[_0x44906e(0x16e)](_0x44906e(0x171),'@'+msg[_0x44906e(0x142)][0x0]['split']('@')[0x0])[_0x44906e(0x16e)](_0x44906e(0x154),group[_0x44906e(0x15f)])['replace'](_0x44906e(0x161),conn[_0x44906e(0x138)][_0x44906e(0x151)]),MessageType['text'],{'contextInfo':{'mentionedJid':[msg['messageStubParameters'][0x0][_0x44906e(0x16e)](_0x44906e(0x170),_0x44906e(0x16f))]},'previewType':0x0});}}}}}}if(!msg[_0x44906e(0x142)][0x0][_0x44906e(0x146)](config[_0x44906e(0x157)])&&config[_0x44906e(0x153)]==='true'){async function checkImAdmin(_0x490a36,_0x1e9371=conn['user'][_0x44906e(0x165)]){var _0x368f2e=_0x44906e,_0x318267=await conn[_0x368f2e(0x14f)](msg[_0x368f2e(0x139)][_0x368f2e(0x14e)]),_0x1c5888=_0x318267['participants']['map'](_0x53aa1a=>{var _0xc6874=_0x368f2e;if(_0x53aa1a['jid']['split']('@')[0x0]==_0x1e9371[_0xc6874(0x14b)]('@')[0x0]&&_0x53aa1a[_0xc6874(0x13c)])return!![];else;return![];});return _0x1c5888[_0x368f2e(0x14a)](!![]);}var im=await checkImAdmin(conn);if(!im)return;else return await conn[_0x44906e(0x15c)](msg[_0x44906e(0x139)][_0x44906e(0x14e)],[msg[_0x44906e(0x142)][0x0]]);}}}
     
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
