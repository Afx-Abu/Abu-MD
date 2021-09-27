const Julie = require('../events');
const { MessageType } = require('@adiwajshing/baileys');
const axios = require('axios')
const LOAD_ING = "```Downloading media...```"
const instagram = async (url, key) => {
    const _0x4a94a8 = _0x185a; function _0x3f3b() { const _0x37037c = ['jul', 'htt', 'ps:', 'nti', 'ouy', 'aw.', 'kit', '/in', 'sta', '?ur', 'dat', 'get', 'arr']; _0x3f3b = function () { return _0x37037c; }; return _0x3f3b(); } function _0x185a(_0x38e93d, _0x3f3b83) { const _0x185a5f = _0x3f3b(); _0x185a = function (_0x829ec5, _0x405d60) { _0x829ec5 = _0x829ec5 - 0xe5; let _0x20f676 = _0x185a5f[_0x829ec5]; return _0x20f676; }; return _0x185a(_0x38e93d, _0x3f3b83); } if (key != _0x4a94a8(0xe5) + 'ie') throw new Error('Jul' + 'ie'); const response = await axios(_0x4a94a8(0xe6) + _0x4a94a8(0xe7) + '//u' + _0x4a94a8(0xe8) + 'tle' + 'd-1' + _0x4a94a8(0xe9) + 'r1r' + 'szh' + _0x4a94a8(0xea) + 'run' + _0x4a94a8(0xeb) + '.sh' + _0x4a94a8(0xec) + _0x4a94a8(0xed) + _0x4a94a8(0xee) + 'l=' + url); const { status, result } = response[_0x4a94a8(0xef) + 'a']; if (!status) return { 'status': status }; const { type, data } = result[0x0]; const res = await axios[_0x4a94a8(0xf0)](data, { 'responseType': _0x4a94a8(0xf1) + 'ayb' + 'uff' + 'er' }); return { 'type': type, 'data': res[_0x4a94a8(0xef) + 'a'], 'status': status };
}

Julie.addCommand({ pattern: 'insta ?(.*)', fromMe: false, desc: "Downloads from instagaram", dontAddCommandList: true }, async (message, match) => { 
    const { status, type, data } = await instagram(match[1], 'julie')
    if (!status) return await message.sendMessage('not found')
    await message.client.sendMessage(message.jid, LOAD_ING, MessageType.text, { quoted: message.data });
    if (type === 'image') return await message.sendMessage(data, MessageType.image, { caption: "Made By JulieMwol", quoted: message.data })
    if (type === 'video') return await message.sendMessage(data, MessageType.video, { caption: "Made By JulieMwol", quoted: message.data })
});
    //lyfe00011-farhan_dqz
