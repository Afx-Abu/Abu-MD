const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const con = require('../config');

// Descriptions
const ENGAY = "Hackea a la persona que le respondas el mensaje."

// Need Reply
const ENREP = "```¡Debes responder algún mensaje!```"


if (con.WORKTYPE === 'private') {
    
    Asena.addCommand({pattern: 'hack', fromMe: true, OnlyGroup: true, desc: ENGAY}, (async (message, match) => {
    
    if (message.reply_message === false) return await message.client.sendMessage(message.jid, ENREP, MessageType.text);

    await message.client.sendMessage(message.jid, '*Hackeando a*' + '@' + message.reply_message.jid.split('@')[0] + '... >:)', MessageType.text, {
        quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}

            });

    await new Promise(r => setTimeout(r, 1500));
    await message.sendMessage('Python Version: 3.6\nHacker: *Skueletor*\nWEB API: True');
    await new Promise(r => setTimeout(r, 1200));
    await message.sendMessage('██╗░░██╗\n██║░░██║\n███████║\n██╔══██║\n██║░░██║\n╚═╝░░╚═╝');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('░█████╗░\n██╔══██╗\n███████║\n██╔══██║\n██║░░██║\n╚═╝░░╚═╝');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('░█████╗░\n██╔══██╗\n██║░░╚═╝\n██║░░██╗\n╚█████╔╝\n░╚════╝░');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('██╗░░██╗\n██║░██╔╝\n█████═╝░\n██╔═██╗░\n██║░╚██╗\n╚═╝░░╚═╝');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('██╗\n██║\n██║\n██║\n██║\n╚═╝');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('███╗░░██╗\n████╗░██║\n██╔██╗██║\n██║╚████║\n██║░╚███║\n╚═╝░░╚══╝');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('░██████╗░\n██╔════╝░\n██║░░██╗░\n██║░░╚██╗\n╚██████╔╝\n░╚═════╝░');

    await new Promise(r => setTimeout(r, 1500));

    await message.sendMessage('*¡El sistema de destino está siendo hackeado ahora mismo!*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 1%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 3%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 6%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 1%\nℂá𝕞𝕒𝕣𝕒: 3%');
    await new Promise(r => setTimeout(r, 1700));
    await message.sendMessage('*Proceso en ejecución...*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 18%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 25%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 34%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 14%\nℂá𝕞𝕒𝕣𝕒: 16%');
    await new Promise(r => setTimeout(r, 1700));
    await message.sendMessage('*Hackeando el sistema de seguridad del sistema*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 48%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 44%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 57%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 14%\nℂá𝕞𝕒𝕣𝕒: 62%');
    await new Promise(r => setTimeout(r, 1700));
    await message.sendMessage('*Eliminando los bloqueos del sistema...*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 68%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 84%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 92%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 89%\nℂá𝕞𝕒𝕣𝕒: 86%');
    await new Promise(r => setTimeout(r, 1700));
    await message.sendMessage('*Conectando a la cuenta de destino mediante la API WEB de WhatsApp*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 93%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 90%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 88%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 94%\nℂá𝕞𝕒𝕣𝕒: 96%');
    await new Promise(r => setTimeout(r, 1700));
    await message.sendMessage('😎 *Cuenta Hackeada*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 100%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 100%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 100%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 100%\nℂá𝕞𝕒𝕣𝕒: 100%');

    await new Promise(r => setTimeout(r, 2500));

    await message.sendMessage('*¡Información guardada en la base de datos de Skueletor! >:D*');

}));

Asena.addCommand({pattern: 'chocolate', fromMe: true, OnlyGroup: true}, (async (message, match) => {

    await message.sendMessage('{__/}\n( • - • )\n/>🍫 te doy un chocolate');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n🍫 <   O no. tu ya tienes');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>🍫 No puedo sacrificarte...');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>☕️ Mejor te doy esto');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>❤️ toma esto también pero no lo rompas, por favor');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>💔 Dije que no lo rompas');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n💔< Debes arrepentirte de haberlo hecho...');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/> ❤️ o toma otro...');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>💔 te odio');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>❤️ toma esto una vez más, pero si lo rompes, me enojaré');
    await new Promise(r => setTimeout(r, 1800));

    await message.sendMessage('Hecho por *Skueletor* >:D');

}));
}
    
else if (con.WORKTYPE === 'public') {
    
    Asena.addCommand({pattern: 'hack', fromMe: false, OnlyGroup: true, desc: ENGAY}, (async (message, match) => {
    
    if (message.reply_message === false) return await message.client.sendMessage(message.jid, ENREP, MessageType.text);

    await message.client.sendMessage(message.jid, '*Hackeando a*' + '@' + message.reply_message.jid.split('@')[0] + '... >:)', MessageType.text, {
        quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}

            });

    await new Promise(r => setTimeout(r, 1500));
    await message.sendMessage('Python Version: 3.6\nHacker: *Skueletor*\nWEB API: True');
    await new Promise(r => setTimeout(r, 1200));
    await message.sendMessage('██╗░░██╗\n██║░░██║\n███████║\n██╔══██║\n██║░░██║\n╚═╝░░╚═╝');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('░█████╗░\n██╔══██╗\n███████║\n██╔══██║\n██║░░██║\n╚═╝░░╚═╝');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('░█████╗░\n██╔══██╗\n██║░░╚═╝\n██║░░██╗\n╚█████╔╝\n░╚════╝░');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('██╗░░██╗\n██║░██╔╝\n█████═╝░\n██╔═██╗░\n██║░╚██╗\n╚═╝░░╚═╝');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('██╗\n██║\n██║\n██║\n██║\n╚═╝');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('███╗░░██╗\n████╗░██║\n██╔██╗██║\n██║╚████║\n██║░╚███║\n╚═╝░░╚══╝');
    await new Promise(r => setTimeout(r, 700));
    await message.sendMessage('░██████╗░\n██╔════╝░\n██║░░██╗░\n██║░░╚██╗\n╚██████╔╝\n░╚═════╝░');

    await new Promise(r => setTimeout(r, 1500));

    await message.sendMessage('*¡El sistema de destino está siendo hackeado ahora mismo!*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 1%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 3%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 6%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 1%\nℂá𝕞𝕒𝕣𝕒: 3%');
    await new Promise(r => setTimeout(r, 1700));
    await message.sendMessage('*Proceso en ejecución...*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 18%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 25%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 34%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 14%\nℂá𝕞𝕒𝕣𝕒: 16%');
    await new Promise(r => setTimeout(r, 1700));
    await message.sendMessage('*Hackeando el sistema de seguridad del sistema*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 48%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 44%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 57%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 14%\nℂá𝕞𝕒𝕣𝕒: 62%');
    await new Promise(r => setTimeout(r, 1700));
    await message.sendMessage('*Eliminando los bloqueos del sistema...*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 68%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 84%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 92%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 89%\nℂá𝕞𝕒𝕣𝕒: 86%');
    await new Promise(r => setTimeout(r, 1700));
    await message.sendMessage('*Conectando a la cuenta de destino mediante la API WEB de WhatsApp*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 93%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 90%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 88%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 94%\nℂá𝕞𝕒𝕣𝕒: 96%');
    await new Promise(r => setTimeout(r, 1700));
    await message.sendMessage('😎 *Cuenta Hackeada*\n𝕎𝕙𝕒𝕥𝕤𝔸𝕡𝕡: 100%\n𝔾𝕒𝕝𝕖𝕣í𝕒: 100%\n𝔻𝕠𝕔𝕦𝕞𝕖𝕟𝕥𝕠𝕤: 100%\n𝔸𝕣𝕔𝕙𝕚𝕧𝕠𝕤: 100%\nℂá𝕞𝕒𝕣𝕒: 100%');

    await new Promise(r => setTimeout(r, 2500));

    await message.sendMessage('*¡Información guardada en la base de datos de Skueletor! >:D*');

}));

Asena.addCommand({pattern: 'chocolate', fromMe: false, OnlyGroup: true}, (async (message, match) => {

    await message.sendMessage('{__/}\n( • - • )\n/>🍫 te doy un chocolate');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n🍫 <   O no. tu ya tienes');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>🍫 No puedo sacrificarte...');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>☕️ Mejor te doy esto');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>❤️ toma esto también pero no lo rompas, por favor');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>💔 Dije que no lo rompas');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n💔< Debes arrepentirte de haberlo hecho...');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/> ❤️ o toma otro...');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>💔 te odio');
    await new Promise(r => setTimeout(r, 1000));
    await message.sendMessage('{__/}\n( • - • )\n/>❤️ toma esto una vez más, pero si lo rompes, me enojaré');
    await new Promise(r => setTimeout(r, 1800));

    await message.sendMessage('Hecho por *Skueletor* >:D');

}));
}
