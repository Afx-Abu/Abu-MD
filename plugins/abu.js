let fetch = require ('node-fetch')
let handler = async (m, { conn }) => {
    let devil = `ㅤ
`.trim()
    await conn.send2ButtonLoc(m.chat, await (await fetch("https://www.linkpicture.com/q/IMG-20220108-WA0143.jpg")).buffer(), devil, 'ᴀʙᴜ sᴇʀ  ʙʏ ᴀʙᴜ -ᴊᴀsɪʟ\n\╔╗╔╗╔══╗╔══╗\n\║╚╝║║╔╗║╚║║╝\n\║╔╗║║╠╣║╔║║╗\n\╚╝╚╝╚╝╚╝╚══╝ \n\n\ https://github.com/Arx_Abu/Abu_ser \n\n\ © ī.am ꪶᴀʙᴜ sᴇʀꫂ⁩⁴⁰⁴⁩' , '❤️', '.❤️', '🙂', ',🙂')
}
handler.tags = ['main']
handler.help = ['git']
handler.command = /^(git)$/i
module.exports = handler
