/* Copyright (C) 2020 farhan-dqz.

re codded by afnan plk and-saidali

*/

const fs = require('fs')

const Asena = require('../events');

const {MessageType, Mimetype } = require('@adiwajshing/baileys');

const FilterDb = require('./sql/filters');

const Config = require('../config')

const jid = Config.DISBGM !== undefined ? COnfig.DISBGM.split(',') : [];

const Language = require('../language');

const Lang = Language.getString('filters');

if (Config.WORKTYPE == 'private') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {

    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {

        filtreler = await FilterDb.getFilter(message.jid);

        if (filtreler === false) {

            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)

        } else {

            var mesaj = Lang.FILTERS + '\n';

            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');

            await message.client.sendMessage(message.jid,mesaj,MessageType.text);

        }

    } else {

        if (match.length < 2) {

            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);

        }

        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);

        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);

    }

}));

Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {

    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {

        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)

    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));

    

    if (!del) {

        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)

    } else {

        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)

    }

}));

Asena.addCommand({on: 'text', fromMe: false }, (async (message, match) => {

    if(Config.BGMFILTER){

        let banned = jid.find( Jid => Jid === message.jid);

        if(banned !== undefined) return

        if (!!message.mention && message.mention[0] == '918606759500@s.whatsapp.net') {

await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted : message.data, ptt: true})

        }

const array = ['name entha','Helo','King','Kooi','Tuttu','Azaru','Ramos','Tentacion','baby','Love','nirthada','Neymar','umma','Music','Kurup','Friend','Rose','aara','Alone','ayilla','bie','Chiri','colony','enth','entha','Fuck','Goal','Hambada','Kanja','Killedi','kuthirappavan','mathi','Meeting','mier','moonji','Name','Oh no','pever','Potta','Serious','Soldier','Sry','Subscribe','thottu','Va','Vada','vimanam','sorry','nanban','Lala','Smile','ghost','La be','Sed','Uff','Legend','music','Fek','Psycho','Town','Pwoli','Uyir','Malang','Bad','Boss','Thamasha','big fan','charlie','gd n8','kar98','love u','Endi','endi','noob','Poweresh','Perfect ok','perfect ok','power','saji','sed','single','waiting','Myr','myr','Malappuram','uyir','thug','avastha','Moodesh','sketched','Cr7','Z aayi','manasilayo','Hi','Hlo','Poda','nirtheda','Aarulle','Cr7 back','Portugal','ennitt','Boss',,'Haters','ayn','Kgf','😎','Akshay uyir','sed bgm','Messi','Hehe','hehe','Set aano','set aano','Bot myren','Venda','venda','chadhi','Chadhi','Hbday','hbday','Bot','R yyi padicho','Myre','myre','Oompi','oompi','parayatte','Fresh','fresh','Ok da','ok da','Feel aayi','feel aaayi','Scene','scene','Ok bei','ok bei','Da','Kozhi','kozhi','adi','Adi','kali','Kali','thantha','Thantha','Aysheri','aysheri','thund','Thund','thot','Thot','sneham','Sneham','pm','Pm','paatt','Paatt','njan','Njan','life','Life','Killadi','killadi','good bye','Good bye','evide','Evide','achan','Achan','kunna','Kunna','broken','Broken','why','Why','enth patti','Enth patti','pani','Pani','padicho','Padicho','paad','Paad','Chatho','chatho','lover','Lover','nanayikoode','Nanayikoode','Die','die','hate','Hate','Lamiya engineering','lamiya engineering','nallath','Nallath','Neymer','neymer','patti','Patti','poora','Poora','Rohit','rohit','thall','Thall','Theri','theri','potte','Potte','Pinky','Caption','caption','onn poyi','Onn poyi','problem','Problem','lub','recharge','Recharge','Pinky','chill','Chill','help','Help','kunda','Kunda','povano','Povano','sthalam','Sthalam','tholvi','Tholvi','vannu','Vannu']

array.map( async (a) => {

let pattern = new RegExp(`\\b${a}\\b`, 'g');

if(pattern.test(message.message)){

       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})

}

});

    }

    var filtreler = await FilterDb.getFilter(message.jid);

    if (!filtreler) return; 

    filtreler.map(

        async (filter) => {

            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');

            if (pattern.test(message.message)) {

                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});

            }

        }

    );

}));

}

else if (Config.WORKTYPE == 'public') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {

    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {

        filtreler = await FilterDb.getFilter(message.jid);

        if (filtreler === false) {

            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)

        } else {

            var mesaj = Lang.FILTERS + '\n';

            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');

            await message.client.sendMessage(message.jid,mesaj,MessageType.text);

        }

    } else {

        if (match.length < 2) {

            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);

        }

        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);

        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);

    }

}));

Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {

    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {

        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)

    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));

    

    if (!del) {

        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)

    } else {

        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)

    }

}));

    

if (Config.PLKBGM == 'one') { 

Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {

        if(Config.BGMFILTER){

        let banned = jid.find( Jid => Jid === message.jid);

        if(banned !== undefined) return

        if (!!message.mention && message.mention[0] == '918606759500@s.whatsapp.net') {

await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/trance.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted : message.data, ptt: true})

        }

        if (!!message.mention && message.mention[0] == Config.AFNN) {

await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})

        }

const array = ['name entha','Helo','King','Kooi','Love','Thamasha','big fan','charlie','gd n8','kar98','love u','Endi','endi','noob','Poweresh','Perfect ok','perfect ok','power','saji','sed','single','waiting','Myr','myr','Malappuram','uyir','thug','avastha','Moodesh','sketched','Cr7','Z aayi','manasilayo','Hi','Hlo','Poda','nirtheda','Aarulle','Cr7 back','Portugal','ennitt','Boss',,'Haters','ayn','Kgf','😎','Akshay uyir','sed bgm','Messi','Hehe','hehe','Set aano','set aano','Bot myren','Venda','venda','chadhi','Chadhi','Hbday','hbday','Bot','R yyi padicho','Myre','myre','Umbi','umbi','parayatte','Fresh','fresh','Ok da','ok da','Feel aayi','feel aaayi','Scene','scene','Ok bei','ok bei','Da','Kozhi','kozhi','adi','Adi','kali','Kali','thantha','Thantha','Aysheri','aysheri','thund','Thund','thot','Thot','sneham','Sneham','pm','Pm','paatt','Paatt','njan','Njan','life','Life','Killadi','killadi','good bye','Good bye','evide','Evide','achan','Achan','kunna','Kunna','broken','Broken','why','Why','enth patti','Enth patti','pani','Pani','padicho','Padicho','paad','Paad','Chatho','chatho','lover','Lover','nanayikoode','Nanayikoode','Die','die','hate','Hate','Lamiya engineering','lamiya engineering','nallath','Nallath','Neymer','neymer','patti','Patti','poora','Poora','Rohit','rohit','thall','Thall','Theri','theri','potte','Potte','Pinky','Caption','caption','onn poyi','Onn poyi','problem','Problem','Chill','chill','help','Help','Kunda','kunda','povano','sthalam','Sthalam','tholvi','Tholvi','vannu','Vannu','Pinkymol','malayalam','Malayalam','vaa','Vaa','bot','lub','Ayin','thyr','Thyr','Sad','sad','Sed','kiss','Kiss','baby','Baby','hi','voice','love','Admin','admin','Remove','remove','boss','sorry','Sorry','Owner','owner','Gud nyt','dream','Dream','Avastha','Bye','bye']

array.map( async (a) => {

let pattern = new RegExp(`\\b${a}\\b`, 'g');

if(pattern.test(message.message)){

       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data, ptt: true})

}

});

    }

    var filtreler = await FilterDb.getFilter(message.jid);

    if (!filtreler) return; 

    filtreler.map(

        async (filter) => {

            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');

            if (pattern.test(message.message)) {

                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});

            }

        }

    );

}));

}

if (Config.PLKBGM == 'two') {    

    Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {   

        if(Config.BGMFILTER){

        let banned = jid.find( Jid => Jid === message.jid);

        if(banned !== undefined) return

        if (!!message.mention && message.mention[0] == '919072790587@s.whatsapp.net') {

await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/trance.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted : message.data, ptt: true})

        }

        if (!!message.mention && message.mention[0] == Config.AFNN) {

await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})

        }

const array = ['Pinky','Aliya','Aliyo','Bad','Eda','Ha','Hacker','He','Hello','Hi','Hlo','Hloo','Hoi','Hy','Lobe u','Mass','Mathy','Name','Nja vere','Oh','Pinnalla','Pm','Poli','Sed','Uyir','Va','Vaa','ara','baby','bgm','bot','da','entha','gdmrng','gdngt','kozhi','left','life','line','love u','love','lover','mathi','mention','music','myr','nallath','nanban','ok bei','ok da','ok','pani','poda','power','sad','sed','sorry','uyir','vada','venda','waiting','welcome','why']

array.map( async (a) => {

let pattern = new RegExp(`\\b${a}\\b`, 'g');

if(pattern.test(message.message)){

       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads2/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data, ptt: true})

}

});

    }

    var filtreler = await FilterDb.getFilter(message.jid);

    if (!filtreler) return; 

    filtreler.map(

        async (filter) => {

            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');

            if (pattern.test(message.message)) {

                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});

            }

        }

    );

}));

}

Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {

    if(Config.STICKERP){

    let banned = jid.find( Jid => Jid === message.jid);

    if(banned !== undefined) return

    if (!!message.mention && message.mention[0] == '918606759500@s.whatsapp.net') {

await message.client.sendMessage(message.jid, fs.readFileSync('./stickers/mention.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted : message.data, ptt: false})

    }

const array = ['Pinky','asena','ayin','back','Back','Bot','fuck','Fuck','Hehe','Hello','Hlo','Kill','kill','kiss','line','love','mwolu','Mwolu','single','tha','thund','z','Z','bie','Bie']

array.map( async (a) => {

let pattern = new RegExp(`\\b${a}\\b`, 'g');

if(pattern.test(message.message)){

   await message.client.sendMessage(message.jid, fs.readFileSync('./stickers/' + a + '.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted: message.data, ptt: false})

}

});

}

var filtreler = await FilterDb.getFilter(message.jid);

if (!filtreler) return; 

filtreler.map(

    async (filter) => {

        pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');

        if (pattern.test(message.message)) {

            await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});

        }

    }

);

}));

}
