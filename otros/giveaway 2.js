const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const ms = require ('ms')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = {
  name: "giveaway2",
  alias: [],

async execute (client, message, args){

      // !giveaway {time s/m/d} {item}
 
    var item = "";
    var time;
    var winnerCount;
    for (var i = 1; i < args.length; i++) {
      item += (args[i] + " ");
    }
    time = args[0];
    if (!time) {
      return message.channel.send(`Debe tener un tiempo`);
    }
    if (!item) {
      item = "No titulo"
    }
    var embed = new Discord.MessageEmbed();
    embed.setColor(0x3333ff);
    embed.setTitle("New Giveaway !");
    embed.setDescription("**" + item + "**");
    embed.addField(`Duration : `, ms(ms(time), {
      long: true
    }), true);
    embed.setFooter("Reacciona 🎉 para participar !");
    var embedSent = await message.channel.send({ embeds: [embed] });
    embedSent.react("🎉");

    setTimeout(async () => {
      try{
        const peopleReactedBot = await embedSent.reactions.cache.get("🎉").users.fetch();
        var peopleReacted = peopleReactedBot.array(" ").filter(user => user.id !== 
    "935607691324313670")
      }catch(e){
        return message.channel.send(`Upss... \nA ocurrido un error mientras se ejecutaba el comando **${item}** : `+"`"+e+"`")
      }
      var winner;

      if (peopleReacted.length <= 0) {
        return message.channel.send(`Not enough participants to execute the draw of the giveaway **${item}** :(`);
      } else {
        var index = Math.floor(Math.random() * peopleReacted.length);
        winner = peopleReacted[index];
      }
      if (!winner) {
        message.channel.send(`An unknown error happened during the draw of the giveaway **${item}**`);
      } else {
        console.log(`Giveaway ${item} won by ${winner.toString()}`)
        message.channel.send(`🎉 **${winner.toString()}** has won the giveaway **${item}** ! Congratulations ! 🎉`);
      }
    }, ms(time));

}
}