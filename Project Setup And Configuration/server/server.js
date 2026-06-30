const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoutes = require('./routes/userRoutes.js');
const suggestionRoutes = require('./routes/suggestionRoutes.js');
dotenv.config();

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());


app.use('/', userRoutes);
app.use('/', suggestionRoutes);

const PORT =  4000;

app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`);
});