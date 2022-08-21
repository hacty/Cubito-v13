const Discord = require('discord.js')

module.exports = {
  name: "hycraft",
  alias: [],

  execute(client, message, args){

    const embed = new Discord.MessageEmbed()
      .setTitle(`Informacion sobre Hycraft`)
      .addField("IP:", `[mc.hycraft.us](https://discord.gg/Hycraft)`)
      .addField("Discord:", `https://discord.gg/Hycraft`)
      .addField("Hycraft Web:", `https://store.hycraft.us`)

      .setTimestamp()
      .setThumbnail(`https://cdn.discordapp.com/attachments/967529099847434321/1006378860021043291/88e98f07a5df715cc2e54e89c95f672a75789862.png`)
      .setColor("#f6ff00")

    message.channel.send({embeds:[embed]})



  }
}