const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const db = require('quick.db')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = {
  name: "verification",
  alias: ["veri","b"],

async execute (client, message, args) {
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
            const msg = await message.reply({ embeds: [embed], components: [boton] })
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
    
}
}