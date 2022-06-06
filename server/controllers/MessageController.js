const Message = require('../models/Message');
const User = require('../models/User');

const allMessage = async(req, res) => {
    try {
        const message = await Message.find({ user: req.params.userId});
        
        res.json(message);
    } catch (error) {
        console.log('This is ERROR', error.message)
        res.status(400).json({ error })
    }
}

const sendMessage = async(req, res) => {
    const { content, userId } = req.body;

    if(!content || !userId) {
        console.log("Invalid data passed into request");

        return res.sendStatus(400);
    }

    var newMessage = {
        sender: userId,
        content: content,
        user: userId
    };

    try {
        var message = await Message.create(newMessage);

        res.json(message)
    } catch (error) {
        console.log('This is ERROR', error.message)
        res.status(400).json({error});
    }
}

module.exports = { allMessage, sendMessage}