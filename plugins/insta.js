const {
  Module,
  isPublic,
  getInsta,
  sendGpt,
  getTts
} = require("../lib/");


var Jsl_0x55c676=Jsl_0x5ef9;function Jsl_0x5ef9(_0x21da0f,_0x59972d){var _0x210c5c=Jsl_0x210c();return Jsl_0x5ef9=function(_0x5ef90a,_0x21a193){_0x5ef90a=_0x5ef90a-0x162;var _0xb54bcc=_0x210c5c[_0x5ef90a];return _0xb54bcc;},Jsl_0x5ef9(_0x21da0f,_0x59972d);}(function(_0x44fbbf,_0x842c6c){var _0x2851b5=Jsl_0x5ef9,_0x1166fb=_0x44fbbf();while(!![]){try{var _0x4b28c7=-parseInt(_0x2851b5(0x16f))/0x1*(-parseInt(_0x2851b5(0x16a))/0x2)+-parseInt(_0x2851b5(0x162))/0x3*(-parseInt(_0x2851b5(0x164))/0x4)+parseInt(_0x2851b5(0x167))/0x5*(parseInt(_0x2851b5(0x165))/0x6)+-parseInt(_0x2851b5(0x166))/0x7*(parseInt(_0x2851b5(0x169))/0x8)+-parseInt(_0x2851b5(0x168))/0x9+parseInt(_0x2851b5(0x163))/0xa+parseInt(_0x2851b5(0x16b))/0xb;if(_0x4b28c7===_0x842c6c)break;else _0x1166fb['push'](_0x1166fb['shift']());}catch(_0xab55a){_0x1166fb['push'](_0x1166fb['shift']());}}}(Jsl_0x210c,0x33035),Module({'pattern':Jsl_0x55c676(0x16e),'fromMe':isPublic,'dontAddModuleList':!![],'desc':Jsl_0x55c676(0x16c),'type':Jsl_0x55c676(0x16d)},async(_0x36d01a,_0x5ece9e)=>{return await getInsta(_0x36d01a);}));function Jsl_0x210c(){var _0x2c6f9f=['380410MqrPau','172gRCGEh','182958FCSEXs','987MnKhzq','15SjwKza','661851nBIlaG','17736sYhiNa','54568WOUaWx','2095379bWnGYo','downloads\x20video\x20from\x20instagram','downloader','http','10Vnbavb','156qUDrNe'];Jsl_0x210c=function(){return _0x2c6f9f;};return Jsl_0x210c();}

Module(
  {
    pattern: "gpt",
    fromMe: isPublic,
    desc: "downloads video from instagram",
    type: "downloader",
  },
   async (message, match) => {		
   return await sendGpt(message,match);

})


Module(
  {
    pattern: "tts",
    fromMe: isPublic,
    desc: "downloads video from instagram",
    type: "downloader",
  },
   async (message, match) => {		
   return await getTts(message,match);

})
