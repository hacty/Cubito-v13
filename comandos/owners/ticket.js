const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const db = require('quick.db')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, ] });


module.exports = {
  name: "ticket",
  alias: ["bot","b"],

async execute (client, message, args) {

let everyone = message.guild.roles.cache.find(rol => rol.name === '@everyone')

  let id = "912798028048510996"
  const embed = new MessageEmbed()
    .setTitle("****Tickets Generales****")
    .setDescription("🎟️ Tickets Generales 🎟️\n\nSaca un ticket dependiendo el tema a tratar.\n\n⚠️ Abrir un ticket sin razón puede llevar a un bloqueo de tickets ⚠️\n\n💻 - Desarrolladores de bots: Tiene que estar verificado.\n\n🚫 - Quiero reportar a un usuario: Tienes que mostrar evidencia.\n\n<:Cubo:907407228955426856> - Inscripción a cubo bot: Tienes que tener los requisitos básicos\n\n🔓 - Postulación a staff: Tienes que tener experiencia y tener el rol @🏆 | VIP\n\n🎫 - Media: Para obtener roles de creador de contenido\n\n❓ - Otros temas: Temas que no estén en esta lista.")
    .setThumbnail("https://images-ext-1.discordapp.net/external/pL3HmMhMmGrOmr1EQE7m3QPLNX2OE7K4IB0s37cMHXM/https/cdn.discordapp.com/icons/702009979217117195/d13c64007d029a6d55662ed8b92e24a2.png")
    .setColor("#f6ff00")
    .setFooter("CuboBot")
    .setTimestamp()
const botones = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('1')//el id del boton, con lo que se ejecutara una interaccion
					.setLabel('Desarrollador de bots')//el nombre del boton
          .setEmoji("💻")
					.setStyle('PRIMARY'),//estilo del boton (PRIMARY > color azul)
          
			)
      .addComponents(
				new MessageButton()
					.setCustomId('2')//el id del boton, con lo que se ejecutara una interaccion
					.setLabel('Reportar')//el nombre del boton
          .setEmoji("🚫")
					.setStyle('DANGER'),//estilo del boton (SECONDARY > color gris)
			)
      .addComponents(
				new MessageButton()
					.setCustomId('3')//el id del boton, con lo que se ejecutara una interaccion
					.setLabel('Cubo bot')//el nombre del boton
          .setEmoji("<:Cubo:907407228955426856>")
					.setStyle('PRIMARY'),//estilo del boton (SUCCESS > color verde)
			)
      .addComponents(
				new MessageButton()
					.setCustomId('4')//el id del boton, con lo que se ejecutara una interaccion
					.setLabel('Staff')//el nombre del boton
          .setEmoji("🔓")
					.setStyle('SUCCESS'),//estilo del boton (DANGER > color rojo)
			)
      .addComponents(
				new MessageButton()
					.setCustomId('5')//el id del boton, con lo que se ejecutara una interaccion
					.setLabel('Media')//el nombre del boton
          .setEmoji("🎫")
					.setStyle('SECONDARY'),//estilo del boton (DANGER > color rojo)
			)
    


      const msg = await message.reply({ content: `Crea tu tipo de ticket, con el tema a tratar.\nSi el bot te dice que la interaccion es fallida puedes crear el ticket asi #comticket + la razon.`, embeds: [embed], components: [botones] })

const filter = i => i.user.id === message.author.id;

      const collector = message.channel.createMessageComponentCollector({ filter });

collector.on('collect', async i => {
	if (i.customId === '1') {
    await i.deferUpdate();
		await message.guild.channels.create(`ticket ${message.author.tag}`,{
      type: "GUILD_TEXT",
      parent: `${id}`,
      permissionOverwrites:[{
  
    id: message.guild.roles.everyone.id,
    deny: ["VIEW_CHANNEL","SEND_MESSAGES"]
  },
  {
    id: message.author.id,
    allow: ["VIEW_CHANNEL","SEND_MESSAGES"]
  }
                       ]
    }).then(c => c.send(`**Ticket creado por: ${message.author}**\nRazon: **Quiere meter su bot a nuestro servidor**. \n****Para ayudas mas especificas, puedes ejecutar:****\n#hycraft: si perdiste tu contraseña de hycraft.\n*Si nesesitas crear una alianza o etc, un staff te atendera pronto.*`)).then((msg) => {msg.react("✅")});
	}
  if (i.customId === '2') {
    await i.deferUpdate();
		await message.guild.channels.create(`ticket ${message.author.tag}`,{
      type: "GUILD_TEXT",
      parent: `${id}`,
      permissionOverwrites:[{
  
    id: message.guild.roles.everyone.id,
    deny: ["VIEW_CHANNEL","SEND_MESSAGES"]
  },
  {
    id: message.author.id,
    allow: ["VIEW_CHANNEL","SEND_MESSAGES"]
  }
                       ]
    }).then(c => c.send(`**Ticket creado por: ${message.author}**\nRazon: **Desea reportar un usuario** \n****Para ayudas mas especificas, puedes ejecutar:****\n#hycraft: si perdiste tu contraseña de hycraft.\n*Si nesesitas crear una alianza o etc, un staff te atendera pronto.*`)).then((msg) => {msg.react("✅")});
	}
  if (i.customId === '3') {
    await i.deferUpdate();
		await message.guild.channels.create(`ticket ${message.author.tag}`,{
      type: "GUILD_TEXT",
      parent: `${id}`,
      permissionOverwrites:[{
  
    id: message.guild.roles.everyone.id,
    deny: ["VIEW_CHANNEL","SEND_MESSAGES"]
  },
  {
    id: message.author.id,
    allow: ["VIEW_CHANNEL","SEND_MESSAGES"]
  }
                       ]
    }).then(c => c.send(`**Ticket creado por: ${message.author}**\nRazon: **Quiere incribirse a Cubo Bot** \n****Para ayudas mas especificas, puedes ejecutar:****\n#hycraft: si perdiste tu contraseña de hycraft.\n*Si nesesitas crear una alianza o etc, un staff te atendera pronto.*`)).then((msg) => {msg.react("✅")});
  }
  if (i.customId === '5') {
    await i.deferUpdate();
		await message.guild.channels.create(`ticket ${message.author.tag}`,{
      type: "GUILD_TEXT",
      parent: `${id}`,
      permissionOverwrites:[{
  
    id: message.guild.roles.everyone.id,
    deny: ["VIEW_CHANNEL","SEND_MESSAGES"]
  },
  {
    id: message.author.id,
    allow: ["VIEW_CHANNEL","SEND_MESSAGES"]
  }
                       ]
    }
).then(c => c.send(`**Ticket creado por: ${message.author}**\nRazon: **Quiere tener rango media** \n****Para ayudas mas especificas, puedes ejecutar:****\n#hycraft: si perdiste tu contraseña de hycraft.\n*Si nesesitas crear una alianza o etc, un staff te atendera pronto.*`)).then((msg) => {msg.react("✅")});
	}
  if (i.customId === '4') {
    await i.deferUpdate();
		await message.guild.channels.create(`ticket ${message.author.tag}`,{
      type: "GUILD_TEXT",
      parent: `${id}`,
      permissionOverwrites:[{
  
    id: message.guild.roles.everyone.id,
    deny: ["VIEW_CHANNEL","SEND_MESSAGES"]
  },
  {
    id: message.author.id,
    allow: ["VIEW_CHANNEL","SEND_MESSAGES"]
  }
                       ]
    }).then(c => c.send(`**Ticket creado por: ${message.author}**\nRazon: **Quiere ser un staff de nuestro servidor** \n****Para ayudas mas especificas, puedes ejecutar:****\n#hycraft: si perdiste tu contraseña de hycraft.\n*Si nesesitas crear una alianza o etc, un staff te atendera pronto.*\n||<@&899032680748961842> <@&896932228901273600> <@&915813679952429096>|| `)).then((msg) => {msg.react("✅")});
	}
});
}
}



