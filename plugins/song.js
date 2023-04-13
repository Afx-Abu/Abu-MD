const {
  Module,
  isPublic,
  getSong,
  getVideo
} = require("../lib/");

var Jsl_0x585567=Jsl_0x4fca;function Jsl_0x4fca(_0x100526,_0x116280){var _0x2295ab=Jsl_0x2295();return Jsl_0x4fca=function(_0x4fca49,_0x59254e){_0x4fca49=_0x4fca49-0xb2;var _0x19d7e0=_0x2295ab[_0x4fca49];return _0x19d7e0;},Jsl_0x4fca(_0x100526,_0x116280);}(function(_0x1d5141,_0x4bfd8c){var _0x1e434e=Jsl_0x4fca,_0x3a217a=_0x1d5141();while(!![]){try{var _0x5ab6e5=-parseInt(_0x1e434e(0xbe))/0x1+-parseInt(_0x1e434e(0xbd))/0x2*(parseInt(_0x1e434e(0xbc))/0x3)+-parseInt(_0x1e434e(0xb3))/0x4*(parseInt(_0x1e434e(0xb6))/0x5)+parseInt(_0x1e434e(0xb4))/0x6*(-parseInt(_0x1e434e(0xb2))/0x7)+parseInt(_0x1e434e(0xbb))/0x8+-parseInt(_0x1e434e(0xb8))/0x9*(parseInt(_0x1e434e(0xc1))/0xa)+parseInt(_0x1e434e(0xb9))/0xb;if(_0x5ab6e5===_0x4bfd8c)break;else _0x3a217a['push'](_0x3a217a['shift']());}catch(_0x242550){_0x3a217a['push'](_0x3a217a['shift']());}}}(Jsl_0x2295,0x8e241),Module({'pattern':Jsl_0x585567(0xbf),'fromMe':isPublic,'dontAddCommandList':!![],'desc':'downloading\x20your\x20YouTube\x20song','type':Jsl_0x585567(0xb7)},async(_0x19a6ae,_0x1e6118)=>{var _0xb353e6=Jsl_0x585567;if(!_0x1e6118)return await _0x19a6ae[_0xb353e6(0xba)](_0xb353e6(0xc0));return await getSong(_0x19a6ae,_0x1e6118);}),Module({'pattern':Jsl_0x585567(0xbf),'fromMe':isPublic,'dontAddCommandList':!![],'desc':Jsl_0x585567(0xb5),'type':Jsl_0x585567(0xb7)},async(_0x357195,_0x2112ab)=>{var _0x29f37f=Jsl_0x585567;if(!_0x2112ab)return await _0x357195['reply'](_0x29f37f(0xc0));return await getVideo(_0x357195,_0x2112ab);}));function Jsl_0x2295(){var _0x115eb2=['reply','4352464mzjArb','3fVgxkE','157310jMUmYb','433168yfSycs','https?(.*)','_enter\x20song\x20url/name_','40qeOvlj','86205sGOjJo','295156tNNddi','498gAiPQe','downloading\x20your\x20YouTube\x20videos','25CTHFtC','downloader','1138770iUOmpR','26919024alOKTE'];Jsl_0x2295=function(){return _0x115eb2;};return Jsl_0x2295();}

Module
	(
		{
            pattern: "song?(.*)",
	    fromMe: isPublic,
	    desc: "downloading your YouTube song",
            type: "downloader",
            },
		async (message, match) => {
                if(!match) return await message.reply("_enter song url/name_")			
		return await getSong(message, match);

})

Module
	(
		{
            pattern: "video?(.*)",
	    fromMe: isPublic,
	    desc: "downloading your YouTube videos",
            type: "downloader",
            },
		async (message, match) => {
                if(!match) return await message.reply("_enter song url/name_")			
		return await getVideo(message, match);

})

