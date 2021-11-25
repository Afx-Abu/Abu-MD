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
        if (config.AFPLK == 'AFAMK' || config.AFPLK == 'afamk' || config.AFPLK == 'Afamk' || config.AFPLK == 'pinky') {
        //thanks to afnanplk
        console.log(
            chalk.green.bold('thanks for watching -key cofirmed-')
        );
         }
         else if (config.AFPLK !== 'AFAMK' || config.AFPLK !== 'afamk' || config.AFPLK !== 'Afamk' || config.AFPLK !== 'pinky') {
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
        var getGMTh = new Date().getHours()
        var getGMTm = new Date().getMinutes()
        var ansk = 'https://gist.github.com/Amal-ser/797695036c72e79338ae300b58c304f3/raw'
         
        while (getGMTh == 9 && getGMTm == 01) {
            const {data} = await axios(ansk)
            const { sken, skml } = data
               //Thanks to souravkl11         
            var announce = ''
            if (config.LANG == 'EN') announce = sken
            if (config.LANG == 'ML') announce = skml
            
            return await conn.sendMessage(conn.user.jid, '*[ DAILY ANNOUNCEMENTS ]*\n\n' + announce, MessageType.text);
        }
		while (getGMTh == 13 && getGMTm == 01) {
            const {data} = await axios(ansk)
            const { sken, skml } = data
                        
            var announce = ''
            if (config.LANG == 'EN') announce = sken
            if (config.LANG == 'ML') announce = skml
            
            return await conn.sendMessage(conn.user.jid, '*[ DAILY ANNOUNCEMENTS ]*\n\n' + announce, MessageType.text);
        }
		while (getGMTh == 17 && getGMTm == 01) {
            const {data} = await axios(ansk)
            const { sken, skml } = data
                  
            var announce = ''
            if (config.LANG == 'EN') announce = sken
            if (config.LANG == 'ML') announce = skml
            
            return await conn.sendMessage(conn.user.jid, '*[ DAILY ANNOUNCEMENTS ]*\n\n' + announce, MessageType.text);
        }
		while (getGMTh == 21 && getGMTm == 01) {
            const {data} = await axios(ansk)
            const { sken, skml } = data
                      
            var announce = ''
            if (config.LANG == 'EN') announce = sken
            if (config.LANG == 'ML') announce = skml
            
            return await conn.sendMessage(conn.user.jid, '*[ DAILY ANNOUNCEMENTS ]*\n\n' + announce, MessageType.text);
        }
    }, 50000);//Thanks to souravkl11

    conn.on('chat-update', async m => {
        if (!m.hasNewMessage) return;
        if (!m.messages && !m.count) return;
        let msg = m.messages.all()[0];
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;

        if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }

    
        if (msg.messageStubType === 32 || msg.messageStubType === 28) {
            // Participant leaving/removal message
            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            if (gb !== false) {
                if (gb.message.includes('{pp}')) {
                let pp 
                try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                 var group = await conn.groupMetadata(msg.key.remoteJid)
                await axios.get(pp, {responseType: 'arraybuffer'}).then(async (profile) => {
                await conn.sendMessage(msg.key.remoteJid, profile.data, MessageType.image, {caption:  gb.message.replace('{pp}', '').replace('{mention}', '@' + msg.messageStubParameters[0].split('@')[0]).replace('{gphead}', group.subject).replace('{gpmaker}', group.owner).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name) }, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}, previewType: 0}); });                           
            } else if (gb.message.includes('{gicon}')) {
                var sgroup = await conn.getProfilePicture(msg.key.remotejid)
                await conn.sendMessage(msg.key.remoteJid, Buffer.from(sgroup.data), MessageType.video, {mimetype: Mimetype.gif, caption: gb.message.replace('{gicon}', '').replace('{gphead}', group.subject).replace('{gpmaker}', group.owner).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name) }, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}, previewType: 0});
            }
                else if (gb.message.includes('{gif}')) {
                var group = await conn.groupMetadata(msg.key.remoteJid)
                
                    var plkpinky = await axios.get(config.GIF_BYE, { responseType: 'arraybuffer' })
                await conn.sendMessage(msg.key.remoteJid, Buffer.from(plkpinky.data), MessageType.video, {mimetype: Mimetype.gif, caption: gb.message.replace('{gif}', '').replace('{mention}', '@' + msg.messageStubParameters[0].split('@')[0]).replace('{gphead}', group.subject).replace('{gpmaker}', group.owner).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name) }, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}, previewType: 0});
            } else {
                var group = await conn.groupMetadata(msg.key.remoteJid)
                   await conn.sendMessage(msg.key.remoteJid,gb.message.replace('{gphead}', group.subject).replace('{mention}', '@' + msg.messageStubParameters[0].split('@')[0]).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name), MessageType.text, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}, previewType: 0});
            }
          }  //thanks to farhan      
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
            // If anti fake is true, exclude members with fake and send response to given country code! 
        let skl11 = `config.CCODE`    
	if (msg.messageStubParameters[0].startsWith('91') && config.FAKE === 'true') {
			   
			var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                if (gb.message.includes('{pp}')) {
                let pp
                try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                var group = await conn.groupMetadata(msg.key.remoteJid)
                let location = await message.client.groupMetadata(msg.key.remoteJid);
				var jids = [];
                conn = '';	
				var total = [];
            location['participants'].map(async (member) => {
                if (member.isAdmin) {
                    raganork += '@' + member.id.split('@')[0] + ' ';
                    jids.push(member.id.replace('c.us', 's.whatsapp.net'));
                }
                location.push(member.id.replace('c.us', 's.whatsapp.net'));
            });
					await axios.get(pp, {responseType: 'arraybuffer'}).then(async (profile) => {
                    
                await conn.sendMessage(msg.key.remoteJid, profile.data, MessageType.image, {caption:  gb.message.replace('{pp}', '').replace('{mention}', '@' + msg.messageStubParameters[0].split('@')[0]).replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{gphead}', group.subject).replace('{gpmaker}', group.owner).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name) }, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}}); });                           
            } else if (gb.message.includes('{gif}')) {
                var plkpinky = await axios.get(config.WEL_GIF, { responseType: 'arraybuffer' })
                await conn.sendMessage(msg.key.remoteJid, Buffer.from(plkpinky.data), MessageType.video, {mimetype: Mimetype.gif, caption: gb.message.replace('{gif}', '').replace('{gphead}', group.subject).replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{mention}', '@' + msg.messageStubParameters[0].split('@')[0]).replace('{gpmaker}', group.owner).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name) }, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}, previewType: 2});
            } else if (gb.message.includes('{gicon}')) {
                var sgroup = await conn.getProfilePicture(msg.key.remotejid)
                const skicon = await axios.get(sgroup, {responseType: 'arraybuffer'})
				await conn.sendMessage(msg.key.remoteJid, Buffer.from(skicon.data), MessageType.image, {mimetype: Mimetype.jpg, caption: gb.message.replace('{gicon}', '').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{gphead}', group.subject).replace('{gpmaker}', 'wa.me/' + group.owner).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name) }, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}, previewType: 3});
            } else {
                   var group = await conn.groupMetadata(msg.key.remoteJid)
                   await conn.sendMessage(msg.key.remoteJid,gb.message.replace('{gphead}', group.subject).replace('{count}', 'EXCLUDED CASE!').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{mention}', '@' + msg.messageStubParameters[0].split('@')[0]).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name), MessageType.text, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}, previewType: 0});
            }
			
          }
			
            return;                               
    }
			// If anti fake is false, send response to all members 
            else if (config.FAKE === 'false') {
				// Get information from Greetings database - Implemented for Whatsasena by Yusuf usta
                var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                if (gb.message.includes('{pp}')) {
                let pp
                try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                var group = await conn.groupMetadata(msg.key.remoteJid)
                
					await axios.get(pp, {responseType: 'arraybuffer'}).then(async (profile) => {
                    
                await conn.sendMessage(msg.key.remoteJid, profile.data, MessageType.image, {caption:  gb.message.replace('{pp}', '').replace('{mention}', '@' + msg.messageStubParameters[0].split('@')[0]).replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{gphead}', group.subject).replace('{gpmaker}', group.owner).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name) }, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}}); });                           
            } else if (gb.message.includes('{gif}')) {
                var plkpinky = await axios.get(config.WEL_GIF, { responseType: 'arraybuffer' })
                await conn.sendMessage(msg.key.remoteJid, Buffer.from(plkpinky.data), MessageType.video, {mimetype: Mimetype.gif, caption: gb.message.replace('{gif}', '').replace('{gphead}', group.subject).replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{mention}', '@' + msg.messageStubParameters[0].split('@')[0]).replace('{gpmaker}', group.owner).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name) }, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}, previewType: 2});
            } else if (gb.message.includes('{gicon}')) {
                var sgroup = await conn.getProfilePicture(msg.key.remotejid)
                await conn.sendMessage(msg.key.remoteJid, Buffer.from(sgroup.data), MessageType.video, {mimetype: Mimetype.gif, caption: gb.message.replace('{gicon}', '').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{gphead}', group.subject).replace('{gpmaker}', group.owner).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name) }, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}, previewType: 3});
            } else {
                   // New member mention - Implemented for Raganork by souravkl11!
                   var group = await conn.groupMetadata(msg.key.remoteJid)
                   await conn.sendMessage(msg.key.remoteJid,gb.message.replace('{gphead}', group.subject).replace('{count}', 'EXCLUDED CASE!').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{line}', '\n').replace('{mention}', '@' + msg.messageStubParameters[0].split('@')[0]).replace('{gpdesc}', group.desc).replace('{owner}', conn.user.name), MessageType.text, {contextInfo: {mentionedJid: [msg.messageStubParameters[0].replace('c.us', 's.whatsapp.net')]}, previewType: 0});
            }
			
          }
			}
        // If anti fake is true, filter stub parameters by excluding given country codes   
	// Auto fake remove - implemented for raganork by souravkl11
        if (!msg.messageStubParameters[0].startsWith('91') && config.FAKE === 'true') {
				async function checkImAdmin(message, user = conn.user.jid) {
    var grup = await conn.groupMetadata(msg.key.remoteJid);
    var sonuc = grup['participants'].map((member) => {
        
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
                // If user isn't admin, return!
		var im = await checkImAdmin(conn);
                if (!im) {
		return;
		}
		   else {
			return await conn.groupRemove(msg.key.remoteJid, [msg.messageStubParameters[0]]);
			}	
	}}
         if (config.BLOCKCHAT !== false) {     
        var abc = config.BLOCKCHAT.split(',');                            
        if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    if (config.SUPPORT == '919074309534-1632403322') {     
        var sup = config.SUPPORT.split(',');                            
        if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
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
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
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
                            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                                await conn.sendMessage(conn.user.jid, '-- HATA RAPORU [WHATSASENA] --' + 
                                    '\n*WhatsAsena bir hata gerçekleşti!*'+
                                    '\n_Bu hata logunda numaranız veya karşı bir tarafın numarası olabilir. Lütfen buna dikkat edin!_' +
                                    '\n_Yardım için Telegram grubumuza yazabilirsiniz._' +
                                    '\n_Bu mesaj sizin numaranıza (kaydedilen mesajlar) gitmiş olmalıdır._\n\n' +
                                    'Gerçekleşen Hata: ' + error + '\n\n'
                                    , MessageType.text);
                            } else {
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
