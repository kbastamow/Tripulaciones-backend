const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Por favor ingrese un título']
        },

        description: {
            type: String,
            required: [true, 'Por favor ingrese algo de contenido']
        },

        date: {
            type: Date,
            required: true
        },

        image: {
            type: String,
        },

        url: {
            type:String,
            default: "https://edem.eu"
        },

        categoryIds: [ 
            {type: ObjectId, ref: 'Category'}
        ],

    }, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;