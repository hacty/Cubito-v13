const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('quick.db')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = {
  name: "help",
  alias: [],

execute (client, message, args){
  try{
const embed = new MessageEmbed()
.setAuthor('Ejecutaste help', message.author.displayAvatarURL())
.setDescription("Bienvenido a mi lista de comandos \nAqui podras encontrar todos mis comandos :D\n\n-----------------------------------------------------\n<:Mod:940613935877456003>**Desarrolladores**<:Mod:940613935877456003>\n`Jack Man#0001` `MauricioAnimator#7240` `Mr Cat#7003` `Matii#4755` `hactylol#1757`\n<:Dirigente:940614241461887047>**Directores**<:Dirigente:940614241461887047>\n`Knight#7690` `Luiggi#5110`\n\n-----------------------------------------------------\n***Mis redes***\n **[Canal de minecraft <:Youtube:905840002691371049>](https://www.youtube.com/channel/UC-qFzUXaby3SAWifLgLEvNA)** \n \n  **[Instagram <:Instagram:905844986841546782>](https://www.instagram.com/cubo.yt/e)** \n \n  **[Twitter <:Twitter:905841919777701999>](https://twitter.com/___Cubo___)** \n \n **[Badlion shop <:badlion:934951690648567869>](https://store.badlion.net/shop/Cubo)** \n \n v.1.4'")
.setColor('#f6ff00')
 const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('menu')
                .setPlaceholder('💣 | Categorias de comandos')
                .addOptions([
                    {
                        label: 'Utiles',
                        description: 'Mis comandos mas utiles',
                        value: 'inicio',
                        emoji: '<:cubo:907407228955426856>',
                    },
                    {
                        label: 'Divercion',
                        description: 'Mis comandos divertidos',
                        value: 'owners',
                        emoji: '😂',
                    },
                    {
                        label: 'Moderacion',
                        description: 'Mis comandos de moderador',
                        value: 'diversion',
                        emoji: '📋',
                    },
                    {
                        label: 'Minecraft',
                        description: 'Es hora de jugar ',
                        value: 'otro',
                        emoji: '⛏️',
                    },
                    {
                     label: 'Economia',
                        description: 'Sistema avanzado de economia',
                        value: 'otroxd',
                        emoji: '💰',
                    },
                    {
                        label:'Musica',
                        description: 'Sistema de musica basado en Cubo bot sound',
                        value: 'mus',
                        emoji: '🎵',
                    }
                ]),
        );
    
	message.channel.send({ components: [row], embeds: [embed] });
  } catch (e) {
    message.reply('Ocurrion un error! ' + e)
  }
}
}