const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const chatSchema = new mongoose.Schema({
    users: [{ type: ObjectId, ref: 'User' }],
    messages: [{
      sender: { type: ObjectId, ref: 'User' },
      content: String,
      timestamp: { type: Date, default: Date.now }
    }]
  });
  
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

