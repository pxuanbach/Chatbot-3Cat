const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        isGroupChat: {
            type: Boolean,
            default: false
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }],
        lasestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    { timestamps: true}
)

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;