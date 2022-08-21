const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const { ownerID } = require('../../config.js')
const { create } = require('sourcebin')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = {
  name: "eval",
  alias: ["ev","e"],

async execute (client, message, args){
    let ids = ["808581171809222706",""]
//no cambies "ownerID", ya que este es la id del owner que pusiste en config.js, osea es tu id, ya se pone automaticamente
  if(!message.member.roles.cache.has("899451837046992977")){ 
 return message.reply('¡No tienes permitido usar este comando!').then(a => setTimeout(() => a.delete(), 5000))
}///ya lo rompiste :'u'   
    /// bro :'v
if(!args[0]){
  return message.reply('¡Evalua algo!').then(a => setTimeout(() => a.delete(), 5000))
}


message.channel.send('Evaluando...').then(async mensaje => {
  try{
    const codigo = args.join(" ")
let evaluado = await eval(codigo);
let tipo = typeof evaluado || 'No encontre ese tipo.';
evaluado = require('util').inspect(evaluado, {
					depth: 0,
					maxStringLength: 2000
				});
			let texto = '' + evaluado;

      if(texto.length >= 700){
        create([
					{
						content: `${texto.replace(client.token, '').replace(/(bot)/g, 'bot')}`,
						language: 'javascript'
					},
				],
				{
					title: 'Codigo',
					description: 'Eval sobrepaso mas de 700 caracteres!'
				}).then(async e => {
          const emb = new MessageEmbed()
          .setAuthor(client.user.tag, client.user.displayAvatarURL())
          .addField(`Lo evaluado`, `\`\`\`js\n${codigo}\`\`\``)
          .addField(`La evaluacion`, `Ups... al parecer el codigo es muy largo, link: ` + e.url)
          .addField(`Tipo:`, `\`\`\`js\n${tipo}\`\`\``)
          .setColor('#ffff')
          mensaje.edit({ embeds: [emb] })
        })


      } else {
        const emb = new MessageEmbed()
          .setAuthor(client.user.tag, client.user.displayAvatarURL())
          .addField(`Lo evaluado`, `\`\`\`js\n${codigo}\`\`\``)
          .addField(`La evaluacion`, `\`\`\`js\n${texto.replace(client.token, "un token pro")}\`\`\``)
          .addField(`Tipo:`, `\`\`\`js\n${tipo}\`\`\``)
          .setColor('#ffff')
          mensaje.edit({ embeds: [emb] })
      }
      } catch (e) {
        const codigo = args.join(" ")
        const emb = new MessageEmbed()
          .setAuthor(client.user.tag, client.user.displayAvatarURL())
          .addField(`Lo evaluado`, `\`\`\`js\n${codigo}\`\`\``)
          .addField(`La evaluacion`, `\`\`\`js\n${e}\`\`\``)
          .addField(`Tipo:`, `\`\`\`js\nError\`\`\``)
          .setColor('#ffff')
          .setFooter(`ERROR!`)
          mensaje.edit({ embeds: [emb] })

      }
})

}
}
