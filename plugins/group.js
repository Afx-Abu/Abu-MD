const {
	Module,
	isAdmin,
	isBotAdmin,
	getString,
	infoMessage,
	lang,
	groupDB,
	config,
	poll,
	PREFIX
} = require('../lib');


Module({
	pattern: 'promote ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.PROMOTE.DESC
}, async (message, match) => {
	let admin = await isAdmin(message);
	let BotAdmin = await isBotAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	if (!message.reply_message.sender) return message.reply(lang.BASE.NEED.format("user"));
	await message.client.groupParticipantsUpdate(message.jid,
		[message.reply_message.sender], "promote");
	message.reply(lang.GROUP.PROMOTE.INFO.format(`@${message.reply_message.sender.split('@')[0]}`), {
		mentions: [message.reply_message.sender]
	})
});
Module({
	pattern: 'demote ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.DEMOTE.DESC
}, async (message, match) => {
	let admin = await isAdmin(message);
	let BotAdmin = await isBotAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	if (!message.reply_message.sender) return message.reply(lang.BASE.NEED.format("user"));
	await message.client.groupParticipantsUpdate(message.jid,
		[message.reply_message.sender], "demote");
	return await message.reply(lang.GROUP.DEMOTE.INFO.format(`@${message.reply_message.sender.split('@')[0]}`), {
		mentions: [message.reply_message.sender]
	})
});
Module({
	pattern: 'kick ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.KICK.DESC
}, async (message, match) => {
	let admin = await isAdmin(message);
	let BotAdmin = await isBotAdmin(message);
	let user = message.reply_message.sender || match;
	if (!user) return await message.reply(lang.GROUP.KICK.HELP)
	user = user.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
	if (match != "all") {
		if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
		if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
		if (!admin && !message.isCreator) return;
		await message.client.groupParticipantsUpdate(message.jid,
			[user], "remove");
		return await message.reply(lang.GROUP.KICK.INFO.format(`@${user.split('@')[0]}`), {
			mentions: [user]
		});
	} else if (match.toLowerCase() == 'all') {
		if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
		if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
		if (!admin && !message.isCreator) return;
		const groupMetadata = await message.client.groupMetadata(message.jid).catch(e => {})
		const participants = await groupMetadata.participants;
		let admins = await participants.filter(v => v.admin !== null).map(v => v.id);
		participants.filter((U) => !U.admin == true).map(({
			id
		}) => id).forEach(async (k) => {
			await sleep(250);
			await message.client.groupParticipantsUpdate(message.jid,
				[k], "remove");
		});
		return await message.reply('all group Participants will been kicked!')
	}
});
Module({
	pattern: 'add ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.ADD.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	match = message.reply_message.sender || match;
	if (!match) return await message.reply(lang.BASE.NEED.format("user"));
	match = match.replaceAll(' ', '');
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	if (match) {
		let users = match.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
		let info = await message.client.onWhatsApp(users);
		ex = info.map((jid) => jid.jid);
		if (!ex.includes(users)) return await message.reply(lang.GROUP.ADD.NOT_FOUND);
		const su = await message.client.groupParticipantsUpdate(message.jid,
			[users], "add");
		if (su[0].status == 403) {
			message.reply(lang.GROUP.ADD.INVITE);
			return await message.sendGroupInviteMessage(users);
		} else if (su[0].status == 408) {
			await message.reply(lang.GROUP.ADD.LEFTED.format("@" + users.split('@')[0]), {
				mentions: [users]
			})
			const code = await message.client.groupInviteCode(message.jid);
			return await message.client.sendMessage(users, {text: `https://chat.whatsapp.com/${code}`})
		} else if (su[0].status == 401) {
			await message.reply(lang.GROUP.ADD.BLOCKED.format("@" + users.split('@')[0]), {
				mentions: [users]
			})
		} else if (su[0].status == 200) {
			return await message.reply(lang.GROUP.ADD.ADDED.format("@" + users.split('@')[0]), {
				mentions: [users]
			})
		} else if (su[0].status == 409) {
			return await message.reply(lang.GROUP.ADD.ALLREADY.format("@" + users.split('@')[0]), {
				mentions: [users]
			})
		} else {
			return await message.reply(JSON.stringify(su));
		}
	}
});
Module({
	pattern: 'gpp ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.GPP.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	if (!message.reply_message.image) return await message.reply(lang.BASE.NEED.format("image message"));
	let _message = message.reply_message.imageMessage;
	let download = await message.client.downloadMediaMessage(_message);
	await message.client.updateProfilePicture(message.jid, download);
	return message.reply(lang.GROUP.GPP.INFO);
})
Module({
	pattern: 'fullgpp ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.FULL_GPP.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	if (!message.reply_message.image) return await message.reply(lang.BASE.NEED.format("image message"));
	let download = await message.reply_message.download();
	await message.updateProfilePicture(message.jid, download);
	return message.reply(lang.GROUP.FULL_GPP.INFO);
});
Module({
	pattern: 'gname ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.G_NAME.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	if (message.text > 75) return await message.reply(lang.GROUP.G_NAME.LENGTH_OVER)
	let txt = message.text || " ";
	await message.client.groupUpdateSubject(message.jid, txt);
	return await message.reply(lang.GROUP.G_NAME.SUCCESS)
});
Module({
	pattern: 'gdesc ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.G_DESC.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	if (message.text > 400) return await message.reply(lang.GROUP.G_DESC.LENGTH_OVER)
	let txt = match || " ";
	await message.client.groupUpdateDescription(message.jid, txt);
	return await message.reply(lang.GROUP.G_DESC.SUCCESS)
});
Module({
	pattern: 'mute ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.MUTE.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	await message.client.groupSettingUpdate(message.jid, "announcement");
	return await message.reply(lang.GROUP.MUTE.SUCCESS)
});
Module({
	pattern: 'unmute ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.UNMUTE.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	await message.client.groupSettingUpdate(message.jid, "not_announcement");
	return await message.reply(lang.GROUP.UNMUTE.SUCCESS)
});
Module({
	pattern: 'lock ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.LOCK.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	await message.client.groupSettingUpdate(message.jid, "locked");
	return await message.reply(lang.GROUP.LOCK.SUCCESS)
});
Module({
	pattern: 'unlock ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.UNLOCK.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	await message.client.groupSettingUpdate(message.jid, "unlocked");
	return await message.reply(lang.GROUP.UNLOCK.SUCCESS)
});
Module({
	pattern: 'left ?(.*)',
	type: 'group',
	onlyGroup: true,
	desc: lang.GROUP.LEFT.DESC,
	fromMe: true
}, async (message, match) => {
	await message.client.groupLeave(message.jid)
});
Module({
	pattern: 'invite ?(.*)',
	type: 'group',
	onlyGroup: true,
	fromMe: true,
	desc: lang.GROUP.INVITE.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	const code = await message.client.groupInviteCode(message.jid);
	return await message.reply(lang.GROUP.INVITE.INFO.format(`https://chat.whatsapp.com/${code}`))
});
Module({
	pattern: 'revoke ?(.*)',
	type: 'group',
	fromMe: true,
	onlyGroup: true,
	desc: lang.GROUP.REVOKE.DESC
}, async (message, match) => {
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	await message.client.groupRevokeInvite(message.jid);
	return await message.reply(lang.GROUP.REVOKE.INFO)
});
Module({
	pattern: 'join ?(.*)',
	type: 'owner',
	fromMe: true,
	fromMe: true,
	desc: lang.GROUP.ACPT.DESC
}, async (message, match) => {
	if (!match || !match.match(/^https:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9]/)) return await message.reply(lang.GROUP.ACPT.NOT_VALID);
	let urlArray = (match).trim().split("/");
	if (!urlArray[2] == 'chat.whatsapp.com') return await message.reply(lang.BASE.INVALID_URL)
	const response = await message.client.groupAcceptInvite(urlArray[3]);
	return await message.reply(lang.BASE.SUCCESS)
});
Module({
	pattern: 'getinfo ?(.*)',
	type: 'group',
	fromMe: true,
	desc: lang.GROUP.GET_INFO.DESC
}, async (message, match) => {
	match = match || message.reply_message.text;
	const BotAdmin = await isBotAdmin(message);
	const admin = await isAdmin(message);
	if (!BotAdmin) return await message.reply(lang.GROUP.BOT_ADMIN)
	if (!config.ADMIN_SUDO_ACCESS && !message.isCreator) return;
	if (!admin && !message.isCreator) return;
	if (!match || !match.match(/^https:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9]/)) return await message.reply(lang.GROUP.GET_INFO.GIVE_URL);
	let urlArray = (match).trim().split("/")[3];
	const response = await message.client.groupGetInviteInfo(urlArray)
	return await message.reply("_id: " + response.id + lang.GROUP.GET_INFO.INFO.format(response.subject, (response.owner ? response.owner.split('@')[0] : 'unknown'), response.size, response.restrict, response.announce, require('moment-timezone')(response.creation * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss'), response.desc))
});


Module({
	pattern: 'vote|poll ?(.*)',
	desc: 'create a poll message',
	fromMe: true,
	type: "misc",
	onlyGroup: true
}, async (message, match) => {
	if (message.reply_message.i && message.reply_message.type == "pollCreationMessage") {
		const {
			status,
			res,
			total
		} = await poll(message.reply_message.data);
		if (!status) return await message.reply('*Not Found*');
		let msg = "*result*\n\n";
		const obj = Object.keys(res);
		msg += `*total options: ${obj.length}*\n`;
		msg += `*total participates: ${total}*\n\n`;
		obj.map(a => msg += `*${a} :-*\n*_total votes: ${res[a].count}_*\n*_percentage: ${res[a].percentage}_*\n\n`);
		return await message.reply(msg);
	}
	match = message.body.replace(/poll/gi, '').replace(/vote/gi, '').replace(PREFIX, '').trim();
	if (!match || !match.split(/[,|;]/)) return await message.reply(`_*Example:* ${PREFIX}poll title |option1|option2|option3..._\n_*get a poll result:* ${PREFIX}poll_\n_reply to a poll message to get its result_`);
	const options = match.split(/[,|;]/).slice(1);
	const {
		participants
	} = await message.client.groupMetadata(message.jid);
	return await message.send({
		name: match.split(/[,|;]/)[0],
		values: options,
		withPrefix: false,
		onlyOnce: true,
		participates: participants.map(a => a.id),
		selectableCount: true
	}, {}, 'poll');
});


Module({
    pattern: 'pdm ?(.*)',
    desc: 'promote, demote message',
    type: 'manage',
    onlyGroup: true,
    fromMe: true
}, async (message, match) => {
    if (!match) return message.reply('_Pdm Message\non/off');
    if (match != 'on' && match != 'off') return message.reply('pdm on');
    const {pdm} = await groupDB(['pdm'], {jid: message.jid, content: {}}, 'get');
    if (match == 'on') {
        if (pdm == 'true') return message.reply('_Pdm Already activated_');
        await groupDB(['pdm'], {jid: message.jid, content: 'true'}, 'set');
        return await message.reply('_Pdm message activated_')
    } else if (match == 'off') {
        if (pdm == 'false') return message.reply('_Pdm Already Deactivated_');
        await groupDB(['pdm'], {jid: message.jid, content: 'false'}, 'set');
        return await message.reply('_Pdm message deactivated_')
    }
});
