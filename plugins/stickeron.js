/* Copyright (C) 2021 farhan-dqz
coded for Abuser
*/

const Julie = require('../events');
const config = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;

   var l_dsc = ''
    var BGM_on = ''
    var BGM_off = ''
    var STICKER_on = ''
    var STICKER_off = ''

    if (config.LANG == 'EN') {
        l_dsc = 'turn on and turn off bgm. -bot owner command'
        Y_dsc = 'turn on and turn off bgm. -bot owner command'
        BGM_on = 'bgm option turned on!'
        BGM_off = 'bgm option turned off'
        STICKER_on = 'STICKER option turned on!'
        STICKER_off = 'STICKER option turned off'
        P_dsc = 'turn on & off anti-badword To remove members when they use bad words'        
    }
    if (config.LANG == 'ML') {
        l_dsc = 'bgm ഓണാക്കുക അല്ലെങ്കിൽ ഓഫ് ചെയ്യുക. -ബോട്ട് ഉടമ കമാൻഡ്'
        Y_dsc = 'bgm ഓണാക്കുക അല്ലെങ്കിൽ ഓഫ് ചെയ്യുക. -ബോട്ട് ഉടമ കമാൻഡ്'        
        BGM_on = 'bgm ഓപ്ഷൻ ഓണാക്കി'
        BGM_off = 'bgm ഓപ്ഷൻ ഓഫാക്കി'
        STICKER_on = 'STICKER option turned on!'
        STICKER_off = 'STICKER option turned off'
        
    }
    Julie.addCommand({pattern: 'bgm ?(.*)', fromMe: true, desc: l_dsc, usage: '.bgm on / off' }, (async (message, match) => {
        if (match[1] == 'off') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['BGM_FILTER']: 'false'
                    } 
                });
                await message.sendMessage(BGM_off)
        } else if (match[1] == 'on') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['BGM_FILTER']: 'true'
                    } 
                });
                await message.sendMessage(BGM_on)
        }
    }));

    Julie.addCommand({pattern: 'autosticker ?(.*)', fromMe: true, desc: Y_dsc, usage: '.sticker on / off' }, (async (message, match) => {
        if (match[1] == 'off') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['AUTO_STICKER']: 'false'
                    } 
                });
                await message.sendMessage(STICKER_off)
        } else if (match[1] == 'on') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['AUTO_STICKER']: 'true'
                    } 
                });
                await message.sendMessage(STICKER_on)
        }
    }));

    Julie.addCommand({ pattern: 'sudo ?(.*)', fromMe: true, desc: 'changes sudo numbers', usage: '.sudo *your number*' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('NEED A NUMBER')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['SUDO']: match[1]
            }
        });
        await message.sendMessage("NEW SUDO UPDATED")
    }));

Julie.addCommand({ pattern: 'button ?(.*)', fromMe: true, desc: 'changes sudo numbers', usage: '.button *Sed/Happy*' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('Sed/Happy')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['ALIVE_BUTTON']: match[1]
            }
        });
        await message.sendMessage("NEW BUTTON UPDATED")
    }));

Julie.addCommand({ pattern: 'emoji ?(.*)', fromMe: true, desc: 'changes list command and emojies', usage: '.emoji *list/💌/🍃/🍒/🍿*' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('list/💙/🌟/🥀/🐾')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['CMD_LIST']: match[1]
            }
        });
        await message.sendMessage("NEW LIST AND EMOJIES UPDATED")
    }));

    Julie.addCommand({ pattern: 'caption ?(.*)', fromMe: true, desc: 'changes all captions', usage: '.caption *Made by Abuserl*' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('NEED cA CAPTION')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['ALL_CAPTION']: match[1]
            }
        });
        await message.sendMessage("NEW CAPTION UPDATED")
    }));

    Julie.addCommand({ pattern: 'number ?(.*)', fromMe: true, desc: 'change user number', usage: '.number *Made by Abuser*' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('NEED A NUMBER 919895xxxx')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['NUMBER']: match[1]
            }
        });
        await message.sendMessage("NEW USER NUMBER UPDATED")
    }));

    Julie.addCommand({ pattern: 'deployer ?(.*)', fromMe: true, desc: 'change user name', usage: '.deployer *Made by Abuser*' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('NEED A NAME')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['DEPLOYER']: match[1]
            }
        });
        await message.sendMessage("NEW USERNAME UPDATED")
    }));

    Julie.addCommand({ pattern: 'handlers ?(.*)', fromMe: true, desc: 'changes handlers', usage: '.handler ^[.!] ' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('NEED A CAPTION')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['ALL_CAPTION']: match[1]
            }
        });
        await message.sendMessage("NEW HANDLER UPDATED")
    }));


    Julie.addCommand({ pattern: 'botname ?(.*)', fromMe: true, desc: 'change your bot name', usage: '.botname *name* ' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('TYPE YOUR NEW BOT NAME')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['BOT_NAME']: match[1]
            }
        });
        await message.sendMessage("NEW BOT NAME UPDATED")
    }));

Julie.addCommand({ pattern: 'theri  ?(.*)', fromMe: true, desc: 'change your theri commands', usage: '.theri command,command' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('TYPE YOUR NEW BOT NAME')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['THERI_LIST']: match[1]
            }
        });
        await message.sendMessage("THERI LIST UPDATED")
    }));




