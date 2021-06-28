require('dotenv').config();
const {command} = require('command-based-discord');
const {help, nick, ping, uptime} = require("./index")
const Discord = require("discord.js")
const DiscordCommands = require('./index');


var Commands = new command({name: "!", commandFunction: ()=>{}, help: "", subcommands: [
  ping(),
  uptime(),
  nick(),
  new command({subcommands: [
    uptime(),
    nick()
  ], name: "hi", help: "joe"}),
  help()
]})
Commands.reindex(bot)
// Commands.reindex(bot)
bot.on('message', msg => {
  if (msg.content.startsWith("!") && msg.author.username != bot.user.username) {
    Commands.test(msg.content, msg)
  }
});