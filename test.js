require('dotenv').config();
const {command} = require('command-based-discord');
const {help, nick, ping, uptime} = require("./index")
const Discord = require("discord.js")
const {HypixelAPI} = require('hypixel-api-v2');
const Hypixel = require('./index');

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN
if (TOKEN == null) {
	console.error("no token provided");
}

bot.login(TOKEN)
let Api = new HypixelAPI(process.env.HYPIXELTOKEN);

var Commands = new command({bot: bot, name: "!", commandFunction: ()=>{}, help: "", subcommands: [
  Hypixel(Api)
]})
Commands.reindex(bot)
// Commands.reindex(bot)
bot.on('message', msg => {
  if (msg.content.startsWith("!") && msg.author.username != bot.user.username) {
    Commands.test(msg.content, msg)
  }
});