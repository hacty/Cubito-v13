const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "serverinfo",
  alias: [],

  async execute (client, message, args){

    var very = {
        "LOW": "Bajo", "NONE": "Ninguno", "MEDIUM": "Medio","HIGH": "Alto", "VERY_HIGH": "Muy alto"
    }

      let guild = message.guild

         const User = guild.members.cache.filter(member => !member.user.bot).size;
    const Bots = guild.members.cache.filter(member => member.user.bot).size;
    const Text = guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size;
    const Voice = guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;
    const Category = guild.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY').size;
    const Stage = guild.channels.cache.filter(channel => channel.type === 'GUILD_STAGE_VOICE').size;
    const Channel = Text + Voice + Category + Stage
    const Emoji = guild.emojis.cache.size;
    const Roles = guild.roles.cache.size;

    let masivo = new MessageEmbed()
      .setAuthor(`${guild.name}`, guild.iconURL())
      .setColor(guild.me.displayHexColor)
      .setDescription(`
      **Canales totales** : ${Channel} [${Text} Texto | ${Voice} Voz | ${Category} Categorias | ${Stage} Escenarios]
      `)
        .addField(`Nombre : `, guild.name) 
        .addField(`Server ID : `, guild.id)
        .addField(`Owner : `, await guild.fetchOwner().then(m => m.user.tag))
        .addField('<:bot:980555505917390878>|Bots', `Hay ${message.guild.members.cache.filter((m) => m.user.bot).size} bots!`)	
		.addField('<:calendario:980555467195555901>|Creacion', message.guild.createdAt.toLocaleDateString('en-us'))
		.addField('🏳️|Roles', `Hay ${message.guild.roles.cache.size} roles en este server.`)            
		.addField("🛡️|Nivel de verificación", `${very[message.guild.verificationLevel]}`)	
		.addField('<a:boost:980553823661740112> |Boost', message.guild.premiumSubscriptionCount >= 1 ? `Hay ${message.guild.premiumSubscriptionCount} Boost` : 'No hay boost', )
        .setThumbnail(guild.iconURL())
   
       /*            
		const embed = new MessageEmbed()
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setColor("#f6ff00")
			.setTitle(`${message.guild.name} server stats`)
			.addField('👑|Owner: ', owner.user.tag)
		   .addField('<:user:980554490971324447>|Miembros', `Hay ${message.guild.memberCount} Usuarios!` )
           .addField('<:linea:980555527920689153>|Miembros conectados', ` Hay ${message.guild.members.cache.filter((m) => m.user.presence.status === 'online').size} usuarios conectados`)
			.addField('<:bot:980555505917390878>|Bots', `Hay ${message.guild.members.cache.filter((m) => m.user.bot).size} bots!`)	
			.addField('<:calendario:980555467195555901>|Creacion', message.guild.createdAt.toLocaleDateString('en-us'))
			.addField('🏳️|Roles', `Hay ${message.guild.roles.cache.size} roles en este server.`)            
			.addField("🛡️|Nivel de verificación", `${very[message.guild.verificationLevel]}`)	
			.addField('<a:boost:980553823661740112> |Boost',message.guild.premiumSubscriptionCount >= 1 ? `Hay ${message.guild.premiumSubscriptionCount} Boost` : 'No hay boost', )
			.addField('<:lunarclient:934951683639889961>|Emojis', message.guild.emojis.cache.size >= 1 ? `Hay  ${message.guild.emojis.cache.size} emojis!` : 'No hay emojis')
		*/
		 message.channel.send({embeds: [masivo]});
	 
//





//\n**Canales:**\n**Texto**${message.guild.channels}

  }

}
