const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const lanzaderaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese el nombre'],
    unique: true
  },

  description: {
    type: String,  
  },

  website: {  
    type: String
  },

  sector: [{  //Hay que ver si lo juntamos con categorías o queda separado
    type: String
  }],

  image: {
    type: String,
  }}, { timestamps: true });

const Lanzadera = mongoose.model('Lanzadera', lanzaderaSchema);

module.exports = Lanzadera;
