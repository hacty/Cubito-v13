/*
Actualizacion del replit:
https://replit.com/@Vicente234/Bot-Discordjs-v1
*/
const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { token, client_secret_google_dir } = require('./config');
const config = require('./config')
const Timeout = new Set();
const ms = require('ms')
const Discord = require('discord.js')
const intents = new Intents(32767)
const client = new Client({ intents })
require('./conexion')

const GoogleAssistant = require('google-assistant');


client.akinator = require('./util/akinator');
///Codigo del bot ¡ACABAS DE MENCIONARME!
client.on('ready', () => {
	console.log('Inicie sesion ' + client.user.tag);
});
client.snipes = new Map()

client.on('messageDelete', message => {
  const snipes = client.snipes.get(message.channel.id) || [];
  if(snipes.length > 5) snipes = snipes.slice(0, 4)

    snipes.unshift({
    msg: message,
    delete: message.author,
    canal: message.channel.id,
    time:Date.now()
    })

    client.snipes.set(message.channel.id, snipes)
  
});

client.slashes = new Collection();
client.commands = new Collection()
client.aliases = new Collection();
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
//Slash carpetas
const slashFolders = fs.readdirSync('./slashes');
for (const folder of slashFolders) {
const slashFiles = fs.readdirSync(`./slashes/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of slashFiles) {
		const command = require(`./slashes/${folder}/${file}`);
  client.slashes.set(command.data.name, command)
}
}

///
function requerirhandlers() {
    ["events", "bienvenida"].forEach(handler => {
        try {
            require(`./handlers/${handler}`)(client, Discord)
        } catch (e) {
            console.warn(e)
        }
    })
}
requerirhandlers();
/////ttt

const TicTacToe = require('discord-tictactoe')

new TicTacToe({
    token: token,
    language: "en",
    command: "tictactoe",
    commandOptionName: "opponent",
    textCommand: "!ttt"
})




/////tts

const prefixSchema = require("./Schema/guildconfigs")


//////////////////
client.prefix = async function(message) {
    let custom;

    const data = await prefixSchema.findOne({ guildID : message.guild.id })
    .catch(err => console.log(err))

    if(data) {
        custom = data.prefix;
    } else {
        let prefixp = "c#"
        custom = prefixp;
    }
    return custom;
}
///////////

  client.on("messageCreate", async (message) => {
      
    const p = await client.prefix(message)

        if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Hola  ${message.author.tag}`)
        .setDescription(`Soy ${client.user} Mi prefix aqui es ${p}\n Usa ${p}help para ver los comandos que tengo`)
        .setColor("#f6ff00")
      return message.reply({ embeds: [embed] })
    }
 
 if (!message.content.toLowerCase().startsWith(p)) return;  //////SI NO USA ESE PREFIJO, NO RESPONDER
  if (message.author.bot) return;   //////NO BUCLE, NO RESPONDER A SI MISMO
  let usuario = message.mentions.members.first() ||  message.member; ////SE DEFINE USUARIO
  const args = message.content.slice(p.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let cmd = client. commands.find((c) => c.name === command ||  c.alias && c.alias.includes(command));
  if(cmd){
    if(cmd.permisos){
      if(!message.member.permissions.has(cmd.permisos)) return message.reply(`**No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes **permisos** ${cmd.permisos.map(permiso => `\`${permiso}\``).join(", ")}`)
        }
    cmd.execute(client, message, args)
  }
if(!cmd){

    if(message.content === p) return
  
  const embed = new MessageEmbed()

  //.setDescription(`Error 404\n\nEl comando ${command} no existe\n\n Ve mis comandos con ${p}help <:okey:912749462345093160>`)
  .setTitle(`Error 404`)
  .setDescription(`El comando **${command}** No existe! <:error:1006382292115132487> \nUsa **${p}help** para ver mis comandos`)
  .setColor("RED")
  .setTimestamp()

  message.channel.send({ embeds: [embed]})
}
  
})



//evento interaction create (de slashs)

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.slashes.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: '¡Hubo un error al ejecutar este comando!', ephemeral: true });
	}
});

//evento interaction create (menus)
	client.on('interactionCreate', async interaction => {
  const db = require('quick.db')
	if (!interaction.isSelectMenu()) return;
  

  //filtros
const filter = i => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({ filter });

//collector, donde serviran los menus
    collector.on('collect', async i => {

      //menu 1, (el de help)

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

        //opciones del menu 1 (help)
    if (i.values[0] === 'inicio') {
      try{
    await i.deferUpdate();
    
	    const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("\n**--Utiles--**\nsuggest: `Envia una sugerencia al personal`\nserverinfo: `informacion del servidor`.✅\navatar: `Observa tu avatar en tiempo exacto` 😁 \nhycraft `Para saber todo de hycraft`🎁\nuserinfo: `Informacion de usuario`📲 \nsay: `Puedes escribir cualquier cosa y yo la dire`🎧 \nclear: `Para borrar mensajes del 1 al 100`\nping: `Quieres mi ping exacto?`📲\nsuggest : `Envia una sugerencia al personal`📩")
.setColor('#f6ff00')
    i.editReply({ embeds: [emb], components: [row] })
      } catch (e) {
        const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("\n**--Utiles--**\nsuggest: `Envia una sugerencia al personal`\nserverinfo: `informacion del servidor`.✅\navatar: `Observa tu avatar en tiempo exacto` 😁 \nhycraft `Para saber todo de hycraft`🎁\nuserinfo: `Informacion de usuario`📲 \nsay: `Puedes escribir cualquier cosa y yo la dire`🎧 \nclear: `Para borrar mensajes del 1 al 100`\nping: `Quieres mi ping exacto?`📲\nsuggest : `Envia una sugerencia al personal`📩")
.setColor('#f6ff00')
       i.editReply({ embeds: [emb], components: [row]})
      }
    }

    if (i.values[0] === 'owners') {
      try{
    await i.deferUpdate();
    
    const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("meme: `Un meme random para alegrar el dia`🤣 \nfuturo: `Para que sepas tu futuro` 🎃\npat: `acaricia tiernamente a un usuario `✨\nlove: `¿Cuanto amor le tienes a una persona?` 💞 \nhug: `Abraza a alguien tiernamente ` 💙\n8ball `Pregunta algo random yo te contestare.`\naki `Hora de jugar akinator.`\ndelete`Creo una imagen borrando la foto de perfil de quien tu quieras`\nespejo`Observaras aquello que mas amas`\nfacha`Cuanta facha tenes??`\ngay`Cuanto gay eres??`\nsdlg`Enviara tu imagen con un pacman`\nttt`a jugar tictactoe :D`")
.setColor('#f6ff00')
    i.editReply({ embeds: [emb], components: [row] })
    } catch (e) {
      const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("meme: `Un meme random para alegrar el dia`🤣 \nfuturo: `Para que sepas tu futuro` 🎃\npat: `acaricia tiernamente a un usuario `✨\nlove: `¿Cuanto amor le tienes a una persona?` 💞 \nhug: `Abraza a alguien tiernamente ` 💙\n8ball `Pregunta algo random yo te contestare.`\naki `Hora de jugar akinator.`\ndelete`Creo una imagen borrando la foto de perfil de quien tu quieras`\nespejo`Observaras aquello que mas amas`\nfacha`Cuanta facha tenes??`\ngay`Cuanto gay eres??`\nsdlg`Enviara tu imagen con un pacman`\nttt`a jugar tictactoe :D`")
.setColor('#f6ff00')
        i.editReply({ embeds: [emb], components: [row]})
      }
    }
	    
	    if (i.values[0] === 'diversion') {
        try{
    await i.deferUpdate();
    const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("timeout: `Aisla a un usuario de un servidor`\nsetprefix: `Establece un prefix en el servidor`\nsetsuggest: `Establece un canal de sugerencias`\nmuterol: `Establece un rol de mute` 🔇 \nmute: `mutea a un usuario` 🔇 \nkick: `Expulsa a un usuario` 🚪 \nban `banea a un usuario` 🚪 \nwarn: `advierte a un usuario` 🗣️")
.setColor('#f6ff00')
    i.editReply({ embeds: [emb], components: [row] })
  
    } catch (e) {
      const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("timeout: `Aisla a un usuario de un servidor`\nsetprefix: `Establece un prefix en el servidor`\nsetsuggest: `Establece un canal de sugerencias`\nmuterol: `Establece un rol de mute` 🔇 \nmute: `mutea a un usuario` 🔇 \nkick: `Expulsa a un usuario` 🚪 \nban `banea a un usuario` 🚪 \nwarn: `advierte a un usuario` 🗣️")
.setColor('#f6ff00')
        i.editReply({ embeds: [emb], components: [row]})
      }
      }

if (i.values[0] === 'otro') {
  try{
    await i.deferUpdate();
    
    const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("fish: `Listo para pescar y conseguir dinero?`🎣 \nmine: `Mina en las diferentes minas y mejora tu pico.`⛏️ \nbag: `Que tienes en tu mochila?`👜 \nnivel: `Tus niveles hay estaran :D`⛏️\nmcskin: `Observa tu skin premium`<:imagen_20220213_185804:1010751053014241311>\nmcserver: `Escribe la ip de un servidor y te mostrare su informacion`<:mc2:1010751252352729161>")
.setColor('#f6ff00')
   i.editReply({ embeds: [emb], components: [row] })

   } catch (e) {
     const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("fish: `Listo para pescar y conseguir dinero?`🎣 \nmine: `Mina en las diferentes minas y mejora tu pico.`⛏️ \nbag: `Que tienes en tu mochila?`👜 \nnivel: `Tus niveles hay estaran :D`⛏️\nmcskin: `Observa tu skin premium`<:imagen_20220213_185804:1010751053014241311>\nmcserver: `Escribe la ip de un servidor y te mostrare su informacion`<:mc2:1010751252352729161>")
.setColor('#f6ff00')
        i.editReply({ embeds: [emb] , components: [row]})
      }
    }	    
	    
	if (i.values[0] === 'otroxd') {
    try{
    await i.deferUpdate();
    
    const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("bal: `Observa todo tu dinero`💸 \nbuy: `Compra las cosas de la tienda`💸\ndaily: `Obten tu dinero diarion`💸\nwork: `Listo para trabajar?`💸\ndep `Guarda el dinero al banco`\nwith `Saca el dinero del banco`\nrob`Que tramas hacer?`\nshop `Observa la tienda`")
.setColor('#f6ff00')
    i.editReply({ embeds: [emb], components: [row] })
    } catch (e) {
      const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("bal: `Observa todo tu dinero`💸 \nbuy: `Compra las cosas de la tienda`💸\ndaily: `Obten tu dinero diarion`💸\nwork: `Listo para trabajar?`💸\ndep `Guarda el dinero al banco`\nwith `Saca el dinero del banco`\nrob`Que tramas hacer?`\nshop `Observa la tienda`")
.setColor('#f6ff00')
        i.editReply({ embeds: [emb], components: [row]})
      }
    }

        if (i.values[0] === 'mus') {
    try{
    await i.deferUpdate();
    
    const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("play: `Reproduce una cancion`\npause: `Pausa la cancion`\ncontinue: `Continua la cancion pausada`\nqueue: `Mira tu playlist`\nstop: `Para la cancion`\nskip: `Sigue a la siguiente cancion de tu playlist`\nlirycs: `Mira la letra de la cancion`")
.setColor('#f6ff00')
    i.editReply({ embeds: [emb], components: [row] })
    } catch (e) {
      const emb = new MessageEmbed()
.setAuthor('Help', interaction.user.displayAvatarURL())
.setDescription("play: `Reproduce una cancion`\npause: `Pausa la cancion`\ncontinue: `Continua la cancion pausada`\nqueue: `Mira tu playlist`\nstop: `Para la cancion`\nskip: `Sigue a la siguiente cancion de tu playlist`\nlirycs: `Mira la letra de la cancion`")
.setColor('#f6ff00')
        i.editReply({ embeds: [emb], components: [row]})
      }
    }    
	    
 });

  })
require('./slashes.js');

//Distube



///Actividades

client.on('ready', (ready) => {

  const array = [
{
  name: `c#help`,
  type: 'PLAYING',
 
}

  ]
  
  setInterval(() => {
    function presence() {
    client.user.setPresence({
      status: 'dnd',
      activities: [{
      name: "Prefix #",
       type: "PLAYING",
       }],
      activities: [{
      name: `Con ${client.users.cache.size} usuarios`,
      type: 'STREAMING',
      url: `https://www.twitch.tv/soycubo`
       }],
        activities: [{
         name: `Minecraft 1.8`,
         type: 'PLAYING'
        }],
        activities: [{
         name: `Minecraft 1.8`,
         type: 'PLAYING'
        }],
        activities: [{
         name: `Con comandos de musica!`,
         type: 'LISTENING'
        }],
        activities: [{
         name: `Me fabrique un mouse de carton :D`,
         type: 'WATCHING'
        }],
        activities: [{
         name: `Mencioncioname o usa #help`,
         type: 'STREAMING',
         url: 'https://www.twitch.tv/soycubo'
        }],
        activities: [{
         name: `Contra un ajolote`,
         type: 'COMPETING'
        }],
        activities: [{
         name: `Ya son: ${client.channels.cache.size} canales de texto y ${client.guilds.cache.size} servidores :D`,
         type: 'STREAMING',
         url: `https://www.twitch.tv/soycubo`
        }],
        
        
    });
  }

  presence();
}, 6999)

})

client.on("ready", () => {
  console.log(`INICIADO COMO BOT: ${client.user.tag}`);
});


/*process.on('unhandledRejection', error => {
    console.error(error);
});

client.on('shardError', error => { 
    console.error(error);
}); */

const channel = client.channels.cache.get("1010748298451243110")

process.on("unhandledRejection", (reason, promise) => {
    const embed = new MessageEmbed()
    .setTitle(`Unhandled Rejection`)
    .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
    .addField("Promesa", `\`\`\`${promise}\`\`\``, true)
    .addField("Razón", `\`\`\`${reason}\`\`\``, true)
    .setTimestamp()
    .setColor('RED')
    client.channels.cache.get(`1010748298451243110`).send({ embeds: [embed] })
});

process.on("uncaughtException", (err, origin) => {
    const embed = new MessageEmbed()
    .setTitle(`Uncaught Exception`)
    .setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
    .addField("Origen", `\`\`\`${origin}\`\`\``, true)
    .addField("Error", `\`\`\`${err}\`\`\``, true)
    .setTimestamp()
    .setColor('RED')
    client.channels.cache.get(`1010748298451243110`).send({ embeds: [embed] })
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
    const embed = new MessageEmbed()
    .setTitle(`Uncaught Exeption Monitor`)
    .setURL("https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor")
    .addField("Origen", `\`\`\`${origin}\`\`\``, true)
    .addField("Error", `\`\`\`${err}\`\`\``, true)
    .setTimestamp()
    .setColor('RED')
    client.channels.cache.get(`1010748298451243110`).send({ embeds: [embed] })
});

process.on("multipleResolves", (type, promise, reason) => {
    const embed = new MessageEmbed()
    .setTitle(`Multiple resolves`)
    .setURL("https://nodejs.org/api/process.html#event-multipleresolves")
    .addField("Tipo", `\`\`\`${type}\`\`\``, false)
    .addField("Promesa", `\`\`\`${promise}\`\`\``, true)
    .addField("Razón", `\`\`\`${reason}\`\`\``, true)
    .setTimestamp()
    .setColor('RED')
    client.channels.cache.get(`1010748298451243110`).send({ embeds: [embed] })
});

client.on('shardError', error => {
    console.error(error);
});

//Pie de pagina
client.login(token)

    const days = Math.floor(client.uptime / 86400000)
    const hours = Math.floor(client.uptime / 3600000) % 24
    const minutes = Math.floor(client.uptime / 60000) % 60
    const segundos = Math.floor(client.uptime / 1000) % 60

client.on("ready", () => {

      const on = new Discord.MessageEmbed()
  .setTitle(`Estado de ${client.user.username}`)
  .setDescription(`> **🟢 Estoy Encendido 💚**\n> \n> **Uptime:** <t:${(parseInt(client.readyAt / 1000)).toFixed(0)}:R>\n> \n> **⚡ Comandos normales: ${client.commands.size}**\n> \n> **📖 Servidores: ${client.guilds.cache.size} **\n > \n> **:bust_in_silhouette: Usuarios: ${client.users.cache.size} **\n> \n> **📢 Canales: ${client.channels.cache.size} **\n> \n> **📚 Comandos slash: ${client.slashes.size} **`)
  .setImage("https://cdn.discordapp.com/attachments/967529099847434321/1006595787511304283/profile.png")
  .setThumbnail(client.user.avatarURL({ dynamic: true }))
  .setColor("#f6ff00")

  client.channels.cache.get(`1010748347277135992`).send({ embeds: [on] })
  /*
  client.channels.cache.get("1006596241175621702").send("Bot encendido correctamente").then((msg) => {
      msg.react("<:okey:912749462345093160>")

      msg.awaitReactions((reaction, user) => {
        if(message.author.id !== user.id) return;
        if(reaction.emoji.name === '<:okey:912749462345093160>'){
          msg.channel.delete()
        }
      })
*/ //   })
})
//client.on("ready", () => {  client.channels.cache.get("941451615762800701").send("c#ticket").then(a => setTimeout(() => a.delete(), 1))
    //})

//////

client.on('messageCreate', async (message) => {
/*
const levels = require('./Schema/levels')
    const data = await levels.findOne({guildID: message.guild.id, userID: message.author.id})

    let randomXp;
    if(message.content.length <= 5){
        randomXp = Math.floor(Math.random()* 3 ) + 1
    } else if (message.content.length >= 30 && message.content.length <= 50){
        randomXp = Math.floor(Math.random() * 20 ) + 1
    } else if (message.content.length <= 50 && message.content.length <= 60){
        randomXp = Math.floor(Math.random() * 40 ) + 1
    } else if (message.content.length <= 60 && message.content.length <= 70){
        randomXp = Math.floor(Math.random() * 50 ) + 1
    } else if (message.content.length <= 70 && message.content.length <= 80){
        randomXp = Math.floor(Math.random() * 60 ) + 1
    } else if (message.content.length <= 80 && message.content.length <= 90){
        randomXp = Math.floor(Math.random() * 70 ) + 1
    } else if (message.content.length <= 90 && message.content.length <= 100){
        randomXp = Math.floor(Math.random() * 80 ) + 1
    } else if (message.content.length <= 100){
        randomXp = Math.floor(Math.random() * 90 ) + 1
    }

    if(!data){

      const newdata = new levels({
          guildID: message.guild.id,
          userID: message.author.id,
          xp: randomXp

      })
        return await newdata.save()
    }
    const xpTotal = data.xp + randomXp

    if(message.author.bot) return;

    if(xpTotal >= data.limit){
        if (message.guild.id === ("702009979217117195") ){
        client.channels.cache.get("796763522331312199").send(`Vamoos... El cubito **${message.author}** ha llegado al nivel **${data.level + 1}**`)
        return await levels.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id}, {xp: xpTotal, level:data.level + 1, limit: data.limit + 400})

            let dataGlobal = await levels.find({guildID: message.guild.id}).sort([["xp", "descending"]]).exec();



           const data = await levels.findOne({userID: member.id, guildID: message.guild.id})
              if (data.xp === 19){
                message.member.roles.add("702015863552737290")
            }
   }else{
        message.channel.send(`Vamoos... El cubito **${message.author}** ha llegado al nivel **${data.level + 1}**`)
        return await levels.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id}, {xp: xpTotal, level:data.level + 1, limit: data.limit + 500})
    }
}

    await levels.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id}, {xp: xpTotal})

  */  ///

   /*   if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    const embed = new Discord.MessageEmbed()
      .setTitle("¡ACABAS DE MENCIONARME!")
      .setDescription(`Este bot fue hecho por \n\n<:Mod:940613935877456003>**Desarrolladores**<:Mod:940613935877456003>\n Gay Man#0001 MauricioAnimator#7240 Sr Michi#7003 Matii#4755 hactylol#1757 Oscar_Dev#9482 \n<:Dirigente:940614241461887047>**Superior**<:Dirigente:940614241461887047>\n Knight#7690 Luiggi#5110 \n \n**Usa c#help para ver mis comandos** \n \n**[Invitame!!](https://dashboard-cubo.hacty.repl.co)**`)
      .setThumbnail("https://images-ext-1.discordapp.net/external/pL3HmMhMmGrOmr1EQE7m3QPLNX2OE7K4IB0s37cMHXM/https/cdn.discordapp.com/icons/702009979217117195/d13c64007d029a6d55662ed8b92e24a2.png")
      .setColor("#f6ff00")
      .setFooter("CuboBot")
      .setTimestamp()

    message.channel.send({embeds: [embed]})
    }*/
          
})
/*
client.on("message", async message =>{
    const newcom = require("./Schema/newcom")


    let sufijox;
    let mensajex;

    const data = await newcom.findOne({ guildID : message.guild.id })
    .catch(err => console.log(err))

    if(data) {
        sufijo = data.sufijo;
        mensaje = data.mensaje;
    } 
    return sufijox;
    return mensajex;
    
    if(message.content.startsWith(p + sufijox)) {

   message.channel.send(mensajex)


  }
})

*/
////
client.on("interactionCreate", async (interaction) => {
    if(interaction.isButton()){
        const sugSchema = require("./Schema/SugerenciasSchema")
        const votosSchema = require("./Schema/VotosSchema")
        try{
            let setup_data = await sugSchema.findOne({ guildId: interaction.guild.id })
            let msg_data = await votosSchema.findOne({ messageId: interaction.message.id })
    
            if(!msg_data || !setup_data || !setup_data.channelId || interaction.channelId !== setup_data.channelId) return
            switch(interaction.customId){
                case "votar_si": {
                    if(msg_data.si.includes(interaction.user.id)) return interaction.reply({ content: `Ya has votado \`si\` en la sugerencia de <@${msg_data.author}>.`, ephemeral: true })
    
                    if(msg_data.no.includes(interaction.user.id)) msg_data.no.splice(msg_data.no.indexOf(interaction.user.id), 1)
    
                    msg_data.si.push(interaction.user.id)
                    msg_data.save()
    
                    //interaction.message.embeds[0].fields[0].value = `\`\`\`${msg_data.si.length} votos \`\`\``;
                    //interaction.message.embeds[0].fields[1].value = `\`\`\`${msg_data.no.length} votos \`\`\``;
    
                    interaction.message.components[0].components[0].label = msg_data.si.length.toString();
                    interaction.message.components[0].components[1].label = msg_data.no.length.toString();
    
                    await interaction.message.edit({ embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]] })
                    interaction.deferUpdate()
                }
                    break;
    
                case "votar_no": {
                    if(msg_data.no.includes(interaction.user.id)) return interaction.reply({ content: `Ya has votado \`no\` en la sugerencia de <@${msg_data.author}>.`, ephemeral: true })
                    if(msg_data.si.includes(interaction.user.id)) msg_data.si.splice(msg_data.si.indexOf(interaction.user.id), 1)
                    msg_data.no.push(interaction.user.id)
                    msg_data.save()
    
    //                interaction.message.embeds[0].fields[0].value = `\`\`\`${msg_data.si.length} votos \`\`\``;
    //                interaction.message.embeds[0].fields[1].value = `\`\`\`${msg_data.no.length} votos \`\`\``;
    
                    interaction.message.components[0].components[0].label = msg_data.si.length.toString();
                    interaction.message.components[0].components[1].label = msg_data.no.length.toString();
    
                    await interaction.message.edit({ embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]] })
                    interaction.deferUpdate()
                }
                    break;
                case "ver_votos": {
                    interaction.reply({
                        embeds: [new Discord.MessageEmbed()
                            .setTitle("Votos de la sugerencia")
                            .addField("✅ Votos positivos", msg_data.si.length >= 1 ? msg_data.si.map(u => `<@${u}>\n`).toString() : "No hay votos.", true)
                            .addField("❌ Votos negativos", msg_data.no.length >= 1 ? msg_data.no.map(u => `<@${u}>\n`).toString() : "No hay votos.", true)
                            .setColor("RANDOM")
                        ],
    
                        ephemeral: true,
                    })
                }
                    break;
                
                default: 
                    break;
            }
        } catch(e){
            console.log(e)
        }

    }
        
    })

////////////////////////////

const express = require('express')
const app = express();

app.get("/", async(req, res) => {
  res.sendFile(__dirname + "/owo.html")
})

app.listen(3000, () => {
        console.log('Pagina lista.'.blue);
    })