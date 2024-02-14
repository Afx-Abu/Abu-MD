const {
        Module,
        broadcast
} = require('../lib');


Module({
        pattern: 'bcgroup ?(.*)',
        fromMe: true,
        desc: 'broadcast to all user in specified group',
        type: 'get ban',
        onlyGroup: true
}, async (message, match) => {
if(!message.reply_message.i) return await message.reply("*_please reply to a message you want to broadcast_*");
return await broadcast(message, match, "group");
});

Module({
        pattern: 'bcall ?(.*)',
        fromMe: true,
        desc: 'broadcast to all users',
        type: 'get ban'
}, async (message, match) => {
if(!message.reply_message.i) return await message.reply("*_please reply to a message you want to broadcast_*");
return await broadcast(message, match, "all");
});

Module({
        pattern: 'bcpm ?(.*)',
        fromMe: true,
        desc: 'broadcast to all your pm messages',
        type: 'get ban'
}, async (message, match) => {
if(!message.reply_message.i) return await message.reply("*_please reply to a message you want to broadcast_*");
return await broadcast(message, match, "pm");
});

Module({
        pattern: 'bcongroup ?(.*)',
        fromMe: true,
        desc: 'broadcast to all groups',
        type: 'get ban'
}, async (message, match) => {
if(!message.reply_message.i) return await message.reply("*_please reply to a message you want to broadcast_*");
return await broadcast(message, match, "allgroup");
});
