const simpleGit = require('simple-git');
const git = simpleGit();
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const axios = require("axios");
const {
	PassThrough
} = require('stream');
const heroku = new Heroku({
	token: process.env.HEROKU_API_KEY
})
const {
	Module,
	GenListMessage,
	lang
} = require('../lib');

Module({
	pattern: 'update$',
	fromMe: true,
	desc: lang.HEROKU.DESC
}, async (message) => {
	if (!message.text) {
		return await message.reply(`_UPDATER CHECKER_\n_1.Update Now_\n_2.Update Check_\n\n_Send This Command & Update Your Bot_`);
} else if (message.text.includes("now")) {
	await git.fetch();
	let commits = await git.log(['main' + '..origin/' + 'main']);
	if (commits.total === 0) {
		return await message.reply(lang.HEROKU.ALLREDY)
	} else {
		await message.reply("_Starting Update..._");
		let al
		try {
			await heroku.get('/apps/' + process.env.HEROKU_APP_NAME)
		} catch {
			await git.reset("hard", ["HEAD"])
			await git.pull()
			await message.reply("_Successfully updated!_")
			process.exit(0);
		}
		git.fetch('upstream', 'main');
		git.reset('hard', ['FETCH_HEAD']);
		const app = await heroku.get('/apps/' + process.env.HEROKU_APP_NAME)
		const git_url = app.git_url.replace("https://", "https://api:" + process.env.HEROKU_API_KEY + "@")
		try {
			await git.addRemote('heroku', git_url);
		} catch (e) {
			console.log(e)
		}
		await git.push('heroku', 'main');
		return await message.reply("_Successfully Updated_");
	}
} else if (message.text.includes("check")) {
	await git.fetch();
	let commits = await git.log(['main' + '..origin/' + 'main']);
	if (commits.total === 0) {
		return await message.reply(lang.HEROKU.ALLREDY)
	} else {
		let updt = lang.HEROKU.LIST_UPDATE;
		commits['all'].map(
			(commit) => {
				updt += "```" + lang.HEROKU.COMMITS.format(commit.date.substring(0, 10), commit.message, commit.author_name) + "```\n\n";
			});
		return await message.reply(updt);
	}
}
});
