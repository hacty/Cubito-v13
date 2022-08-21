const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

let cooldown = new Set()

module.exports = {
  name: "craft",
  alias: [],

async  execute (client, message, args){

    const opcion = args[0]

let datos = await economia.findOne({ guildID: message.guild.id, userID: message.author.id })
if(!datos){
  let datosnuevos = new economia({
    guildID: message.guild.id,
    userID: message.author.id,
    dinero: 500,
    dinerobanco: 0,
    pico: 0,
    caña: 0,
    tale: 0,
    inventario,
    palos: 0,
    mesa: 0
  })
    
  await datosnuevos.save()
  return message.reply({ content: "<a:charging:919033854398972004> Tus datos estan siendo guardados, vuelve a usar el comando" })
}
    let dinerototal = datos.dinero
    let picowo = datos.pico
    let cañax = datos.caña
    let madera = datos.tale
    let inv = datos.inventario
    let palosx = datos.palos
    let mesabin = datos.mesa

    if(opcion === "Mesa"){
        if(madera > 3, mesabin < 0){
                


            message.reply("Has creado una mesa de crafteo, ahora esta en tu mochila.")

            let mesa = "Mesa de crafteo <:mesa:990070280456130590>"

                let noot = 1
            await economia.findOneAndUpdate({
                userID: message.author.id 
            }, {
                $push:{
                    inventario: mesa 
                },
                mesa: mesabin + Number(noot)
                })
            } else if(mesabin > 0){
  
            message.reply("Ya tienes una mesa O No tienes lo suficiente de madera")
        }
    }
    if(opcion === "Palo"){
        if(madera > 1){

            message.reply("Has creado 4 Palitos, ahora esta en tu mochila.")

            let palitos = "4 Palos <:stick:990069643244883998>"

            let aña = Math.floor(Math.random() * 4) + 3

            await economia.findOneAndUpdate({
                userID: message.author.id 
            }, {
                $push:{
                    inventario: palitos 
                }, palos: palosx + Number(aña) 
                })

            
        } else {
            message.reply("No tienes lo suficiente de madera")
        }
    }
    if(opcion === "PicoM"){
        if(madera > 2, palosx > 1){
            
            if(mesabin  === 1){

            message.reply("Has creado un pico de madera, ahora esta en tu mochila.")

            let pico = "Pico de madera <:wood_pickaxe:990069613368868874>"

            await economia.findOneAndUpdate({
                userID: message.author.id,
                guildID: message.guild.id
            }, {
                $push:{ 
                    inventario: pico
                }
            })
            } else if(mesabin === 0){
                message.reply("Nesesitas una mesa de crafteo")
            }

            
        } else {
            message.reply("No tienes lo suficiente de madera")
        }
    }

 








}
}