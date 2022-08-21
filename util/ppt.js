const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "ppt",
  alias: [],

  execute (client, message, args){

      // Condicionaremos que si el usuario no manda ningun argumento. O sea solo escribe el comando. *
  if(!args[0]) return message.channel.send("Opciones: `piedra`, `papel` o `tijera`").then(m => m.delete({timeout: 10000})) //El .then() es opcional, yo siempre lo agrego porque me gusta.
  
  // Haremos una declaracion en matriz con las diferentes opciones ya dichas.
  let Options = ["piedra", "papel", "tijera"]
  // Condicionamos la matriz con el metodo .includes() que nos va a determinar si lo que mandamos esta dentro de la matriz, si es si no devolvera true sino false.
  if(!Options.includes(args[0].toLowerCase())) return message.channel.send(":x: Opcion incorrecta!")
  
  //Ahora empezamos a obtener las cosas de la matriz y condicionamos..
  
  // Si args[0] es igual a "piedra" (if(args[0] == <piedra/papel/tijera>) {})
  if(args[0] == "piedra") {

    // Creamos una condicional de matriz que tendra las respuestas.
    let random1 = ["He ganado! Elegi papel. El papel cubre a la roca.", // Perdedor -jeje-
                   "Has ganado! Elegi tijera. Las tijeras no pueden cortar rocas.",  // Ganaste :D
                   "Empate. Piedra vs piedra, gana... La piedra!"] // Empate ._.

    // Enviamos el mensaje aplicando Math.random() que nos dara una respuesta aleatoria de la matriz.
    message.reply(" "+random1[Math.floor(Math.random() * random1.length)]+"")
    
    // Si no es "piedra", pero es "papel"
  } else if(args[0] == "papel") {

    let random2 = ["He ganado! Elegi tijera. Las tijeras cortan el papel.", // Perdedor -jeje-
                   "Has ganado! Elegi piedra. El papel cubre a la roca.",  // Ganaste :D
                   "Empate."] // Empate ._.

    message.reply(" "+random2[Math.floor(Math.random() * random2.length)]+"")
    
  } else if(args[0] == "tijera") {
      let random3 = ["He ganado! Elegi piedra. Las tijeras no pueden cortar rocas.", // Perdedor -jeje-
                   "Has ganado! Elegi papel. Las tijeras cortan papel.",  // Ganaste :D
                   "Empate."] // Empate ._.

    message.reply(" "+random3[Math.floor(Math.random() * random3.length)]+"")

  } //Hagan este ultimo ustedes, no les voy a hacer el code al 100% xd
  
}

