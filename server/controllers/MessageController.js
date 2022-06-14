const Message = require('../models/Message');
const User = require('../models/User');
const witClient = require('../middleware/Wit')

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

        witClient.message(content)
        .then(data => {
            console.log('Intent name: ' + data.intents[0].name);
            res.status(200).send(message)
        }).catch(console.error);
    } catch (error) {
        console.log('This is ERROR', error.message)
        res.status(400).json({ error: error.message });
    }
}

module.exports = { allMessage, sendMessage }