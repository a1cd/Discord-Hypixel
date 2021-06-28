const Hypixel = require('hypixel-api-v2');
const Discord = require('discord.js');
const {command} = require('command-based-discord');
const MinecraftAPI = require("minecraft-api")

let display = {
  "Bedwars": {
    "Kills": "kills_bedwars",
    "Wins": "wins_bedwars",
    "Losses":"losses_bedwars",
    "Games": "games_played_bedwars",
    "Coins": "coins",
    "Experience": "Experience",
    "Winstreak": "winstreak",
    "Beds Broken": "beds_broken_bedwars"
  },
  "Duels": {
    "Games Played": "games_played_duels",
    "Winstreak": "current_winstreak",
    "Coins": "coins",
    "Deaths": "deaths",
    "Losses": "losses",
    "Wins": "wins",
    "Kills": "kills"
  },
  "SkyWars": {
    "Games Played": "games_played_skywars",
    "Coins": "coins",
    "Wins": "wins",
    "Losses": "losses",
    "Kills": "kills",
    "Deaths": "deaths"
  },
  "Arcade": {
    "Coins": "coins",
    "Scuba Simulator Points": "total_points_scuba_simulator",
    "OneInTheQuiver Deaths":"deaths_oneinthequiver",
    "OneInTheQuiver Kills":"kills_oneinthequiver",
    "Simon Says rounds": "rounds_simon_says"
  },
  "MurderMystery": {
    "Games Played": "games",
    "Kills": "kills",
    "Deaths": "deaths",
    "Wins": "wins"
  },
  "TNTGames": {
    "Coins": "coins",
    "Total Wins": "wins",
    "TNTag Wins": "wins_tntag",
    "TNTag Kills": "kills_tntag"
  }
}

/**
 * 
 * @param {HypixelAPI} HypixelAPI 
 */
module.exports = function Command(HypixelAPI) {
  /**
   * @type {Hypixel.HypixelAPI}
   */
  const Api = HypixelAPI
  /**
   * @param {String} Args 
   * @param {Discord.Message} msg 
   * @param {Discord.Client} bot 
   */
  async function createEmbed(Game, name) {
    const username = name || "Hypixel"
    
    let uuid = await Api.getUsernameAndUUID(username)
    var realUUID = MinecraftAPI.uuidForName(uuid.username);
    try {
      realUUID = await realUUID
    } catch(err){
      channel.send("Whoops, something went wrong")
    }
    var player = await Api.player(uuid.uuid)
    var name = player.displayname
		if (player.prefix) {
			/**
			 * @type {String}
			 */
			let prefix = player.prefix
			for (let i = 0; i < 10; i++) {
				prefix = prefix.replace(new RegExp("§."), "")
			}
			name = prefix + " " + name
		}
		else if (player.rank) {
			name = "["+ player.rank + "] " + name
		}
		else if (player.monthlyPackageRank){
			name = "["+ player.monthlyPackageRank + "] " + name
		}
		else if (player.newPackageRank){
			name = "["+ player.newPackageRank + "] " + name
		}
		else if (player.packageRank){
			name = "["+ player.packageRank + "] " + name
		}

    const GameDetails = display[Game]
    var color = null
    if (player.newPackageRank.toLowerCase().includes("++")) {color = "#ffaa00"}
    else if (player.newPackageRank.toLowerCase().includes("mvp")) {color = "#3d8eb9"}
    else if (player.newPackageRank.toLowerCase().includes("vip")) {color = "#61bd6d"}
    var embed = new Discord.MessageEmbed()
    .setTitle(Game)
    .setAuthor(name)
    .setThumbnail("https://crafatar.com/avatars/"+uuid.uuid)
    .setColor(color)
    for (const Display in GameDetails) {
      if (Object.hasOwnProperty.call(GameDetails, Display)) {
        const Path = GameDetails[Display];
        embed = embed.addField(Display, player.stats[Game][Path], true)
      }
    }
    return embed
  }
  var subCommands = []
  for (const Game in display) {
    if (Object.hasOwnProperty.call(display, Game)) {
      const DisplayStats = display[Game];
      subCommands.push(
        new command({name: Game, help: "Look at a player's stats for "+Game+".", commandFunction: async (arg, msg, cmd) => {
          const name = arg
          createEmbed(Game, arg).then(embed => {
            msg.channel.send(embed)
          })
        }})
      )
    }
  }
  return new command({name: "stat", help: "Get info about a players stats in a game", subcommands: subCommands})
}