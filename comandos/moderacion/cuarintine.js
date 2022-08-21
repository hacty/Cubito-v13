const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const warns = require('../../Schema/warns')

module.exports = {
  name: "cuarintiner",
  alias: [],

  execute (client, message, args){

if(!message.member.roles.cache.has('899032680748961842'))
   return message.channel.send("No tienes suficientes permisos crack!")

    let rol = message.mentions.roles.first();
    if(!rol) return message.channel.send("Debes mencionar un rol!")
  
      warns.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(err) throw err;
    if(data) {
        await warns.findOneAndUpdate({
            
            Guild: message.guild.id,
            Rol: rol.id
        })
        data.save()
    }
    })
    message.channel.send(`Se ha establecido el rol **${rol.name}** como rol para mutear.`)

        
  }

};
