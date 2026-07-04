const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoutes = require('./routes/userRoutes.js');
const suggestionRoutes = require('./routes/suggestionRoutes.js');

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();
const corsOptions = {
    origin: [
        'http://localhost:5173', 
        'https://nutrition-assistant-1.onrender.com' // Add your live frontend URL here
    ],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes - Explicitly mounting them
app.use('/', userRoutes); 
app.use('/', suggestionRoutes);

app.get('/', (req, res) => {
    res.send('Backend API Server is running cleanly!');
});

const PORT = 4000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
    // This logs the paths to confirm routes exist
    console.log("Routes mounted for /login and /register");
});
