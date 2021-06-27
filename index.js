const fs = require('fs');
require('dotenv').config();
const {HypixelAPI} = require('hypixel-api-v2');
const commands = require('command-based-discord')

let Api = new HypixelAPI(process.env.HYPIXELTOKEN);

let getPlayer = async (username) => {
    let uuid = await Api.getUUID(username)
    let guild = Api.guild(uuid)
    var playerProm = Api.player(uuid)
    let recents = Api.recentGames(uuid)
    
    var infoProm = [guild, recents, playerProm]
    let player = await playerProm
    0/0
    let info = await Promise.all(infoProm)
    // console.log(info[4]);
}
getPlayer("okcookie")
// thumbnail[username] "[rank]"
// online - mc version
// guild
// xp - level - karma
// recent game
// recent game stats