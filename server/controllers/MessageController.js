const Message = require('../models/Message');
const User = require('../models/User');
const witClient = require('../config/Wit')
const nlp = require('../middleware/NLP')

const allMessage = async (req, res) => {
    try {
        const userId = req.params.userId
        const messages = await Message.find({ user: userId });

        res.status(200).send(messages);
    } catch (error) {
        console.log('This is ERROR', error.message)
        res.status(400).json({ error })
    }
}

const sendMessage = async (req, res) => {
    try {
        const { content, userId } = req.body;

        if (!content || !userId) {
            console.log("Invalid data passed into request");
            res.status(400).send({ error: "Invalid data passed into request" });
        }

        var newMessage = {
            sender: userId,
            content: content,
            user: userId
        };
        var message = await Message.create(newMessage);

        var witRes = await witClient.message(content)
        console.log('wit response: ' + JSON.stringify(witRes));
        var reply = await nlp.handleMessage(witRes, userId)

        var newBotMessage = {
            sender: 'bot',
            content: reply,
            user: userId
        }
        var botMessage = await Message.create(newBotMessage);

        res.status(200).send({
            message,
            botMessage
        })
    } catch (error) {
        console.log('This is ERROR', error.message)
        res.status(400).json({ error: error.message });
    }
}

const clearAllMessage = (req, res) => {
    try {
        const userId = req.params.userId
        Message.deleteMany({ user: userId })
        .then(() => {
            res.status(200).send({success: true});
        })
    } catch (error) {
        console.log('This is ERROR', error.message)
        res.status(400).json({ error, success: false })
    }
}

module.exports = { allMessage, sendMessage, clearAllMessage }