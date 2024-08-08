const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const app = express();
// Middleware to parse JSON
app.use(express.json({ extended: false }));

dotenv.config();
//app.use('/api/auth', require('./routes/authRoutes'));

// Connect Database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});