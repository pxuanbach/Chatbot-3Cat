const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        sender: {
            type: String
        },
        content: {
            type: String,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        },
    }, 
    { timestamps: true}
)

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;