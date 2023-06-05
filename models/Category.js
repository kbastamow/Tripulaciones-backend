const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese una categoria'],
    unique: true
  },
  eventIds: [
    {
      type: ObjectId,
      ref: 'Event'
    }
  ]
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
