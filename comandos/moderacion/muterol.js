const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const mute = require('../../Schema/mute')

module.exports = {
  name: "muterol",
  alias: [],

 async execute (client, message, args){

if(!message.member.permissions.has('MANAGE_ROLES'))
   return message.channel.send("No tienes suficientes permisos crack!")

    let rol = message.mentions.roles.first();
    if(!rol) return message.channel.send("Debes mencionar un rol!")
  
      mute.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(err) throw err;
    if(data) {
        await mute.findOneAndUpdate({
            
            Guild: message.guild.id,
            Rol: rol.id
        })
        data.save()
    }
    })
      console.log(rol.id)
const saveGuildConfig = new mute({
           Guild: message.guild.id, 
           Rol: rol.id
        })

       saveGuildConfig.save((err, db) => {
           if(err) console.log(err)
           console.log("sabe", db);
       })  
    message.channel.send(`Se ha establecido el rol **${rol.name}** como rol para mutear.`)

        
  }

};
