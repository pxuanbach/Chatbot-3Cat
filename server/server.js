require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/config');
const authRoutes = require('./routes/authRoutes')

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));