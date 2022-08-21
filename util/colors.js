const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const db = require('quick.db')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = {
  name: "color",
  alias: ["colores","color"],

async execute (client, message, args) {
  const embed = new MessageEmbed()
  .setTitle('Sistema de autoroles')
  .setDescription("Clickea ⚫ para obtener el color <@&819707683636510720>\nClickea 🔴 para obtener el color <@&819841358315257856>\nClickea 🟣 para obtener el color <@&819842908588867604>\nClickea 🟢 para obtener el color <@&819842542615003176>\nClickea 🔵 para obtener el color <@&819841723646738453>\nClickea 🟠 para obtener el color <@&819842223817490482>\nClickea ⚪ para obtener el color <@&819842656670318622>\nClickea 🟡 para obtener el color<@&819842018523349044>")
  .setColor('GREEN')
  .setTimestamp()//para poner la fecha cuando el cmd se ejecuto
const boton = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('negro')//el id del boton, con lo que se ejecutara una interaccio
                    .setEmoji("⚫")
					.setStyle('SUCCESS'),//estilo del boton (PRIMARY > color azul)
			)
            .addComponents(
				new MessageButton()
					.setCustomId('rojo')//el id del boton, con lo que se ejecutara una interaccio
                    .setEmoji("🔴")
					.setStyle('SUCCESS'),//estilo del boton (PRIMARY > color azul)
			)
            .addComponents(
				new MessageButton()
					.setCustomId('morado')//el id del boton, con lo que se ejecutara una interaccio
                    .setEmoji("🟣")
					.setStyle('SUCCESS'),//estilo del boton (PRIMARY > color azul)
			)
            .addComponents(
				new MessageButton()
					.setCustomId('verde')//el id del boton, con lo que se ejecutara una interaccio
                    .setEmoji("🟢")
					.setStyle('SUCCESS'),//estilo del boton (PRIMARY > color azul)
			)
            .addComponents(
				new MessageButton()
					.setCustomId('azul')//el id del boton, con lo que se ejecutara una interaccio
                    .setEmoji("🔵")
					.setStyle('SUCCESS'),//estilo del boton (PRIMARY > color azul)
			)
            .addComponents(
				new MessageButton()
					.setCustomId('naranja')//el id del boton, con lo que se ejecutara una interaccio
                    .setEmoji("🟠")
					.setStyle('SUCCESS'),//estilo del boton (PRIMARY > color azul)
			)
            .addComponents(
				new MessageButton()
					.setCustomId('blanco')//el id del boton, con lo que se ejecutara una interaccio
                    .setEmoji("⚪")
					.setStyle('SUCCESS'),//estilo del boton (PRIMARY > color azul)
			)
            .addComponents(
				new MessageButton()
					.setCustomId('amarillo')//el id del boton, con lo que se ejecutara una interaccio
                    .setEmoji("🟡")
					.setStyle('SUCCESS'),//estilo del boton (PRIMARY > color azul)
			)
            const msg = await message.channel.send({ embeds: [embed], components: [boton] })
let ifilter = i => !i.user.bot;
    
const filter = i => i.user.id === message.author.id;

      const collector = message.channel.createMessageComponentCollector({ filter: ifilter })

collector.on('collect', async i => {
    if (i.customId === 'negro') {
    await i.deferUpdate();
		if(!i.member.roles.cache.has("819707683636510720")){
            await i.member.roles.add("819707683636510720")
        }
        if (i.customId === 'rojo') {
    await i.deferUpdate();
		if(!i.member.roles.cache.has("819841358315257856")){
            await i.member.roles.add("819841358315257856")
        }
        if (i.customId === 'morado') {
    await i.deferUpdate();
		if(!i.member.roles.cache.has("819842908588867604")){
            await i.member.roles.add("819842908588867604")
        }
        if (i.customId === 'verde') {
    await i.deferUpdate();
		if(!i.member.roles.cache.has("819842542615003176")){
            await i.member.roles.add("819842542615003176")
        }
	if (i.customId === 'azul') {
    await i.deferUpdate();
		if(!i.member.roles.cache.has("819841723646738453")){
            await i.member.roles.add("819841723646738453")
        }
        if (i.customId === 'naranja') {
    await i.deferUpdate();
		if(!i.member.roles.cache.has("819842223817490482")){
            await i.member.roles.add("819842223817490482")
        }
        if (i.customId === 'blanco') {
    await i.deferUpdate();
		if(!i.member.roles.cache.has("819842656670318622")){
            await i.member.roles.add("819842656670318622")
        }
        if (i.customId === 'amarillo') {
    await i.deferUpdate();
		if(!i.member.roles.cache.has("819842018523349044")){
            await i.member.roles.add("819842018523349044")
        }
});
}

};
    
