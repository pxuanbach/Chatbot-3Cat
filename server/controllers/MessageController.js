const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');

const allMessage = async(req, res) => {
    try {
        const message = await Message.find({ chat: req.params.chatId})
                                .populate("sender", "name pic email")
                                .populate("chat");
        
        res.json(message);
    } catch (error) {
        console.log('This is ERROR', error.message)
        res.status(400).json({ error })
    }
}

const sendMessage = async(req, res) => {
    const { content, chatId } = req.body;

    if(!content || !chatId) {
        console.log("Invalid data passed into request");

        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic").execPopulate();
        message = await message.populate("chat").execPopulate();
        message = await User.populate(message, {
            path: "chat.user",
            select: "name pic email"
        })

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message});

        res.json(message)
    } catch (error) {
        console.log('This is ERROR', error.message)
        res.status(400).json({error});
    }
}

module.exports = { allMessage, sendMessage}