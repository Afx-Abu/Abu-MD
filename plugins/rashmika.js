/* Copyright (C) 2021 ameer-kallumthodi.

Licensed under the  GPL-3.0 License;

you may not use this file except in compliance with the License.

Pikachu-Ameer Suhail

*/

const Asena = require('../events');

const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');

const axios = require('axios');

const Config = require('../config');

if (Config.WORKTYPE == 'private') {

    Asena.addCommand({pattern: 'rashmika', fromMe: true, desc: 'random rashmika images'}, (async (message, match) => {

    var r_text = new Array ();

r_text[0] = "https://i.ibb.co/Lpbn4yn/024eb6b7ed350a59d7c69cc2d20c628f.jpg";

r_text[1] = "https://i.ibb.co/yBk8hwY/04ea393be2184b0a570f21623fe61ad5.jpg";

r_text[2] = "https://i.ibb.co/gRqPLNZ/32d036804e12b96c0c01c15fde4d4afd.jpg";

r_text[3] = "https://i.ibb.co/BNHMyMR/20200319-100444-Copy-Copy-Copy-Copy.jpg";

r_text[4] = "https://i.ibb.co/ckHytNP/20200402-201324-Copy-Copy-Copy.jpg";

r_text[5] = "https://i.ibb.co/PT42NYJ/78354966c6869622f5a4b87eeba23686.jpg";

r_text[6] = "https://i.ibb.co/f4y50Jf/20200402-201442-Copy-Copy.jpg";

r_text[7] = "https://i.ibb.co/dGYPBP1/a-a-O-O-O-a-a-20200625-164032-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[8] = "https://i.ibb.co/TkF09V4/a-a-O-O-O-a-a-20200625-164105-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[9] = "https://i.ibb.co/ysnJPV6/a-a-O-O-O-a-a-20200625-164129-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[10] = "https://i.ibb.co/r0xrwNY/a-a-O-O-O-a-a-20200625-164148-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[11] = "https://i.ibb.co/c21Ybc4/a-a-O-O-O-a-a-20200625-164211-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[12] = "https://i.ibb.co/0FbQfG6/a-a-O-O-O-a-a-20200625-164239-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[13] = "https://i.ibb.co/mGqV62N/images-41-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[14] = "https://i.ibb.co/HFzJKgc/a9ea425545322528eec75016abb0243b-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[15] = "https://i.ibb.co/PDpYh5S/IMG-20200618-WA0470-Copy-Copy-Copy-Copy.jpg";

r_text[16] = "https://i.ibb.co/NnXF007/Screenshot-20200522-175530-Instagram-Copy-Copy.jpg";

r_text[17] = "https://i.ibb.co/cxJbdhW/Screenshot-20200522-175543-Instagram-Copy-Copy.jpg";

r_text[18] = "https://i.ibb.co/7CWDgN2/Screenshot-20200522-175728-Instagram-Copy-Copy.jpg";

r_text[19] = "https://i.ibb.co/y5hntd8/Screenshot-20200522-175754-Instagram-Copy-Copy.jpg";

r_text[20] = "https://i.ibb.co/3fxC5P1/Screenshot-20200524-172446-Instagram-Copy-Copy.jpg";

r_text[21] = "https://i.ibb.co/Lv8tfW6/Screenshot-20200524-172538-Instagram-Copy-Copy.jpg";

r_text[22] = "https://i.ibb.co/Kz8jSpC/Screenshot-20200524-172931-Instagram-Copy.jpg";

r_text[23] = "https://i.ibb.co/pJVMHq4/Screenshot-20200524-172943-Instagram-Copy.jpg";

r_text[24] = "https://i.ibb.co/xJhkrJX/Screenshot-20200524-173022-Instagram.jpg";

r_text[25] = "https://i.ibb.co/34sSy31/Screenshot-20200524-173202-Instagram.jpg";

r_text[26] = "https://i.ibb.co/2Nn0L41/Screenshot-20200602-122842-Instagram-Copy.jpg";

r_text[27] = "https://i.ibb.co/KsK3fcj/Screenshot-20200602-123032-Instagram-Copy.jpg";

r_text[28] = "https://i.ibb.co/899KdHM/Screenshot-20200602-123113-Instagram-Copy.jpg";

r_text[29] = "https://i.ibb.co/DRtbVr6/Screenshot-20200602-123128-Instagram-Copy.jpg";

r_text[30] = "https://i.ibb.co/b3YtYNg/Screenshot-20200602-123324-Instagram.jpg";

r_text[31] = "https://i.ibb.co/64dThdN/Screenshot-20200602-123405-Instagram.jpg";

r_text[32] = "https://i.ibb.co/5rXJMVj/Screenshot-20200602-123424-Instagram.jpg";

r_text[33] = "https://i.ibb.co/8gvwVZZ/Screenshot-20200602-123507-Instagram.jpg";

r_text[34] = "https://i.ibb.co/MyTrtD6/Screenshot-20200602-123541-Instagram.jpg";

r_text[35] = "https://i.ibb.co/q5B74Xk/Screenshot-20200604-093917-Instagram.jpg";

r_text[36] = "https://i.ibb.co/M9spg7V/Screenshot-20200604-100232-Instagram.jpg";

r_text[37] = "https://i.ibb.co/g3bhhkN/Screenshot-20200604-210412-Instagram.jpg";

r_text[38] = "https://i.ibb.co/vvCgPTx/Screenshot-20200608-080746-Instagram.jpg";

r_text[39] = "https://i.ibb.co/C9MK1bc/Screenshot-20200608-080817-Instagram.jpg";

r_text[40] = "https://i.ibb.co/12c5Kt7/Screenshot-20200608-080859-Instagram.jpg";

r_text[41] = "https://i.ibb.co/3YG67f1/Screenshot-20200619-090518-Instagram.jpg";

r_text[42] = "https://i.ibb.co/sFkXvHN/Screenshot-20200621-091153-Chrome.jpg";

r_text[43] = "https://i.ibb.co/fHP6vxm/Screenshot-20200621-091249-Chrome.jpg";

r_text[44] = "https://i.ibb.co/q93Trnk/Screenshot-20200627-090513-Instagram.jpg";

r_text[45] = "https://i.ibb.co/9V32nkm/IMG-20200619-WA0023-Copy-Copy-Copy-Copy.jpg";

r_text[46] = "https://i.ibb.co/XxW758m/IMG-20200622-WA0128-Copy-Copy-Copy-Copy.jpg";

r_text[47] = "https://i.ibb.co/VJ2s9y9/IMG-20200622-WA0131-Copy-Copy-Copy-Copy.jpg";

r_text[48] = "https://i.ibb.co/LY5HPLV/IMG-20200622-WA0134-Copy-Copy-Copy-Copy.jpg";

r_text[49] = "https://i.ibb.co/SsrG2JX/IMG-20200622-WA0137-Copy-Copy-Copy-Copy.jpg";

r_text[50] = "https://i.ibb.co/88rcsPD/IMG-20200623-WA0020-Copy-Copy-Copy.jpg";

r_text[51] = "https://i.ibb.co/ZmFJ6QY/IMG-20200623-WA0021-Copy-Copy-Copy.jpg";

r_text[52] = "https://i.ibb.co/729tx2x/IMG-20200623-WA0062-Copy-Copy-Copy.jpg";

r_text[53] = "https://i.ibb.co/kBZ5vfs/IMG-20200623-WA0064-Copy-Copy-Copy.jpg";

r_text[54] = "https://i.ibb.co/VLrKVDs/IMG-20200623-WA0069-Copy-Copy-Copy.jpg";

r_text[55] = "https://i.ibb.co/KX1mFCY/IMG-20200623-WA0218-Copy-Copy-Copy.jpg";

r_text[56] = "https://i.ibb.co/DzqJJXz/IMG-20200624-WA0026-Copy-Copy-Copy.jpg";

r_text[57] = "https://i.ibb.co/JxM4KzS/IMG-20200624-WA0037-Copy-Copy-Copy.jpg";

r_text[58] = "https://i.ibb.co/J25J7kV/IMG-20200701-WA0008-Copy-Copy-Copy.jpg";

r_text[59] = "https://i.ibb.co/sRHcXnC/IMG-20200701-WA0272-Copy-Copy-Copy.jpg";

r_text[60] = "https://i.ibb.co/JjnKg4F/IMG-20200702-WA0342-Copy-Copy-Copy.jpg";

r_text[61] = "https://i.ibb.co/BLmQWf6/IMG-20200702-WA0345-Copy-Copy-Copy.jpg";

r_text[62] = "https://i.ibb.co/CJjXBvr/IMG-20200702-WA0343-Copy-Copy-Copy.jpg";

r_text[63] = "https://i.ibb.co/6Z80Qrr/IMG-20200702-WA0347-Copy-Copy-Copy.jpg";

r_text[64] = "https://i.ibb.co/8XFcjwd/IMG-20200702-WA0346-Copy-Copy-Copy.jpg";

r_text[65] = "https://i.ibb.co/dbgVbLs/IMG-20200702-WA0351-Copy-Copy-Copy.jpg";

r_text[66] = "https://i.ibb.co/Bf1nHph/IMG-20200702-WA0352-Copy-Copy-Copy.jpg";

r_text[67] = "https://i.ibb.co/fDPMKnX/IMG-20200706-WA0076-Copy-Copy-Copy.jpg";

r_text[68] = "https://i.ibb.co/t8fprkY/IMG-20200706-WA0077-Copy-Copy-Copy.jpg";

r_text[69] = "https://i.ibb.co/6FxgBxL/IMG-20200706-WA0079-Copy-Copy-Copy.jpg";

r_text[70] = "https://i.ibb.co/1nmYD48/IMG-20200706-WA0080-Copy-Copy-Copy.jpg";

r_text[71] = "https://i.ibb.co/N7Jbtyq/IMG-20200706-WA0082-Copy-Copy-Copy.jpg";

r_text[72] = "https://i.ibb.co/7YzHyjx/IMG-20200706-WA0088-Copy-Copy-Copy.jpg";

r_text[73] = "https://i.ibb.co/h2HtH3B/IMG-20200707-WA0060-Copy-Copy-Copy.jpg";

r_text[74] = "https://i.ibb.co/MBv42SP/IMG-20200707-WA0395-Copy-Copy-Copy.jpg";

r_text[75] = "https://i.ibb.co/SJ3FypW/IMG-20200708-WA0112-Copy-Copy-Copy.jpg";

r_text[76] = "https://i.ibb.co/sRdSmCK/IMG-20200709-WA0177-Copy-Copy-Copy.jpg";

r_text[77] = "https://i.ibb.co/hsR8f14/IMG-20200709-WA0180-Copy-Copy-Copy.jpg";

r_text[78] = "https://i.ibb.co/Df6j5Qp/IMG-20200709-WA0518-Copy-Copy-Copy.jpg";

r_text[79] = "https://i.ibb.co/jkYWQkF/IMG-20200710-WA0202-Copy-Copy-Copy.jpg";

r_text[80] = "https://i.ibb.co/QcrK07N/IMG-20200711-WA0031-Copy-Copy-Copy.jpg";

r_text[81] = "https://i.ibb.co/Bt330Ff/IMG-20200711-WA0032-Copy-Copy-Copy.jpg";

r_text[82] = "https://i.ibb.co/m5FSL1T/IMG-20200711-WA0243-Copy-Copy-Copy.jpg";

r_text[83] = "https://i.ibb.co/PGY2fhq/IMG-20200711-WA0035-Copy-Copy-Copy.jpg";

r_text[84] = "https://i.ibb.co/0cHxy6p/IMG-20200712-WA0307-Copy-Copy-Copy.jpg";

r_text[85] = "https://i.ibb.co/NNg7FjJ/IMG-20200714-WA0087-Copy-Copy.jpg";

r_text[86] = "https://i.ibb.co/prbgZdh/IMG-20200717-WA0161-Copy-Copy.jpg";

r_text[87] = "https://i.ibb.co/2hw3sfX/IMG-20200718-WA0271-Copy-Copy.jpg";

r_text[88] = "https://i.ibb.co/XL7Kx9N/IMG-20200718-WA0272-Copy-Copy.jpg";

r_text[89] = "https://i.ibb.co/27kSksQ/IMG-20200719-WA0013-Copy-Copy.jpg";

r_text[90] = "https://i.ibb.co/6JcK4M5/IMG-20200719-WA0014-Copy-Copy.jpg";

r_text[91] = "https://i.ibb.co/dDPSrkT/IMG-20200719-WA0015-Copy-Copy.jpg";

r_text[92] = "https://i.ibb.co/fdsTRm5/IMG-20200719-WA0065-Copy-Copy.jpg";

r_text[93] = "https://i.ibb.co/L59ZZjc/IMG-20200719-WA0074-Copy-Copy.jpg";

r_text[94] = "https://i.ibb.co/5jNJvfj/IMG-20200719-WA0076-Copy-Copy.jpg";

r_text[95] = "https://i.ibb.co/T14s1g8/IMG-20200719-WA0481-Copy-Copy.jpg";

r_text[96] = "https://i.ibb.co/0qbjkf7/IMG-20200720-WA0001-Copy.jpg";

r_text[97] = "https://i.ibb.co/3StdK5s/IMG-20200720-WA0002-Copy.jpg";

r_text[98] = "https://i.ibb.co/LCmWym6/IMG-20200720-WA0003-Copy.jpg";

r_text[99] = "https://i.ibb.co/r7YbwvX/IMG-20200720-WA0004-Copy.jpg";

r_text[100] = "https://i.ibb.co/17RTHTC/IMG-20200720-WA0017-Copy.jpg";

r_text[101] = "https://i.ibb.co/R45HkX5/IMG-20200720-WA0005-Copy.jpg";

r_text[102] = "https://i.ibb.co/xfMpgLQ/IMG-20200721-WA0029-Copy.jpg";

r_text[103] = "https://i.ibb.co/5K2M3r4/IMG-20200721-WA0003-Copy.jpg";

r_text[104] = "https://i.ibb.co/QX2yTrc/IMG-20200728-WA0053-Copy.jpg";

r_text[105] = "https://i.ibb.co/hXnCwWm/IMG-20200723-WA0139-Copy.jpg";

r_text[106] = "https://i.ibb.co/DYmgTFh/IMG-20200728-WA0056-Copy.jpg";

r_text[107] = "https://i.ibb.co/QQX8swx/IMG-20200728-WA0054-Copy.jpg";

r_text[108] = "https://i.ibb.co/2qDG6PL/IMG-20200728-WA0161-Copy.jpg";

r_text[109] = "https://i.ibb.co/1rywXPn/IMG-20200728-WA0169-Copy.jpg";

r_text[110] = "https://i.ibb.co/wWGVk6n/IMG-20200728-WA0188-Copy.jpg";

r_text[111] = "https://i.ibb.co/Ss812cV/IMG-20200729-WA0063-Copy.jpg";

r_text[112] = "https://i.ibb.co/VJn8Wsr/IMG-20200729-WA0126-Copy.jpg";

r_text[113] = "https://i.ibb.co/ncFRMtg/IMG-20200729-WA0129-Copy.jpg";

r_text[114] = "https://i.ibb.co/MZYcRPk/IMG-20200729-WA0130-Copy.jpg";

r_text[115] = "https://i.ibb.co/mJctgds/IMG-20200729-WA0290-Copy.jpg";

r_text[116] = "https://i.ibb.co/yn86RLd/IMG-20200729-WA0295-Copy.jpg";

r_text[117] = "https://i.ibb.co/KN3MdwS/IMG-20200730-WA0010-Copy.jpg";

r_text[118] = "https://i.ibb.co/qmnPRwV/IMG-20200730-WA0008-Copy.jpg";

r_text[119] = "https://i.ibb.co/zbkwrWD/IMG-20200730-WA0011-Copy.jpg";

r_text[120] = "https://i.ibb.co/mbPjfKP/IMG-20200730-WA0028-Copy.jpg";

r_text[121] = "https://i.ibb.co/gdGBdHq/IMG-20200730-WA0081-Copy.jpg";

r_text[122] = "https://i.ibb.co/TP2X8cV/IMG-20200730-WA0100-Copy.jpg";

r_text[123] = "https://i.ibb.co/2NTFnLX/IMG-20200731-WA0216-Copy.jpg";

r_text[124] = "https://i.ibb.co/gV91GgY/IMG-20200731-WA0217.jpg";

r_text[125] = "https://i.ibb.co/Y7mJkk1/IMG-20200731-WA0218.jpg";

r_text[126] = "https://i.ibb.co/6tkWT4W/IMG-20200731-WA0219.jpg";

r_text[127] = "https://i.ibb.co/QNnYmxx/IMG-20200731-WA0220.jpg";

r_text[128] = "https://i.ibb.co/CMhp6h6/IMG-20200731-WA0221.jpg";

r_text[129] = "https://i.ibb.co/8sGsP20/IMG-20200731-WA0318.jpg";

r_text[130] = "https://i.ibb.co/98J1pNt/IMG-20200801-WA0022.jpg";

r_text[131] = "https://i.ibb.co/Pj9cP1b/IMG-20200801-WA0078.jpg";

r_text[132] = "https://i.ibb.co/FBX4QTj/IMG-20200801-WA0079.jpg";

r_text[134] = "https://i.ibb.co/NS2RCBK/IMG-20200802-WA0098.jpg";

r_text[135] = "https://i.ibb.co/8xg3Nqh/IMG-20200802-WA0114.jpg";

r_text[136] = "https://i.ibb.co/dpcSGkB/IMG-20200802-WA0145.jpg";

r_text[137] = "https://i.ibb.co/4mVhtSk/IMG-20200802-WA0148.jpg";

r_text[138] = "https://i.ibb.co/9YTyntc/IMG-20200802-WA0157.jpg";

r_text[139] = "https://i.ibb.co/kD1jTdn/IMG-20200802-WA0169.jpg";

r_text[140] = "https://i.ibb.co/71vrx9r/IMG-20200802-WA0170.jpg";

r_text[141] = "https://i.ibb.co/VSw4vzL/IMG-20200802-WA0171.jpg";

r_text[142] = "https://i.ibb.co/6y7yPN0/IMG-20200802-WA0508.jpg";

r_text[143] = "https://i.ibb.co/BZz60vX/IMG-20200802-WA0518.jpg";

r_text[144] = "https://i.ibb.co/x2r6D6J/IMG-20200802-WA0514.jpg";

r_text[145] = "https://i.ibb.co/XYBc9CX/IMG-20200803-WA0055.jpg";

r_text[146] = "https://i.ibb.co/6HCd8zF/IMG-20200803-WA0099.jpg";

r_text[147] = "https://i.ibb.co/YQ2wn0p/IMG-20200803-WA0140.jpg";

r_text[148] = "https://i.ibb.co/bgscVpv/IMG-20200803-WA0144.jpg";

r_text[149] = "https://i.ibb.co/LdKpzgk/IMG-20200803-WA0158.jpg";

r_text[150] = "https://i.ibb.co/SckpWZS/IMG-20200803-WA0269.jpg";

r_text[151] = "https://i.ibb.co/9vJLZWB/IMG-20200803-WA0394.jpg";

r_text[152] = "https://i.ibb.co/gFKkTYb/rashmika-mandanna-20200228-0001.jpg";

r_text[153] = "https://i.ibb.co/RCDjNfg/rashmika-mandanna-20200228-0002.jpg";

r_text[154] = "https://i.ibb.co/ZH1rBDj/rashmika-mandanna-20200228-0003.jpg";

r_text[155] = "https://i.ibb.co/9sXhwS3/rashmika-mandanna-20200228-0006.jpg";

r_text[156] = "https://i.ibb.co/hCLxxmZ/rashmika-mandanna-20200228-0008.jpg";

r_text[157] = "https://i.ibb.co/c6YQZ15/rashmika-mandanna-20200228-0009.jpg";

r_text[158] = "https://i.ibb.co/h71D0fd/rashmika-mandanna-20200228-0010.jpg";

r_text[159] = "https://i.ibb.co/drFYjyJ/rashmika-mandanna-20200228-0011.jpg";

r_text[160] = "https://i.ibb.co/4JDcCY5/rashmika-mandanna-20200228-0013.jpg";

r_text[161] = "https://i.ibb.co/8MDvWfQ/rashmika-mandanna-20200228-0014.jpg";

r_text[162] = "https://i.ibb.co/QYVfYs3/rashmika-mandanna-20200228-0015.jpg";

r_text[163] = "https://i.ibb.co/gTbR4KT/rashmika-mandanna-20200228-0016.jpg";

r_text[164] = "https://i.ibb.co/xSYMxvr/rashmika-mandanna-20200228-0017.jpg";

r_text[165] = "https://i.ibb.co/pxb86j4/rashmika-mandanna-20200228-0018.jpg";

r_text[166] = "https://i.ibb.co/ckkxLTt/rashmika-mandanna-20200228-0019.jpg";

r_text[167] = "https://i.ibb.co/n7cxgdh/rashmika-mandanna-20200228-0020.jpg";

r_text[168] = "https://i.ibb.co/bd3Qfwd/rashmika-mandanna-20200228-0021.jpg";

r_text[169] = "https://i.ibb.co/x24DT7f/rashmika-mandanna-20200228-0022.jpg";

r_text[170] = "https://i.ibb.co/zxQsNWG/rashmika-mandanna-20200228-0023.jpg";

r_text[171] = "https://i.ibb.co/Nnx6YTV/rashmika-mandanna-20200228-0025.jpg";

r_text[172] = "https://i.ibb.co/zXkxjGv/rashmika-mandanna-20200228-0029.jpg";

r_text[173] = "https://i.ibb.co/tQBSK3s/rashmika-mandanna-20200228-0030.jpg";

r_text[174] = "https://i.ibb.co/gSdVRRq/rashmika-mandanna-20200228-0031.jpg";

r_text[175] = "https://i.ibb.co/k8HkTr9/rashmika-mandanna-20200228-0036.jpg";

r_text[176] = "https://i.ibb.co/Z1VGT9y/rashmika-mandanna-20200228-0038.jpg";

r_text[177] = "https://i.ibb.co/jLJsSCz/rashmika-mandanna-20200228-0039.jpg";

r_text[178] = "https://i.ibb.co/Cz1prPn/rashmika-mandanna-20200228-0040.jpg";

r_text[179] = "https://i.ibb.co/wS2fXjM/rashmika-mandanna-20200228-0041.jpg";

r_text[180] = "https://i.ibb.co/vzRSCnP/rashmika-mandanna-20200304-0001.jpg";

r_text[181] = "https://i.ibb.co/Z8RhCgL/rashmika-mandanna-20200304-0011.jpg";

r_text[182] = "https://i.ibb.co/VqTxCFc/rashmika-mandanna-20200304-0015.jpg";

r_text[183] = "https://i.ibb.co/Yt1RTcR/rashmika-mandanna-20200304-0017.jpg";

r_text[184] = "https://i.ibb.co/kX0XvGQ/rashmika-mandanna-20200304-0019.jpg";

r_text[185] = "https://i.ibb.co/ZLrqyGd/rashmika-mandanna-20200304-0020.jpg";

r_text[186] = "https://i.ibb.co/dQ0bqxJ/rashmika-mandanna-20200304-0021.jpg";

r_text[187] = "https://i.ibb.co/kgK4h2S/rashmika-mandanna-20200304-0023.jpg";

r_text[188] = "https://i.ibb.co/6vwCzrV/rashmika-mandanna-20200304-0024.jpg";

r_text[189] = "https://i.ibb.co/V2swDdd/rashmika-mandanna-20200304-0025-1.jpg";

r_text[190] = "https://i.ibb.co/5GdFcsN/rashmika-mandanna-20200304-0026.jpg";

r_text[191] = "https://i.ibb.co/NKDBgZZ/rashmika-mandanna-20200304-0030.jpg";

r_text[192] = "https://i.ibb.co/4N2Cpq7/rashmika-mandanna-20200304-0031.jpg";

r_text[193] = "https://i.ibb.co/dBLqZMD/rashmika-mandanna-20200304-0033.jpg";

r_text[194] = "https://i.ibb.co/0Jnhgd7/rashmika-mandanna-20200304-0034.jpg";

r_text[195] = "https://i.ibb.co/0DDN2Cp/rashmika-mandanna-20200304-0035.jpg";

r_text[196] = "https://i.ibb.co/1XNcvLM/rashmika-mandanna-20200304-0036.jpg";

r_text[197] = "https://i.ibb.co/HxCwVNh/rashmika-mandanna-20200304-0037.jpg";

r_text[198] = "https://i.ibb.co/GJxWC68/rashmika-mandanna-20200304-0045.jpg";

r_text[199] = "https://i.ibb.co/1mGJ6mV/rashmika-mandanna-20200304-0046.jpg";

r_text[200] = "https://i.ibb.co/qjySbDs/rashmika-mandanna-20200304-0051.jpg";

var i = Math.floor(200*Math.random())

    var respoimage = await axios.get(`${r_text[i]}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.png, caption: Config.ALL})

    }));

}

else if (Config.WORKTYPE == 'public') {

    Asena.addCommand({pattern: 'rashmika', fromMe: false, desc:'random rashmika images '}, (async (message, match) => {

    var r_text = new Array ();

r_text[0] = "https://i.ibb.co/Lpbn4yn/024eb6b7ed350a59d7c69cc2d20c628f.jpg";

r_text[1] = "https://i.ibb.co/yBk8hwY/04ea393be2184b0a570f21623fe61ad5.jpg";

r_text[2] = "https://i.ibb.co/gRqPLNZ/32d036804e12b96c0c01c15fde4d4afd.jpg";

r_text[3] = "https://i.ibb.co/BNHMyMR/20200319-100444-Copy-Copy-Copy-Copy.jpg";

r_text[4] = "https://i.ibb.co/ckHytNP/20200402-201324-Copy-Copy-Copy.jpg";

r_text[5] = "https://i.ibb.co/PT42NYJ/78354966c6869622f5a4b87eeba23686.jpg";

r_text[6] = "https://i.ibb.co/f4y50Jf/20200402-201442-Copy-Copy.jpg";

r_text[7] = "https://i.ibb.co/dGYPBP1/a-a-O-O-O-a-a-20200625-164032-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[8] = "https://i.ibb.co/TkF09V4/a-a-O-O-O-a-a-20200625-164105-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[9] = "https://i.ibb.co/ysnJPV6/a-a-O-O-O-a-a-20200625-164129-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[10] = "https://i.ibb.co/r0xrwNY/a-a-O-O-O-a-a-20200625-164148-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[11] = "https://i.ibb.co/c21Ybc4/a-a-O-O-O-a-a-20200625-164211-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[12] = "https://i.ibb.co/0FbQfG6/a-a-O-O-O-a-a-20200625-164239-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[13] = "https://i.ibb.co/mGqV62N/images-41-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[14] = "https://i.ibb.co/HFzJKgc/a9ea425545322528eec75016abb0243b-Copy-Copy-Copy-Copy-Copy.jpg";

r_text[15] = "https://i.ibb.co/PDpYh5S/IMG-20200618-WA0470-Copy-Copy-Copy-Copy.jpg";

r_text[16] = "https://i.ibb.co/NnXF007/Screenshot-20200522-175530-Instagram-Copy-Copy.jpg";

r_text[17] = "https://i.ibb.co/cxJbdhW/Screenshot-20200522-175543-Instagram-Copy-Copy.jpg";

r_text[18] = "https://i.ibb.co/7CWDgN2/Screenshot-20200522-175728-Instagram-Copy-Copy.jpg";

r_text[19] = "https://i.ibb.co/y5hntd8/Screenshot-20200522-175754-Instagram-Copy-Copy.jpg";

r_text[20] = "https://i.ibb.co/3fxC5P1/Screenshot-20200524-172446-Instagram-Copy-Copy.jpg";

r_text[21] = "https://i.ibb.co/Lv8tfW6/Screenshot-20200524-172538-Instagram-Copy-Copy.jpg";

r_text[22] = "https://i.ibb.co/Kz8jSpC/Screenshot-20200524-172931-Instagram-Copy.jpg";

r_text[23] = "https://i.ibb.co/pJVMHq4/Screenshot-20200524-172943-Instagram-Copy.jpg";

r_text[24] = "https://i.ibb.co/xJhkrJX/Screenshot-20200524-173022-Instagram.jpg";

r_text[25] = "https://i.ibb.co/34sSy31/Screenshot-20200524-173202-Instagram.jpg";

r_text[26] = "https://i.ibb.co/2Nn0L41/Screenshot-20200602-122842-Instagram-Copy.jpg";

r_text[27] = "https://i.ibb.co/KsK3fcj/Screenshot-20200602-123032-Instagram-Copy.jpg";

r_text[28] = "https://i.ibb.co/899KdHM/Screenshot-20200602-123113-Instagram-Copy.jpg";

r_text[29] = "https://i.ibb.co/DRtbVr6/Screenshot-20200602-123128-Instagram-Copy.jpg";

r_text[30] = "https://i.ibb.co/b3YtYNg/Screenshot-20200602-123324-Instagram.jpg";

r_text[31] = "https://i.ibb.co/64dThdN/Screenshot-20200602-123405-Instagram.jpg";

r_text[32] = "https://i.ibb.co/5rXJMVj/Screenshot-20200602-123424-Instagram.jpg";

r_text[33] = "https://i.ibb.co/8gvwVZZ/Screenshot-20200602-123507-Instagram.jpg";

r_text[34] = "https://i.ibb.co/MyTrtD6/Screenshot-20200602-123541-Instagram.jpg";

r_text[35] = "https://i.ibb.co/q5B74Xk/Screenshot-20200604-093917-Instagram.jpg";

r_text[36] = "https://i.ibb.co/M9spg7V/Screenshot-20200604-100232-Instagram.jpg";

r_text[37] = "https://i.ibb.co/g3bhhkN/Screenshot-20200604-210412-Instagram.jpg";

r_text[38] = "https://i.ibb.co/vvCgPTx/Screenshot-20200608-080746-Instagram.jpg";

r_text[39] = "https://i.ibb.co/C9MK1bc/Screenshot-20200608-080817-Instagram.jpg";

r_text[40] = "https://i.ibb.co/12c5Kt7/Screenshot-20200608-080859-Instagram.jpg";

r_text[41] = "https://i.ibb.co/3YG67f1/Screenshot-20200619-090518-Instagram.jpg";

r_text[42] = "https://i.ibb.co/sFkXvHN/Screenshot-20200621-091153-Chrome.jpg";

r_text[43] = "https://i.ibb.co/fHP6vxm/Screenshot-20200621-091249-Chrome.jpg";

r_text[44] = "https://i.ibb.co/q93Trnk/Screenshot-20200627-090513-Instagram.jpg";

r_text[45] = "https://i.ibb.co/9V32nkm/IMG-20200619-WA0023-Copy-Copy-Copy-Copy.jpg";

r_text[46] = "https://i.ibb.co/XxW758m/IMG-20200622-WA0128-Copy-Copy-Copy-Copy.jpg";

r_text[47] = "https://i.ibb.co/VJ2s9y9/IMG-20200622-WA0131-Copy-Copy-Copy-Copy.jpg";

r_text[48] = "https://i.ibb.co/LY5HPLV/IMG-20200622-WA0134-Copy-Copy-Copy-Copy.jpg";

r_text[49] = "https://i.ibb.co/SsrG2JX/IMG-20200622-WA0137-Copy-Copy-Copy-Copy.jpg";

r_text[50] = "https://i.ibb.co/88rcsPD/IMG-20200623-WA0020-Copy-Copy-Copy.jpg";

r_text[51] = "https://i.ibb.co/ZmFJ6QY/IMG-20200623-WA0021-Copy-Copy-Copy.jpg";

r_text[52] = "https://i.ibb.co/729tx2x/IMG-20200623-WA0062-Copy-Copy-Copy.jpg";

r_text[53] = "https://i.ibb.co/kBZ5vfs/IMG-20200623-WA0064-Copy-Copy-Copy.jpg";

r_text[54] = "https://i.ibb.co/VLrKVDs/IMG-20200623-WA0069-Copy-Copy-Copy.jpg";

r_text[55] = "https://i.ibb.co/KX1mFCY/IMG-20200623-WA0218-Copy-Copy-Copy.jpg";

r_text[56] = "https://i.ibb.co/DzqJJXz/IMG-20200624-WA0026-Copy-Copy-Copy.jpg";

r_text[57] = "https://i.ibb.co/JxM4KzS/IMG-20200624-WA0037-Copy-Copy-Copy.jpg";

r_text[58] = "https://i.ibb.co/J25J7kV/IMG-20200701-WA0008-Copy-Copy-Copy.jpg";

r_text[59] = "https://i.ibb.co/sRHcXnC/IMG-20200701-WA0272-Copy-Copy-Copy.jpg";

r_text[60] = "https://i.ibb.co/JjnKg4F/IMG-20200702-WA0342-Copy-Copy-Copy.jpg";

r_text[61] = "https://i.ibb.co/BLmQWf6/IMG-20200702-WA0345-Copy-Copy-Copy.jpg";

r_text[62] = "https://i.ibb.co/CJjXBvr/IMG-20200702-WA0343-Copy-Copy-Copy.jpg";

r_text[63] = "https://i.ibb.co/6Z80Qrr/IMG-20200702-WA0347-Copy-Copy-Copy.jpg";

r_text[64] = "https://i.ibb.co/8XFcjwd/IMG-20200702-WA0346-Copy-Copy-Copy.jpg";

r_text[65] = "https://i.ibb.co/dbgVbLs/IMG-20200702-WA0351-Copy-Copy-Copy.jpg";

r_text[66] = "https://i.ibb.co/Bf1nHph/IMG-20200702-WA0352-Copy-Copy-Copy.jpg";

r_text[67] = "https://i.ibb.co/fDPMKnX/IMG-20200706-WA0076-Copy-Copy-Copy.jpg";

r_text[68] = "https://i.ibb.co/t8fprkY/IMG-20200706-WA0077-Copy-Copy-Copy.jpg";

r_text[69] = "https://i.ibb.co/6FxgBxL/IMG-20200706-WA0079-Copy-Copy-Copy.jpg";

r_text[70] = "https://i.ibb.co/1nmYD48/IMG-20200706-WA0080-Copy-Copy-Copy.jpg";

r_text[71] = "https://i.ibb.co/N7Jbtyq/IMG-20200706-WA0082-Copy-Copy-Copy.jpg";

r_text[72] = "https://i.ibb.co/7YzHyjx/IMG-20200706-WA0088-Copy-Copy-Copy.jpg";

r_text[73] = "https://i.ibb.co/h2HtH3B/IMG-20200707-WA0060-Copy-Copy-Copy.jpg";

r_text[74] = "https://i.ibb.co/MBv42SP/IMG-20200707-WA0395-Copy-Copy-Copy.jpg";

r_text[75] = "https://i.ibb.co/SJ3FypW/IMG-20200708-WA0112-Copy-Copy-Copy.jpg";

r_text[76] = "https://i.ibb.co/sRdSmCK/IMG-20200709-WA0177-Copy-Copy-Copy.jpg";

r_text[77] = "https://i.ibb.co/hsR8f14/IMG-20200709-WA0180-Copy-Copy-Copy.jpg";

r_text[78] = "https://i.ibb.co/Df6j5Qp/IMG-20200709-WA0518-Copy-Copy-Copy.jpg";

r_text[79] = "https://i.ibb.co/jkYWQkF/IMG-20200710-WA0202-Copy-Copy-Copy.jpg";

r_text[80] = "https://i.ibb.co/QcrK07N/IMG-20200711-WA0031-Copy-Copy-Copy.jpg";

r_text[81] = "https://i.ibb.co/Bt330Ff/IMG-20200711-WA0032-Copy-Copy-Copy.jpg";

r_text[82] = "https://i.ibb.co/m5FSL1T/IMG-20200711-WA0243-Copy-Copy-Copy.jpg";

r_text[83] = "https://i.ibb.co/PGY2fhq/IMG-20200711-WA0035-Copy-Copy-Copy.jpg";

r_text[84] = "https://i.ibb.co/0cHxy6p/IMG-20200712-WA0307-Copy-Copy-Copy.jpg";

r_text[85] = "https://i.ibb.co/NNg7FjJ/IMG-20200714-WA0087-Copy-Copy.jpg";

r_text[86] = "https://i.ibb.co/prbgZdh/IMG-20200717-WA0161-Copy-Copy.jpg";

r_text[87] = "https://i.ibb.co/2hw3sfX/IMG-20200718-WA0271-Copy-Copy.jpg";

r_text[88] = "https://i.ibb.co/XL7Kx9N/IMG-20200718-WA0272-Copy-Copy.jpg";

r_text[89] = "https://i.ibb.co/27kSksQ/IMG-20200719-WA0013-Copy-Copy.jpg";

r_text[90] = "https://i.ibb.co/6JcK4M5/IMG-20200719-WA0014-Copy-Copy.jpg";

r_text[91] = "https://i.ibb.co/dDPSrkT/IMG-20200719-WA0015-Copy-Copy.jpg";

r_text[92] = "https://i.ibb.co/fdsTRm5/IMG-20200719-WA0065-Copy-Copy.jpg";

r_text[93] = "https://i.ibb.co/L59ZZjc/IMG-20200719-WA0074-Copy-Copy.jpg";

r_text[94] = "https://i.ibb.co/5jNJvfj/IMG-20200719-WA0076-Copy-Copy.jpg";

r_text[95] = "https://i.ibb.co/T14s1g8/IMG-20200719-WA0481-Copy-Copy.jpg";

r_text[96] = "https://i.ibb.co/0qbjkf7/IMG-20200720-WA0001-Copy.jpg";

r_text[97] = "https://i.ibb.co/3StdK5s/IMG-20200720-WA0002-Copy.jpg";

r_text[98] = "https://i.ibb.co/LCmWym6/IMG-20200720-WA0003-Copy.jpg";

r_text[99] = "https://i.ibb.co/r7YbwvX/IMG-20200720-WA0004-Copy.jpg";

r_text[100] = "https://i.ibb.co/17RTHTC/IMG-20200720-WA0017-Copy.jpg";

r_text[101] = "https://i.ibb.co/R45HkX5/IMG-20200720-WA0005-Copy.jpg";

r_text[102] = "https://i.ibb.co/xfMpgLQ/IMG-20200721-WA0029-Copy.jpg";

r_text[103] = "https://i.ibb.co/5K2M3r4/IMG-20200721-WA0003-Copy.jpg";

r_text[104] = "https://i.ibb.co/QX2yTrc/IMG-20200728-WA0053-Copy.jpg";

r_text[105] = "https://i.ibb.co/hXnCwWm/IMG-20200723-WA0139-Copy.jpg";

r_text[106] = "https://i.ibb.co/DYmgTFh/IMG-20200728-WA0056-Copy.jpg";

r_text[107] = "https://i.ibb.co/QQX8swx/IMG-20200728-WA0054-Copy.jpg";

r_text[108] = "https://i.ibb.co/2qDG6PL/IMG-20200728-WA0161-Copy.jpg";

r_text[109] = "https://i.ibb.co/1rywXPn/IMG-20200728-WA0169-Copy.jpg";

r_text[110] = "https://i.ibb.co/wWGVk6n/IMG-20200728-WA0188-Copy.jpg";

r_text[111] = "https://i.ibb.co/Ss812cV/IMG-20200729-WA0063-Copy.jpg";

r_text[112] = "https://i.ibb.co/VJn8Wsr/IMG-20200729-WA0126-Copy.jpg";

r_text[113] = "https://i.ibb.co/ncFRMtg/IMG-20200729-WA0129-Copy.jpg";

r_text[114] = "https://i.ibb.co/MZYcRPk/IMG-20200729-WA0130-Copy.jpg";

r_text[115] = "https://i.ibb.co/mJctgds/IMG-20200729-WA0290-Copy.jpg";

r_text[116] = "https://i.ibb.co/yn86RLd/IMG-20200729-WA0295-Copy.jpg";

r_text[117] = "https://i.ibb.co/KN3MdwS/IMG-20200730-WA0010-Copy.jpg";

r_text[118] = "https://i.ibb.co/qmnPRwV/IMG-20200730-WA0008-Copy.jpg";

r_text[119] = "https://i.ibb.co/zbkwrWD/IMG-20200730-WA0011-Copy.jpg";

r_text[120] = "https://i.ibb.co/mbPjfKP/IMG-20200730-WA0028-Copy.jpg";

r_text[121] = "https://i.ibb.co/gdGBdHq/IMG-20200730-WA0081-Copy.jpg";

r_text[122] = "https://i.ibb.co/TP2X8cV/IMG-20200730-WA0100-Copy.jpg";

r_text[123] = "https://i.ibb.co/2NTFnLX/IMG-20200731-WA0216-Copy.jpg";

r_text[124] = "https://i.ibb.co/gV91GgY/IMG-20200731-WA0217.jpg";

r_text[125] = "https://i.ibb.co/Y7mJkk1/IMG-20200731-WA0218.jpg";

r_text[126] = "https://i.ibb.co/6tkWT4W/IMG-20200731-WA0219.jpg";

r_text[127] = "https://i.ibb.co/QNnYmxx/IMG-20200731-WA0220.jpg";

r_text[128] = "https://i.ibb.co/CMhp6h6/IMG-20200731-WA0221.jpg";

r_text[129] = "https://i.ibb.co/8sGsP20/IMG-20200731-WA0318.jpg";

r_text[130] = "https://i.ibb.co/98J1pNt/IMG-20200801-WA0022.jpg";

r_text[131] = "https://i.ibb.co/Pj9cP1b/IMG-20200801-WA0078.jpg";

r_text[132] = "https://i.ibb.co/FBX4QTj/IMG-20200801-WA0079.jpg";

r_text[134] = "https://i.ibb.co/NS2RCBK/IMG-20200802-WA0098.jpg";

r_text[135] = "https://i.ibb.co/8xg3Nqh/IMG-20200802-WA0114.jpg";

r_text[136] = "https://i.ibb.co/dpcSGkB/IMG-20200802-WA0145.jpg";

r_text[137] = "https://i.ibb.co/4mVhtSk/IMG-20200802-WA0148.jpg";

r_text[138] = "https://i.ibb.co/9YTyntc/IMG-20200802-WA0157.jpg";

r_text[139] = "https://i.ibb.co/kD1jTdn/IMG-20200802-WA0169.jpg";

r_text[140] = "https://i.ibb.co/71vrx9r/IMG-20200802-WA0170.jpg";

r_text[141] = "https://i.ibb.co/VSw4vzL/IMG-20200802-WA0171.jpg";

r_text[142] = "https://i.ibb.co/6y7yPN0/IMG-20200802-WA0508.jpg";

r_text[143] = "https://i.ibb.co/BZz60vX/IMG-20200802-WA0518.jpg";

r_text[144] = "https://i.ibb.co/x2r6D6J/IMG-20200802-WA0514.jpg";

r_text[145] = "https://i.ibb.co/XYBc9CX/IMG-20200803-WA0055.jpg";

r_text[146] = "https://i.ibb.co/6HCd8zF/IMG-20200803-WA0099.jpg";

r_text[147] = "https://i.ibb.co/YQ2wn0p/IMG-20200803-WA0140.jpg";

r_text[148] = "https://i.ibb.co/bgscVpv/IMG-20200803-WA0144.jpg";

r_text[149] = "https://i.ibb.co/LdKpzgk/IMG-20200803-WA0158.jpg";

r_text[150] = "https://i.ibb.co/SckpWZS/IMG-20200803-WA0269.jpg";

r_text[151] = "https://i.ibb.co/9vJLZWB/IMG-20200803-WA0394.jpg";

r_text[152] = "https://i.ibb.co/gFKkTYb/rashmika-mandanna-20200228-0001.jpg";

r_text[153] = "https://i.ibb.co/RCDjNfg/rashmika-mandanna-20200228-0002.jpg";

r_text[154] = "https://i.ibb.co/ZH1rBDj/rashmika-mandanna-20200228-0003.jpg";

r_text[155] = "https://i.ibb.co/9sXhwS3/rashmika-mandanna-20200228-0006.jpg";

r_text[156] = "https://i.ibb.co/hCLxxmZ/rashmika-mandanna-20200228-0008.jpg";

r_text[157] = "https://i.ibb.co/c6YQZ15/rashmika-mandanna-20200228-0009.jpg";

r_text[158] = "https://i.ibb.co/h71D0fd/rashmika-mandanna-20200228-0010.jpg";

r_text[159] = "https://i.ibb.co/drFYjyJ/rashmika-mandanna-20200228-0011.jpg";

r_text[160] = "https://i.ibb.co/4JDcCY5/rashmika-mandanna-20200228-0013.jpg";

r_text[161] = "https://i.ibb.co/8MDvWfQ/rashmika-mandanna-20200228-0014.jpg";

r_text[162] = "https://i.ibb.co/QYVfYs3/rashmika-mandanna-20200228-0015.jpg";

r_text[163] = "https://i.ibb.co/gTbR4KT/rashmika-mandanna-20200228-0016.jpg";

r_text[164] = "https://i.ibb.co/xSYMxvr/rashmika-mandanna-20200228-0017.jpg";

r_text[165] = "https://i.ibb.co/pxb86j4/rashmika-mandanna-20200228-0018.jpg";

r_text[166] = "https://i.ibb.co/ckkxLTt/rashmika-mandanna-20200228-0019.jpg";

r_text[167] = "https://i.ibb.co/n7cxgdh/rashmika-mandanna-20200228-0020.jpg";

r_text[168] = "https://i.ibb.co/bd3Qfwd/rashmika-mandanna-20200228-0021.jpg";

r_text[169] = "https://i.ibb.co/x24DT7f/rashmika-mandanna-20200228-0022.jpg";

r_text[170] = "https://i.ibb.co/zxQsNWG/rashmika-mandanna-20200228-0023.jpg";

r_text[171] = "https://i.ibb.co/Nnx6YTV/rashmika-mandanna-20200228-0025.jpg";

r_text[172] = "https://i.ibb.co/zXkxjGv/rashmika-mandanna-20200228-0029.jpg";

r_text[173] = "https://i.ibb.co/tQBSK3s/rashmika-mandanna-20200228-0030.jpg";

r_text[174] = "https://i.ibb.co/gSdVRRq/rashmika-mandanna-20200228-0031.jpg";

r_text[175] = "https://i.ibb.co/k8HkTr9/rashmika-mandanna-20200228-0036.jpg";

r_text[176] = "https://i.ibb.co/Z1VGT9y/rashmika-mandanna-20200228-0038.jpg";

r_text[177] = "https://i.ibb.co/jLJsSCz/rashmika-mandanna-20200228-0039.jpg";

r_text[178] = "https://i.ibb.co/Cz1prPn/rashmika-mandanna-20200228-0040.jpg";

r_text[179] = "https://i.ibb.co/wS2fXjM/rashmika-mandanna-20200228-0041.jpg";

r_text[180] = "https://i.ibb.co/vzRSCnP/rashmika-mandanna-20200304-0001.jpg";

r_text[181] = "https://i.ibb.co/Z8RhCgL/rashmika-mandanna-20200304-0011.jpg";

r_text[182] = "https://i.ibb.co/VqTxCFc/rashmika-mandanna-20200304-0015.jpg";

r_text[183] = "https://i.ibb.co/Yt1RTcR/rashmika-mandanna-20200304-0017.jpg";

r_text[184] = "https://i.ibb.co/kX0XvGQ/rashmika-mandanna-20200304-0019.jpg";

r_text[185] = "https://i.ibb.co/ZLrqyGd/rashmika-mandanna-20200304-0020.jpg";

r_text[186] = "https://i.ibb.co/dQ0bqxJ/rashmika-mandanna-20200304-0021.jpg";

r_text[187] = "https://i.ibb.co/kgK4h2S/rashmika-mandanna-20200304-0023.jpg";

r_text[188] = "https://i.ibb.co/6vwCzrV/rashmika-mandanna-20200304-0024.jpg";

r_text[189] = "https://i.ibb.co/V2swDdd/rashmika-mandanna-20200304-0025-1.jpg";

r_text[190] = "https://i.ibb.co/5GdFcsN/rashmika-mandanna-20200304-0026.jpg";

r_text[191] = "https://i.ibb.co/NKDBgZZ/rashmika-mandanna-20200304-0030.jpg";

r_text[192] = "https://i.ibb.co/4N2Cpq7/rashmika-mandanna-20200304-0031.jpg";

r_text[193] = "https://i.ibb.co/dBLqZMD/rashmika-mandanna-20200304-0033.jpg";

r_text[194] = "https://i.ibb.co/0Jnhgd7/rashmika-mandanna-20200304-0034.jpg";

r_text[195] = "https://i.ibb.co/0DDN2Cp/rashmika-mandanna-20200304-0035.jpg";

r_text[196] = "https://i.ibb.co/1XNcvLM/rashmika-mandanna-20200304-0036.jpg";

r_text[197] = "https://i.ibb.co/HxCwVNh/rashmika-mandanna-20200304-0037.jpg";

r_text[198] = "https://i.ibb.co/GJxWC68/rashmika-mandanna-20200304-0045.jpg";

r_text[199] = "https://i.ibb.co/1mGJ6mV/rashmika-mandanna-20200304-0046.jpg";

r_text[200] = "https://i.ibb.co/qjySbDs/rashmika-mandanna-20200304-0051.jpg";

    var i = Math.floor(200*Math.random())

    var respoimage = await axios.get(`${r_text[i]}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.png, caption: Config.ALL})

    }));

}
