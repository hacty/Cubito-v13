const Discord = require('discord.js');
const sugerencias = require(`${process.cwd()}/Schema/SugerenciasSchema`);

module.exports = {
  name: "setup-suggestion",
  alias: ["suggestion-setup", "setup-sugerencias", "setup-sugerencia", "setupsugerencias", "setsugerencias", "set-suggestion", "set-sugerencias"],
    async execute(client, message, args){

      const canal = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
      const channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
      
    try {
        if(!args.length) return message.reply("❌ **Tienes que especificar el canal de sugerencias!**")

        if(!canal || channel.type !== "GUILD_TEXT") return message.reply("❌ **El canal de sugerencias que has mencionado no existe!**");
      
      let data = await sugerencias.findOne({ guildId: message.guild.id, channelId: canal.id })

      if(data) return message.reply({ content: "Ya hay un canal de sugerencias en este servidor.", ephemeral: true })

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
      .setDescription(`El canal de sugerencias sera: ${canal}.`)
      .setColor("RANDOM")] })
    } catch (e){
      console.log(e)
    }
    }
}