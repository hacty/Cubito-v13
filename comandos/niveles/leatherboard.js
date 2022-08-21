const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const levels = require('../../Schema/levels')


module.exports = {
  name: "leaderboardl",
  alias: ["topl"],

async execute (client, message, args){

    let dataGlobal = await levels.find({guildID: message.guild.id}).sort([["xp", "descending"]]).exec();
    dataGlobal = dataGlobal.slice(0, 10)
    if(!dataGlobal) return message.reply("No hay xp en este servidor.")

    const puestoUsuario = dataGlobal.findIndex(dataUser => dataUser.userID === message.member.user.id) + 1
const puesto = (cantidad)=> cantidad + 1;
    const embed = new MessageEmbed()
    .setTitle(`Leaderboard del servidor: ${message.guild.name}`)
    .setColor("#f6ff00")//que haces?
    .setDescription(`${dataGlobal.map((data, index )=> `${index === 0 ? "🥇." : index === 1 ? "🥈." : index === 2 ? "🥉." : index === 3 ? puesto(index) : puesto(index)} **${client.users.cache.get(data.userID).tag}** - \` ${data.xp} XP\``).join("\n")}`)

    message.channel.send({embeds:[embed]})
   
    
}
}