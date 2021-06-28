var fs = require('fs');
require('dotenv').config();
const {HypixelAPI} = require('hypixel-api-v2');
const {command} = require('command-based-discord')
const Discord = require('discord.js');
const { log, info } = require('console');
const { type } = require('os');
const colors = require('color-name');
const MinecraftAPI = require('minecraft-api');

const display = require('./src/lib/display');
const player = require('./src/lib/player')

module.exports = (Api) => {
	let commands = new command({name: "hypixel", subcommands: [
		display(Api),
		player(Api)
	], help: "oops"})
	return commands
}
// thumbnail[username] "[rank]"
// online - mc version
// guild
// xp - level - karma
// recent game
// recent game stats