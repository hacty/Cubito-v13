const pre = require("../../Schema/prefix")
(async () => {
let prefijo = await pre.findOne({ idguild: guild.id })
if(!prefijo){
  let datosnuevos2 = new prefix({

    idguild: idguild.data,
    prefix: prefix.data
  })
  await datosnuevos2.save()
 }

    let prefix = prefijo.warn
})
