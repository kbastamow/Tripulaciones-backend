const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CategorySchema = new mongoose.Schema({
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

CategorySchema.index({
  name: "text",
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
