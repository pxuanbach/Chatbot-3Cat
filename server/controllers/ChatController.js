const Chat = require('../models/Chat');
const User = require('../models/User');

const accessChat = async(req, res) => {
    const { userId } = req.body;

    if(!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: { $elemMatch: { $eq: req.user._id}}},
            {users: { $elemMatch: { $eq: userId}}},
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            name: "sender",
            isGroupChat: false,
            users: [req.user._id.userId],
        };

        try {
            const createChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createChat._id}).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat)
        } catch (error) {
            console.log('This is ERROR', error.message);
            res.status(400).json({error});
        }
    }
}

const fetchChats = async (req, res) => {
    try {
        Chat.find({ users: {$elemMatch: { $eq: req.user._id}}})
            .populate("user", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updateAt: -1})
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "lastetMessage.sender",
                    select: "name pic email"
                });

                res.status(200).send(results);
            })
    } catch (error) {
        console.log('This is ERROR', error.message);
        res.status(400).json({error});
    }
}

const createGroupChat = async(req, res) => {
    if(!req.body.user || !req.body.name) {
        return res.status(400).send({ message: "Please fill out the fields"});
    }

    var users = JSON.parse(req.body.user);

    if (users.length < 2) {
        return res.status(400).send("More than 2 users are required to form group chat");
    }

    users.push(req.users)

    try {
        const groupChat = await Chat.create({
            name: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id})
                                        .populate("user", "-password")
                                        .polulate("groupAdmin", "-password")

        res.status(200).json(fullGroupChat);
    } catch (error) {
        console.log('This is ERROR', error.message);
        res.status(400).json({error});
    }
}

const renameGroup = async (req, res) => {
    const { id, name } = req.body;

    const updateChat = await Chat.findByIdAndUpdate(id, 
        {
            name: name,
        },
        {
            new: true,
        }
    )
                                .populate("users", "-password")
                                .populate("groupAdmin", "-password");
    
    if (!updateChat) {
        res.status(400);
        console.log("Chat NOT FOUND");
    } else {
        res.json(updateChat);
    }
}

const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(chatId,
        {
            $pull: { user: userId}
        },
        {
            new: true,
        }
    )
                            .populate("users", "-password")
                            .polulate("groupAdmin", "-password")

    if (!removed) {
        res.status(400);
        console.log("Chat NOT FOUND");
    } else {
        res.json(removed)
    }
}

const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  };

  module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
  };