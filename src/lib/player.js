const { command } = require('command-based-discord');
const Discord = require('discord.js');
const MinecraftAPI = require("minecraft-api")
const { getLevel } = require('./leveling');

module.exports = (Api) => {
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
      .setAuthor(name, null,encodeURI("https://plancke.io/hypixel/player/stats/"+uuid.username))
      .setThumbnail("https://crafatar.com/avatars/"+realUUID)
      .setColor(info[2].monthlyRankColor)
      .addField("EXP", info[2].networkExp, true)
      .addField("level", getLevel(info[2].networkExp), true)
      .addField("Karma", info[2].)
      .addField("Last Game Played", info[2].mostRecentGameType)
      // .setImage(encodeURI("https://visage.surgeplay.com/full/128/"+realUUID+".png"))
      return embed.setImage("https://crafatar.com/renders/body/"+realUUID)
    } else {
      return new Discord.MessageEmbed().setTitle("invalid user");
    }
  }
  return new command({name: "stat", help: "get player data", commandFunction: (input, msg, cmd)=> {
    getPlayer(input).then(embed=>{
      msg.channel.send(embed)
    })
  }})
}