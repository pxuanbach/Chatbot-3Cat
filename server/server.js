require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/config');
const messageRoutes = require('./routes/MessageRoutes');
const authRoutes = require('./routes/authRoutes')
const accountRoute = require('./routes/accountRoute');
const bodyParser = require('body-parser');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(accountRoute);

app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

