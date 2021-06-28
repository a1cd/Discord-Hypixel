var fs = require('fs');
require('dotenv').config();
const {HypixelAPI} = require('hypixel-api-v2');
const { getLevel } = require('./src/lib/leveling');
const commands = require('command-based-discord')
const Discord = require('discord.js');
const { log, info } = require('console');
const { type } = require('os');
const colors = require('color-name');
const MinecraftAPI = require('minecraft-api');
let Api = new HypixelAPI(process.env.HYPIXELTOKEN);

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN
if (TOKEN == null) {
	console.error("no token provided");
}

bot.login(TOKEN)
/**
 * @type {Discord.TextChannel}
 */
var channel
bot.once("ready", async () => {
	let counts = (await Api.counts()).games
	var list = []
	for (const game in counts) {
		if (Object.hasOwnProperty.call(counts, game)) {
			const count = counts[game].players;
			list.push({count: count, game: game, modes: counts[game].modes})
		}
	}
	log(list.sort((a, b) => a.count - b.count))

	// channel = await bot.channels.fetch("858804248598413383")
})

let getPlayer = async (username) => {
	let uuid = await Api.getUsernameAndUUID(username)
	var realUUID = MinecraftAPI.uuidForName(uuid.username);
	try {
		realUUID = await realUUID
	} catch(err){
		channel.send("Whoops, something went wrong")
		return null
	}

	let guild = Api.guild(uuid.uuid)
	var player = Api.player(uuid.uuid)
	let recents = Api.recentGames(uuid.uuid)

	var info = await Promise.all([guild, recents, player])
	if (info[2]){
		var name = info[2].displayname
		if (info[2].prefix) {
			/**
			 * @type {String}
			 */
			let prefix = info[2].prefix
			for (let i = 0; i < 10; i++) {
				prefix = prefix.replace(new RegExp("§."), "")
			}
			name = prefix + " " + name
		}
		else if (info[2].rank) {
			name = "["+ info[2].rank + "] " + name
		}
		else if (info[2].monthlyPackageRank){
			name = "["+ info[2].monthlyPackageRank + "] " + name
		}
		else if (info[2].newPackageRank){
			name = "["+ info[2].newPackageRank + "] " + name
		}
		else if (info[2].packageRank){
			name = "["+ info[2].packageRank + "] " + name
		}
		if (info[0]) {
			name = name + info[0].tag
		}
		let embed = new Discord.MessageEmbed()
		.setAuthor(name,null,encodeURI("https://plancke.io/hypixel/player/stats/"+uuid.username))
		.setColor(info[2].monthlyRankColor)
		.addField("EXP", info[2].networkExp, true)
		.addField("level", getLevel(info[2].networkExp))
		.addField("Last Game Played", info[2].mostRecentGameType)
		// .setImage(encodeURI("https://visage.surgeplay.com/full/128/"+realUUID+".png"))
		log(embed.image)
		channel.send(embed.attachFiles("https://visage.surgeplay.com/full/812/"+realUUID+".png"))
	} else {
		channel.send("thats not a player on hypixel!")
	}
}
bot.on('ready', async () => {
	// getPlayer("okcookie")
});
// thumbnail[username] "[rank]"
// online - mc version
// guild
// xp - level - karma
// recent game
// recent game stats