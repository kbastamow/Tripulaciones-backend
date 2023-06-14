const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const GroupSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    userIds: [{ type: ObjectId, ref: "User" }],
    groupAdmins: [{ type: ObjectId, ref: "User" }],
    messages: [{
        sender: { type: ObjectId, ref: 'User' },
        content: String,
        timestamp: { type: Date, default: Date.now }
      }],
    image: String
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
