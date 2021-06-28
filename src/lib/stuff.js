// function logIndex(typedThing) {
//   for (const stat in typedThing) {
//     if (Object.hasOwnProperty.call(typedThing, stat)) {
//       var thing = typedThing[stat];
//       if (thing == null) {
//         console.log(stat+": any;");
//         continue
//       }
//       if (Object.keys(thing).every((val, i, array)=>{
//         if (val!==i.toString()) {
//           return false
//         } else {
//           return true
//         }
//       },this)) {
//         thing = Object.values(thing)
//       }
//       if ((typeof thing == 'object') && !Array.isArray(thing)) {
//         console.log(stat+": {");
//         logIndex(thing)
//         console.log("}")
//       } else {
//         var type = [typeof thing]
//         if (Array.isArray(thing)) {type = "Any[]"}
//         console.log(stat+": "+(typeof thing)+";");
//       }
//     }
//   }
// }
// logIndex(player.stats.TNTGames.tntag)