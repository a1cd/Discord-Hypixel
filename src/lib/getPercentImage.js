
module.exports = (wins, losses) {
  return encodeURI("https://quickchart.io"+"/chart?c={type: 'pie',data: {datasets: [{data: ["+wins.toString()+", "+losses.toString()+"],backgroundColor: [ 'rgb(100, 200, 100)', 'rgb(255, 100, 100)' ],label: 'Wins over Losses', },],labels: ['wins', 'losses'],}, }")
}