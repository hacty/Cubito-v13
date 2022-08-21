const Discord = require('discord.js');
const moment = require('moment');
const UT = require('unixtimejs');


module.exports = {
  name: "userinfo",
  alias: ["uinfo", "infouser", "user-info", "info-user"],


async execute(client, message, args){


  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const userAvatar = target.user.displayAvatarURL({ dynamic: true });
  const userTag = target.user.tag;
  const userName = target.user.username;
  const userId = target.user.id;
  const userJoined = target.joinedAt.toUTCString();
  var ut = UT.fromUTCString(userJoined);
  const userCreated = target.user.createdAt.toUTCString();
  var utt = UT.fromUTCString(userCreated);
  const userrolesCache = target.roles.cache;

  const rolesSize = userrolesCache.size;
  const rolesMap = user.roles.cache.map(role => role.toString()).join("\n")
  const presence = user.presence.activities[0] ? user.presence.activities[0].state : "Sin estado"

          let status;
        switch (user.presence.status) {
            case "online":
                status = "<:online:997718813980237834> En linea <:onlinephone:998141092149076018>";
                break;
            case "dnd":
                status = "<:dnd:997719128947302400> No molestar <:dndphone:998141093969395712>";
                break;
            case "idle":
                status = "<:idle:997719266109444197> Ausente <:idlephone:998141095722635356>";
                break;
            case "offline":
                status = "<:offline:997719507554541568> Desconectado <:offlinephone:998141090085490699>";
                break;
        }

  //
            let badges1 = {
        
      'EARLY_SUPPORTER': '<:earlysupporter:1003385053079932979>',
      'DISCORD_EMPLOYEE': '<:staff:980586230116921355>',
      'DISCORD_PARTNER': '<:Discordpartner:746029762564194355>',
      'HYPESQUAD_EVENTS': '<:hypesquadevents:1003384188193488968>',
      'HOUSE_BRAVERY': '<:bravery:1003383258261766214>',
      'HOUSE_BRILLIANCE': '<:brilliance:1003383261583650887>',
      'BUGHUNTER_LEVEL_1': '<:bughunter:1003385055130955786>',
      'BUGHUNTER_LEVEL_2': '<:bughuntergold:1003385056905142302>',
      'VERIFIED_DEVELOPER': '<:dev:980594181787508747>',
      'HOUSE_BALANCE': '<:balance:1003383254432370719>',
      'VERIFIED_BOT': '<:Verified_Bot_Badge:998145924545138748>',
    }

    let obj = {
    "HOUSE_BRAVERY" : "Bravery" , "VERIFIED_BOT" : "Bot verificado" , "VWERIFIED_DEVELOPER" : "Desarrollador de bots verificado" , "HOUSE_BRILLIANCE" : "Brilliance" , "DISCORD_PARTNER" : "Socio de discord"
    }

  let badges = user.user.flags.toArray().length ? user.user.flags.toArray().map(badge => badges1[badge]).join(' ') : "No tiene badges"

  const Embed = new Discord.MessageEmbed()
  .setTitle(`Informacion De ${userName}`)
  .setDescription(
    `> **Reciente actividad**: ${status}\n > **<:unlock:997799338438828092> Tag**: ${userTag}\n> **<:id:998140149718331503> ID**: ${userId}\n > 🏳️ **Insignias**: ${badges}\n> **Unión Al Servidor**: <t:${ut}:R>\n> **Cuenta Creada**: <t:${utt}:R> \`<t:${utt}:R>\` \n> **Estado**: ${presence}\n **Roles**: \`${rolesSize}\`\n ${rolesMap}`
  )

  .setThumbnail(
    `${userAvatar}`
  )
  .setTimestamp()
  .setAuthor({
    name: `Pedido por: ${message.author.username}`,
    iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`
  })
  .setFooter({ text: `${user.user.username}`, iconURL: `${target.user.displayAvatarURL()}` })
  .setColor("YELLOW")


  message.channel.send({ embeds: [Embed] })
  
}
}

/*const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "userinfo",
  alias: [],

  execute (client, message, args){

    let estados = {
      "online": "Conectado 🟢",
      "offline": "Desconectado ⚫",
      "idle": "Ocupado 🟡",
      "dnd": "No Molestar 🔴"
    }

let usuario = message.mentions.members.first() || message.member;
    let embed = new Discord.MessageEmbed()
      .setColor("#f6ff00")
      .setTitle(`Informacion del usuario ${usuario.user.username}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setThumbnail(usuario.user.displayAvatarURL())
      .addField(`Nombre Completo`, `${usuario.user.tag}`)
      .addField(`ID`, `${usuario.id}`)
      .addField(`Estado`, `${estados[usuario.presence.status]}`)
      .addField(`Discriminator`, `${usuario.discriminator}`)
      .setImage(`https://images-ext-1.discordapp.net/external/pL3HmMhMmGrOmr1EQE7m3QPLNX2OE7K4IB0s37cMHXM/https/cdn.discordapp.com/icons/702009979217117195/d13c64007d029a6d55662ed8b92e24a2.png`)

    message.channel.send({embeds: [embed]})

	},
};
*/


  