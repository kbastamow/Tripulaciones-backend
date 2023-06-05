const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        data: {
            type: Date,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        categoryId: {
            type: ObjectId,
            ref: 'Category'
          },

    }, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;