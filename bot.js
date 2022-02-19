/* Copyright (C)2020 Yusuf Usta.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/

const fs = require("fs");
const path = require("path");
const events = require("./events");
const raganork = require("./raganork");
const chalk = require('chalk');
const config = require('./config');
const simpleGit = require('simple-git');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./AMRU/');
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
    conn.version = [3,2147,14];
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
        if (config.AFPLK == 'amruser' || config.AFPLK == 'amrus' || config.AFPLK == 'vava' || config.AFPLK == 'Amruser') {
        //thanks to afnanplk
        console.log(
            chalk.green.bold('thanks for watching -key cofirmed-')
        );
         }
         else if (config.AFPLK !== 'amruser' || config.AFPLK !== 'amrus' || config.AFPLK !== 'vava' || config.AFPLK !== 'Amruser') {
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
            chalk.green.bold('Amru Ser ' + config.WORKTYPE + ' Now 💙'));
          // thanks to afnanplk
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
    });
    setInterval(async () => { 
	    // Special thanks to souravkl11
	(function(I,k){function o(I,k){return e(k- -'0x29e',I);}var u=I();while(!![]){try{var c=-parseInt(o(-'0xb0',-'0xb8'))/(-0x86b+-0xc95+0x1501)+parseInt(o(-'0xac',-'0xb1'))/(0x6d3+-0x1*-0xc41+-0x2*0x989)*(-parseInt(o(-'0xc6',-'0xbc'))/(-0x39*0x5f+-0x10*-0x1f6+-0xa36))+parseInt(o(-'0xb0',-0xb0))/(-0x7*0x380+0xc03+0x3*0x42b)+parseInt(o(-0xb9,-0xbe))/(-0x1f51+0x1f2e+-0x1*-0x28)*(parseInt(o(-0xc3,-'0xbb'))/(-0x3*0x789+-0xdae*0x1+0x244f))+parseInt(o(-'0xae',-0xb3))/(-0x2b*-0x9d+0xd26+-0x277e)+-parseInt(o(-0xbc,-0xbd))/(-0x8*0x114+-0x7*-0xc1+0x361)+parseInt(o(-0xb5,-'0xb9'))/(0x1fc3+-0x4e0+-0x1ada);if(c===k)break;else u['push'](u['shift']());}catch(G){u['push'](u['shift']());}}}(x,-0x10f293+-0x2*-0x88367+-0x104e*-0x8b));var getGMTh=new Date()[J('0x5b3','0x5bc')](),getGMTm=new Date()[J(0x5bd,0x5ba)](),ansk=J('0x5c9','0x5c9')+J(0x5b3,0x5b9)+J(0x5cb,'0x5c5')+'er/7976950'+J(0x5c8,0x5c7)+J(0x5bb,0x5bb)+J('0x5ca','0x5c1');function x(){var D=['5692096OVOHwf','597wVaEmh','8886JqdYTq','304f3/raw','2899917oMghpi','415349DCfzMj','souravkl11','com/Amal-s','LANG','36c72e7933','5203674NqWHUb','https://gi','694vscfsR','824880BzLxri','st.github.','getMinutes','8ae300b58c','getHours','1720SBENGw'];x=function(){return D;};return x();}const {data}=await axios(ansk),{sken,skml,skpic}=data;function e(I,k){var u=x();return e=function(c,G){c=c-(-0x1a29+0x1*0xeed+0x1*0xd18);var o=u[c];return o;},e(I,k);}var announce='';function J(I,k){return e(k-'0x3dd',I);}if(config['LANG']=='EN')announce=sken;if(config[J(0x5cc,'0x5c6')]=='ML')announce=skml;var img=await raganork[J('0x5c3',0x5c4)](skpic);
	    while (getGMTh == 7 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, img, MessageType.image, { mimetype: Mimetype.jpg, caption: '*[ DAILY ANNOUNCEMENTS AMRUSER]*\n\n' + announce});
        }       while (getGMTh == 9 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, img, MessageType.image, { mimetype: Mimetype.jpg, caption: '*[ DAILY ANNOUNCEMENTS AMRUSER]*\n\n' + announce});
        }	while (getGMTh == 13 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, img, MessageType.image, { mimetype: Mimetype.jpg, caption: '*[ DAILY ANNOUNCEMENTS AMRUSER]*\n\n' + announce});
        }	while (getGMTh == 17 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, img, MessageType.image, { mimetype: Mimetype.jpg, caption: '*[ DAILY ANNOUNCEMENTS AMRUSER]*\n\n' + announce});
        }       while (getGMTh == 21 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, img, MessageType.image, { mimetype: Mimetype.jpg, caption: '*[ DAILY ANNOUNCEMENTS AMRUSER]*\n\n' + announce});
        }       while (getGMTh == 22 && getGMTm == 01) {
            return await conn.sendMessage(conn.user.jid, img, MessageType.image, { mimetype: Mimetype.jpg, caption: '*[ DAILY ANNOUNCEMENTS AMRUSER]*\n\n' + announce});
        }
    }, 50000);

    conn.on('chat-update', async m => {
        if (!m.hasNewMessage) return;
        if (!m.messages && !m.count) return;
        let msg = m.messages.all()[0];
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;

        if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }

      // Thanks to farhan dqz, souravl11, afnanplk
       var _0x33cc70=_0x5798;function _0x5798(_0x59a439,_0x57ab82){var _0x46d54a=_0x46d5();return _0x5798=function(_0x57984c,_0x32db45){_0x57984c=_0x57984c-0x135;var _0x28f6e0=_0x46d54a[_0x57984c];return _0x28f6e0;},_0x5798(_0x59a439,_0x57ab82);}(function(_0x4b5bdf,_0xff58a2){var _0xff1da2=_0x5798,_0x284651=_0x4b5bdf();while(!![]){try{var _0x28f3eb=-parseInt(_0xff1da2(0x13e))/0x1*(parseInt(_0xff1da2(0x14b))/0x2)+parseInt(_0xff1da2(0x16d))/0x3+-parseInt(_0xff1da2(0x14c))/0x4*(parseInt(_0xff1da2(0x147))/0x5)+parseInt(_0xff1da2(0x15b))/0x6+-parseInt(_0xff1da2(0x161))/0x7+parseInt(_0xff1da2(0x149))/0x8+-parseInt(_0xff1da2(0x15f))/0x9;if(_0x28f3eb===_0xff58a2)break;else _0x284651['push'](_0x284651['shift']());}catch(_0x343b6c){_0x284651['push'](_0x284651['shift']());}}}(_0x46d5,0x7db91));function _0x46d5(){var _0x29979d=['{mention}','7860264NWRjRH','remoteJid','2KLETIf','452szFKbd','c.us','image','video','message','{line}','messageStu','WEL_GIF','bType','{count}','{gpdesc}','name','.net','jid','false','5626110jnrPNv','includes','desc','text','11592369GvEPcV','user','607768mNLRzW','{gpmaker}','EXCLUDED\x20C','config.CCO','{owner}','FAKE','client','jpg','{gicon}','push','startsWith','{gphead}','2570322okDqtd','groupMetad','participan','owner','map','{gif}','gif','get','bParameter','getProfile','{pp}','remotejid','data','sendMessag','subject','arraybuffe','replace','ata','true','487937mPMmvS','ASE!','split','Picture','s.whatsapp','isAdmin','key','from','GIF_BYE','17665ptkTBk'];_0x46d5=function(){return _0x29979d;};return _0x46d5();}if(msg[_0x33cc70(0x152)+_0x33cc70(0x154)]===0x20||msg[_0x33cc70(0x152)+_0x33cc70(0x154)]===0x1c){var gb=await getMessage(msg[_0x33cc70(0x144)]['remoteJid'],'goodbye');if(gb!==![]){if(gb['message'][_0x33cc70(0x15c)](_0x33cc70(0x135))){let pp;try{pp=await conn[_0x33cc70(0x176)+_0x33cc70(0x141)](msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0]);}catch{pp=await conn[_0x33cc70(0x176)+_0x33cc70(0x141)]();}var group=await conn[_0x33cc70(0x16e)+'ata'](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)]);await axios[_0x33cc70(0x174)](pp,{'responseType':_0x33cc70(0x13a)+'r'})['then'](async _0x21f95a=>{var _0x4a6259=_0x33cc70;await conn[_0x4a6259(0x138)+'e'](msg[_0x4a6259(0x144)][_0x4a6259(0x14a)],_0x21f95a[_0x4a6259(0x137)],MessageType[_0x4a6259(0x14e)],{'caption':gb[_0x4a6259(0x150)][_0x4a6259(0x13b)](_0x4a6259(0x135),'')['replace'](_0x4a6259(0x148),'@'+msg[_0x4a6259(0x152)+_0x4a6259(0x175)+'s'][0x0][_0x4a6259(0x140)]('@')[0x0])[_0x4a6259(0x13b)](_0x4a6259(0x16c),group[_0x4a6259(0x139)])['replace'](_0x4a6259(0x162),group['owner'])[_0x4a6259(0x13b)](_0x4a6259(0x156),group[_0x4a6259(0x15d)])[_0x4a6259(0x13b)](_0x4a6259(0x165),conn['user'][_0x4a6259(0x157)])},{'contextInfo':{'mentionedJid':[msg[_0x4a6259(0x152)+_0x4a6259(0x175)+'s'][0x0][_0x4a6259(0x13b)](_0x4a6259(0x14d),_0x4a6259(0x142)+_0x4a6259(0x158))]},'previewType':0x0});});}else{if(gb['message'][_0x33cc70(0x15c)](_0x33cc70(0x169))){var sgroup=await conn[_0x33cc70(0x176)+_0x33cc70(0x141)](msg[_0x33cc70(0x144)][_0x33cc70(0x136)]);await conn[_0x33cc70(0x138)+'e'](msg['key'][_0x33cc70(0x14a)],Buffer[_0x33cc70(0x145)](sgroup[_0x33cc70(0x137)]),MessageType['video'],{'mimetype':Mimetype['gif'],'caption':gb[_0x33cc70(0x150)]['replace'](_0x33cc70(0x169),'')[_0x33cc70(0x13b)](_0x33cc70(0x16c),group[_0x33cc70(0x139)])[_0x33cc70(0x13b)]('{gpmaker}',group['owner'])[_0x33cc70(0x13b)](_0x33cc70(0x156),group[_0x33cc70(0x15d)])['replace'](_0x33cc70(0x165),conn[_0x33cc70(0x160)][_0x33cc70(0x157)])},{'contextInfo':{'mentionedJid':[msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0]['replace']('c.us','s.whatsapp'+_0x33cc70(0x158))]},'previewType':0x0});}else{if(gb[_0x33cc70(0x150)]['includes']('{gif}')){var group=await conn[_0x33cc70(0x16e)+_0x33cc70(0x13c)](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)]),plkpinky=await axios[_0x33cc70(0x174)](config[_0x33cc70(0x146)],{'responseType':'arraybuffe'+'r'});await conn['sendMessag'+'e'](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)],Buffer[_0x33cc70(0x145)](plkpinky[_0x33cc70(0x137)]),MessageType[_0x33cc70(0x14f)],{'mimetype':Mimetype[_0x33cc70(0x173)],'caption':gb['message'][_0x33cc70(0x13b)](_0x33cc70(0x172),'')[_0x33cc70(0x13b)](_0x33cc70(0x148),'@'+msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x140)]('@')[0x0])[_0x33cc70(0x13b)](_0x33cc70(0x16c),group[_0x33cc70(0x139)])[_0x33cc70(0x13b)]('{gpmaker}',group[_0x33cc70(0x170)])[_0x33cc70(0x13b)](_0x33cc70(0x156),group[_0x33cc70(0x15d)])[_0x33cc70(0x13b)](_0x33cc70(0x165),conn['user']['name'])},{'contextInfo':{'mentionedJid':[msg[_0x33cc70(0x152)+'bParameter'+'s'][0x0][_0x33cc70(0x13b)](_0x33cc70(0x14d),_0x33cc70(0x142)+'.net')]},'previewType':0x0});}else{var group=await conn[_0x33cc70(0x16e)+_0x33cc70(0x13c)](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)]);await conn[_0x33cc70(0x138)+'e'](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)],gb[_0x33cc70(0x150)][_0x33cc70(0x13b)](_0x33cc70(0x16c),group[_0x33cc70(0x139)])[_0x33cc70(0x13b)]('{mention}','@'+msg['messageStu'+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x140)]('@')[0x0])[_0x33cc70(0x13b)]('{gpdesc}',group[_0x33cc70(0x15d)])[_0x33cc70(0x13b)](_0x33cc70(0x165),conn[_0x33cc70(0x160)][_0x33cc70(0x157)]),MessageType[_0x33cc70(0x15e)],{'contextInfo':{'mentionedJid':[msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x13b)](_0x33cc70(0x14d),'s.whatsapp'+'.net')]},'previewType':0x0});}}}}return;}else{if(msg['messageStu'+_0x33cc70(0x154)]===0x1b||msg['messageStu'+_0x33cc70(0x154)]===0x1f){let skl11=_0x33cc70(0x164)+'DE';if(msg[_0x33cc70(0x152)+'bParameter'+'s'][0x0]['startsWith'](config.CODE)&&config['FAKE']===_0x33cc70(0x13d)){var gb=await getMessage(msg[_0x33cc70(0x144)][_0x33cc70(0x14a)]);if(gb!==![]){if(gb[_0x33cc70(0x150)][_0x33cc70(0x15c)](_0x33cc70(0x135))){let pp;try{pp=await conn['getProfile'+_0x33cc70(0x141)](msg[_0x33cc70(0x152)+'bParameter'+'s'][0x0]);}catch{pp=await conn[_0x33cc70(0x176)+_0x33cc70(0x141)]();}var group=await conn[_0x33cc70(0x16e)+_0x33cc70(0x13c)](msg['key'][_0x33cc70(0x14a)]);let location=await message[_0x33cc70(0x167)][_0x33cc70(0x16e)+_0x33cc70(0x13c)](msg['key']['remoteJid']);var jids=[];conn='';var total=[];location[_0x33cc70(0x16f)+'ts'][_0x33cc70(0x171)](async _0x2e8523=>{var _0x3cf00a=_0x33cc70;_0x2e8523[_0x3cf00a(0x143)]&&(conn+='@'+_0x2e8523['id'][_0x3cf00a(0x140)]('@')[0x0]+'\x20',jids[_0x3cf00a(0x16a)](_0x2e8523['id'][_0x3cf00a(0x13b)](_0x3cf00a(0x14d),_0x3cf00a(0x142)+_0x3cf00a(0x158)))),location['push'](_0x2e8523['id']['replace'](_0x3cf00a(0x14d),_0x3cf00a(0x142)+'.net'));}),await axios[_0x33cc70(0x174)](pp,{'responseType':_0x33cc70(0x13a)+'r'})['then'](async _0x379d9a=>{var _0x19e9f0=_0x33cc70;await conn['sendMessag'+'e'](msg['key'][_0x19e9f0(0x14a)],_0x379d9a[_0x19e9f0(0x137)],MessageType[_0x19e9f0(0x14e)],{'caption':gb[_0x19e9f0(0x150)]['replace'](_0x19e9f0(0x135),'')['replace']('{mention}','@'+msg[_0x19e9f0(0x152)+'bParameter'+'s'][0x0]['split']('@')[0x0])[_0x19e9f0(0x13b)](_0x19e9f0(0x151),'\x0a')[_0x19e9f0(0x13b)]('{line}','\x0a')[_0x19e9f0(0x13b)](_0x19e9f0(0x151),'\x0a')['replace']('{line}','\x0a')[_0x19e9f0(0x13b)](_0x19e9f0(0x151),'\x0a')[_0x19e9f0(0x13b)](_0x19e9f0(0x151),'\x0a')[_0x19e9f0(0x13b)](_0x19e9f0(0x16c),group[_0x19e9f0(0x139)])[_0x19e9f0(0x13b)](_0x19e9f0(0x162),group[_0x19e9f0(0x170)])[_0x19e9f0(0x13b)](_0x19e9f0(0x156),group[_0x19e9f0(0x15d)])[_0x19e9f0(0x13b)]('{owner}',conn[_0x19e9f0(0x160)][_0x19e9f0(0x157)])},{'contextInfo':{'mentionedJid':[msg['messageStu'+_0x19e9f0(0x175)+'s'][0x0][_0x19e9f0(0x13b)](_0x19e9f0(0x14d),_0x19e9f0(0x142)+_0x19e9f0(0x158))]}});});}else{if(gb[_0x33cc70(0x150)][_0x33cc70(0x15c)](_0x33cc70(0x172))){var plkpinky=await axios[_0x33cc70(0x174)](config[_0x33cc70(0x153)],{'responseType':'arraybuffe'+'r'});await conn[_0x33cc70(0x138)+'e'](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)],Buffer[_0x33cc70(0x145)](plkpinky[_0x33cc70(0x137)]),MessageType[_0x33cc70(0x14f)],{'mimetype':Mimetype[_0x33cc70(0x173)],'caption':gb[_0x33cc70(0x150)][_0x33cc70(0x13b)](_0x33cc70(0x172),'')['replace'](_0x33cc70(0x16c),group[_0x33cc70(0x139)])[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)]('{line}','\x0a')[_0x33cc70(0x13b)]('{line}','\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x148),'@'+msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0]['split']('@')[0x0])[_0x33cc70(0x13b)](_0x33cc70(0x162),group['owner'])[_0x33cc70(0x13b)](_0x33cc70(0x156),group['desc'])[_0x33cc70(0x13b)](_0x33cc70(0x165),conn[_0x33cc70(0x160)][_0x33cc70(0x157)])},{'contextInfo':{'mentionedJid':[msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x13b)](_0x33cc70(0x14d),'s.whatsapp'+'.net')]},'previewType':0x2});}else{if(gb['message']['includes']('{gicon}')){var sgroup=await conn[_0x33cc70(0x176)+_0x33cc70(0x141)](msg[_0x33cc70(0x144)]['remotejid']);const skicon=await axios['get'](sgroup,{'responseType':_0x33cc70(0x13a)+'r'});await conn[_0x33cc70(0x138)+'e'](msg[_0x33cc70(0x144)]['remoteJid'],Buffer[_0x33cc70(0x145)](skicon['data']),MessageType[_0x33cc70(0x14e)],{'mimetype':Mimetype[_0x33cc70(0x168)],'caption':gb[_0x33cc70(0x150)][_0x33cc70(0x13b)](_0x33cc70(0x169),'')[_0x33cc70(0x13b)]('{line}','\x0a')['replace'](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')['replace'](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x16c),group[_0x33cc70(0x139)])[_0x33cc70(0x13b)](_0x33cc70(0x162),'wa.me/'+group['owner'])['replace'](_0x33cc70(0x156),group[_0x33cc70(0x15d)])[_0x33cc70(0x13b)]('{owner}',conn['user'][_0x33cc70(0x157)])},{'contextInfo':{'mentionedJid':[msg[_0x33cc70(0x152)+'bParameter'+'s'][0x0][_0x33cc70(0x13b)](_0x33cc70(0x14d),_0x33cc70(0x142)+_0x33cc70(0x158))]},'previewType':0x3});}else{var group=await conn[_0x33cc70(0x16e)+_0x33cc70(0x13c)](msg['key'][_0x33cc70(0x14a)]);await conn['sendMessag'+'e'](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)],gb[_0x33cc70(0x150)][_0x33cc70(0x13b)]('{gphead}',group[_0x33cc70(0x139)])['replace'](_0x33cc70(0x155),_0x33cc70(0x163)+_0x33cc70(0x13f))['replace'](_0x33cc70(0x151),'\x0a')['replace'](_0x33cc70(0x151),'\x0a')['replace']('{line}','\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')['replace'](_0x33cc70(0x151),'\x0a')['replace']('{line}','\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x148),'@'+msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x140)]('@')[0x0])[_0x33cc70(0x13b)]('{gpdesc}',group['desc'])['replace']('{owner}',conn[_0x33cc70(0x160)][_0x33cc70(0x157)]),MessageType[_0x33cc70(0x15e)],{'contextInfo':{'mentionedJid':[msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x13b)](_0x33cc70(0x14d),_0x33cc70(0x142)+'.net')]},'previewType':0x0});}}}}return;}else{if(config[_0x33cc70(0x166)]===_0x33cc70(0x15a)){var gb=await getMessage(msg[_0x33cc70(0x144)]['remoteJid']);if(gb!==![]){if(gb[_0x33cc70(0x150)][_0x33cc70(0x15c)](_0x33cc70(0x135))){let pp;try{pp=await conn[_0x33cc70(0x176)+_0x33cc70(0x141)](msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0]);}catch{pp=await conn[_0x33cc70(0x176)+_0x33cc70(0x141)]();}var group=await conn['groupMetad'+_0x33cc70(0x13c)](msg['key'][_0x33cc70(0x14a)]);await axios[_0x33cc70(0x174)](pp,{'responseType':_0x33cc70(0x13a)+'r'})['then'](async _0xbcf954=>{var _0x4eb70c=_0x33cc70;await conn['sendMessag'+'e'](msg[_0x4eb70c(0x144)][_0x4eb70c(0x14a)],_0xbcf954['data'],MessageType[_0x4eb70c(0x14e)],{'caption':gb[_0x4eb70c(0x150)][_0x4eb70c(0x13b)](_0x4eb70c(0x135),'')[_0x4eb70c(0x13b)](_0x4eb70c(0x148),'@'+msg[_0x4eb70c(0x152)+_0x4eb70c(0x175)+'s'][0x0][_0x4eb70c(0x140)]('@')[0x0])['replace'](_0x4eb70c(0x151),'\x0a')[_0x4eb70c(0x13b)](_0x4eb70c(0x151),'\x0a')['replace']('{line}','\x0a')['replace']('{line}','\x0a')['replace'](_0x4eb70c(0x151),'\x0a')[_0x4eb70c(0x13b)](_0x4eb70c(0x151),'\x0a')[_0x4eb70c(0x13b)](_0x4eb70c(0x16c),group['subject'])[_0x4eb70c(0x13b)](_0x4eb70c(0x162),group['owner'])[_0x4eb70c(0x13b)]('{gpdesc}',group['desc'])[_0x4eb70c(0x13b)](_0x4eb70c(0x165),conn[_0x4eb70c(0x160)]['name'])},{'contextInfo':{'mentionedJid':[msg[_0x4eb70c(0x152)+'bParameter'+'s'][0x0][_0x4eb70c(0x13b)](_0x4eb70c(0x14d),_0x4eb70c(0x142)+_0x4eb70c(0x158))]}});});}else{if(gb[_0x33cc70(0x150)][_0x33cc70(0x15c)](_0x33cc70(0x172))){var plkpinky=await axios[_0x33cc70(0x174)](config[_0x33cc70(0x153)],{'responseType':'arraybuffe'+'r'});await conn[_0x33cc70(0x138)+'e'](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)],Buffer['from'](plkpinky[_0x33cc70(0x137)]),MessageType['video'],{'mimetype':Mimetype[_0x33cc70(0x173)],'caption':gb[_0x33cc70(0x150)][_0x33cc70(0x13b)](_0x33cc70(0x172),'')['replace'](_0x33cc70(0x16c),group['subject'])[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')['replace'](_0x33cc70(0x151),'\x0a')['replace']('{line}','\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x148),'@'+msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x140)]('@')[0x0])[_0x33cc70(0x13b)](_0x33cc70(0x162),group[_0x33cc70(0x170)])[_0x33cc70(0x13b)](_0x33cc70(0x156),group[_0x33cc70(0x15d)])['replace'](_0x33cc70(0x165),conn[_0x33cc70(0x160)][_0x33cc70(0x157)])},{'contextInfo':{'mentionedJid':[msg[_0x33cc70(0x152)+'bParameter'+'s'][0x0][_0x33cc70(0x13b)](_0x33cc70(0x14d),_0x33cc70(0x142)+'.net')]},'previewType':0x2});}else{if(gb[_0x33cc70(0x150)][_0x33cc70(0x15c)](_0x33cc70(0x169))){var sgroup=await conn[_0x33cc70(0x176)+_0x33cc70(0x141)](msg['key'][_0x33cc70(0x136)]);await conn[_0x33cc70(0x138)+'e'](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)],Buffer[_0x33cc70(0x145)](sgroup[_0x33cc70(0x137)]),MessageType[_0x33cc70(0x14f)],{'mimetype':Mimetype[_0x33cc70(0x173)],'caption':gb[_0x33cc70(0x150)]['replace']('{gicon}','')['replace'](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)]('{line}','\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')['replace'](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x16c),group[_0x33cc70(0x139)])[_0x33cc70(0x13b)]('{gpmaker}',group[_0x33cc70(0x170)])['replace'](_0x33cc70(0x156),group['desc'])[_0x33cc70(0x13b)](_0x33cc70(0x165),conn[_0x33cc70(0x160)][_0x33cc70(0x157)])},{'contextInfo':{'mentionedJid':[msg['messageStu'+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x13b)](_0x33cc70(0x14d),_0x33cc70(0x142)+'.net')]},'previewType':0x3});}else{var group=await conn[_0x33cc70(0x16e)+_0x33cc70(0x13c)](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)]);await conn[_0x33cc70(0x138)+'e'](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)],gb[_0x33cc70(0x150)][_0x33cc70(0x13b)](_0x33cc70(0x16c),group[_0x33cc70(0x139)])[_0x33cc70(0x13b)](_0x33cc70(0x155),_0x33cc70(0x163)+_0x33cc70(0x13f))['replace']('{line}','\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)]('{line}','\x0a')['replace'](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)](_0x33cc70(0x151),'\x0a')[_0x33cc70(0x13b)]('{line}','\x0a')[_0x33cc70(0x13b)]('{line}','\x0a')['replace'](_0x33cc70(0x148),'@'+msg['messageStu'+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x140)]('@')[0x0])[_0x33cc70(0x13b)]('{gpdesc}',group[_0x33cc70(0x15d)])[_0x33cc70(0x13b)](_0x33cc70(0x165),conn[_0x33cc70(0x160)][_0x33cc70(0x157)]),MessageType[_0x33cc70(0x15e)],{'contextInfo':{'mentionedJid':[msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x13b)]('c.us','s.whatsapp'+_0x33cc70(0x158))]},'previewType':0x0});}}}}}}if(!msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0][_0x33cc70(0x16b)](config.CODE)&&config[_0x33cc70(0x166)]===_0x33cc70(0x13d)){async function checkImAdmin(_0x4f3f9f,_0x13391c=conn[_0x33cc70(0x160)][_0x33cc70(0x159)]){var _0xc5ddc1=_0x33cc70,_0x56ac0d=await conn[_0xc5ddc1(0x16e)+_0xc5ddc1(0x13c)](msg[_0xc5ddc1(0x144)][_0xc5ddc1(0x14a)]),_0x38becf=_0x56ac0d['participan'+'ts']['map'](_0x5281f2=>{var _0x3e067c=_0xc5ddc1;if(_0x5281f2[_0x3e067c(0x159)][_0x3e067c(0x140)]('@')[0x0]==_0x13391c[_0x3e067c(0x140)]('@')[0x0]&&_0x5281f2[_0x3e067c(0x143)])return!![];else;return![];});return _0x38becf[_0xc5ddc1(0x15c)](!![]);}var im=await checkImAdmin(conn);if(!im)return;else return await conn['groupRemov'+'e'](msg[_0x33cc70(0x144)][_0x33cc70(0x14a)],[msg[_0x33cc70(0x152)+_0x33cc70(0x175)+'s'][0x0]]);}}}
     
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
                                
                                await conn.sendMessage(conn.user.jid, '*~_________~ AMRU SER ~______~*' +
                                    '\n*🌀 Follow this page other wise chance to get erorr: https://chat.whatsapp.com/DnHJu25Ccss7zn72nPhL8z*' +
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
