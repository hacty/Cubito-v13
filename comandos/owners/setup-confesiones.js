const Discord = require('discord.js');
const sugerencias = require("../../Schema/ConfesionesSchema")

module.exports = {
  name: "set-confesiones",
  alias: ["confesiones-setup", "setup-confesiones", "setup-confesion", "setupconfesion", "setconfesiones", "set-confesiones", "set-confesiones"],

    async execute(client, message, args){

          try {

      if(!args.length) return message.reply("❌ **Tienes que especificar el canal de confesiones!**")

     // if(canal.type !== "GUILD_TEXT") return message.reply({ content: "El canal debe ser estrictamente de texto.", ephemeral: true })

      const canal = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
      if(!canal || canal.type !== "GUILD_TEXT") return message.reply("❌ **El canal que has mencionado no existe!**");
      
      let data = await sugerencias.findOne({ guildId: message.guild.id, channelId: canal.id })

      if(data) return message.reply({ content: "Ya hay un canal de confesiones en este servidor.", ephemeral: true })

      if(!data){
        let newdata = await new sugerencias({
          guildId: message.guild.id,
          channelId: canal.id
        })

        await newdata.save()
        
       }
       await sugerencias.findOneAndUpdate({
          guildId: message.guild.id,
          channelId: canal.id
        })
      
      message.reply({ embeds: [new Discord.MessageEmbed()
      .setDescription(`El canal de confesiones sera: ${canal}.`)
      .setColor("RANDOM")] })
    } catch (e){
      console.log(e)
    }
    }
}