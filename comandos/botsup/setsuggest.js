const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const GuildConfigModel = require("../../Schema/sugerencia")//hacty no ////deja como esta
//const prefixSchema = require("../util/middleware/prefix")
module.exports = {
  name: "setsuggest",
  alias: ['setsugest'],

async execute (client, message, args){

  const pre = await args.join(" ")
if(!pre) return message.reply({ content: "Por favor menciona el nuevo prefix"})

let guild = await GuildConfigModel.findOne({ guildID: message.guild.id })
    if(!guild){


        const saveGuildConfig = new GuildConfigModel({
           guildID: message.guild.id, 
           canal: pre
        })

       saveGuildConfig.save((err, db) => {
           if(err) console.log(err)
           console.log("sabe", db);
       })  
        message.reply(`Mi canal de sugerencias es **${pre}**`)
    
    } else {
        await GuildConfigModel.updateOne({guildID: message.guild.id}, {canal: pre})
        message.reply(`Mi canal de sugerencias es ahora **${pre}**`)
    }

    

        
 }
}
