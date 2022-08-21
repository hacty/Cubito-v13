const mongoose = require("mongoose")
//V3YGZHLbO9rH31qH
mongoose.connect(process.env.mongoose, {
useNewUrlParser: true,
useUnifiedTopology: true
})
console.log("Conectado a MongoDB")
