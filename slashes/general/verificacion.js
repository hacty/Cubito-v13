const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verificacion')//el nombre del slash (olbigatorio)
		.setDescription('Verificacion solo admins dea XD'),//descripcion del slash (obligatorio)
	async execute(interaction) {

/*
aqui no se usas message, args o alguna otra cosa, aqui se usa "interaction"

ejemplo: funciones de usuario: interaction.user, interaction.user.id. interaction.user.tag, interaction.user.username, interaction.user.displayAvatarURl(), etc...
ejemplo del cliente: interaction.client.user, interaction.client.user.id, interaction.client.user.tag, interaction.client.user.displayAvatarURl(), etc...
*/
          const embed = new MessageEmbed()
  .setTitle('Bienvenido al servidor "Soy Cubo"')
  .setDescription("-> ᴇꜱᴛᴇ ꜱᴇʀᴠɪᴅᴏʀ ʟᴇ ᴘᴇʀᴛᴇɴᴇᴄᴇ ᴀ <@403674635486625803> \n\n- ᴅᴇɴᴛʀᴏ ᴅᴇ ᴇꜱᴛᴀ ᴄᴏᴍᴜɴɪᴅᴀᴅ ᴘᴏᴅʀᴀꜱ ᴄᴏᴍᴘᴀʀᴛɪʀ ᴇ ɪɴᴛᴇʀᴀᴄᴛᴜᴀʀ ᴄᴏɴ ʟᴏꜱ ᴜꜱᴜᴀʀɪᴏꜱ ᴅᴇʟ ᴄʜᴀᴛ, ᴄᴏᴍᴘᴀʀᴛɪʀ ɪᴍᴀɢᴇɴᴇꜱ ʏ ᴇꜱᴛᴀʀ ᴇɴᴛᴇʀᴀᴅᴏ ᴅᴇ ᴛᴏᴅᴀꜱ ʟᴀꜱ ɴᴏᴠᴇᴅᴀᴅᴇꜱ զᴜᴇ ᴇꜱᴛᴀɴ ᴀꜱᴏᴄɪᴀᴅᴀꜱ ᴄᴏɴ ᴄᴜʙᴏ.\n\nPor favor leer las <#796762259644219422> para no tener ningun inconveniente\n\n-> En el canal <#796761894517342318> Podrás enterarte de todos los streams y videos que suba <@403674635486625803>.\n-> En el canal <#796762835211255849> Podras interactuar con otras personas.\n-> En el canal <#796763629730660363> podras pasar cualquier imagen y/o video.\n-> En el canal <#896945522856841287> Podras enviar memes.\n-> En el canal <#936754495596163144> Podras usar los bots que estan en el servidor.\n\nSi tienes un inconvenientes/dudas crea ticket para que un staff te pueda ayudar\n\n**Clickea el boton para verificarte!**\n\nSi tienes problemas para verificarte habla con algun staff!")
  .setColor('GREEN')
  .setTimestamp()//para poner la fecha cuando el cmd se ejecuto
const boton = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('azul')//el id del boton, con lo que se ejecutara una interaccio
                    .setEmoji("✅")
					.setStyle('SUCCESS'),//estilo del boton (PRIMARY > color azul)
			)
            const msg = await interaction.reply({ embeds: [embed], components: [boton] })
        const mensage = await interaction.reply({ content: `Ya has sido verificado ${interaction.user}` , ephemeral: true})
let ifilter = i => !i.user.bot;
    
const filter = i => i.user.id === message.author.id;

      const collector = message.channel.createMessageComponentCollector({ filter: ifilter })

collector.on('collect', async i => {
	if (i.customId === 'azul') {
    await i.deferUpdate();
		if(!i.member.roles.cache.has("702015863552737290")){
            await i.member.roles.add("702015863552737290")
            await i.member.roles.remove("896946866913173554")
        }
        
	}
 
});
    
	},
};