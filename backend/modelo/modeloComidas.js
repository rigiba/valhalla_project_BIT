//contiene la representacion en codigo de la collection de la base de datos
//sera la plantilla de la collection

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ComidasSchema = new Schema({//variable que tiene todas las propiedades del metodo por eso la instanciamos

   title: String,
   description : String,
   price : Number,
   codigo : String,
   imagen : String,
   personas : Number,
   pais : String


})


//variable modelo = mongoose.model('collection', plantillaconllention)
const Comidas = mongoose.model('comidas', ComidasSchema)

module.exports = Comidas
