require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/config');
const chatRoutes = require('./routes/ChatRouter');
const messageRoutes = require('./routes/MessageRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const io = require("socket.io")(server, {
    pingTimeOut: 60000,
    cors: {
        origin: "http://localhost:5000",
    }
})

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room);
        socket.log("User joined room: " + room);
    })
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
    
    socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
    });
})
