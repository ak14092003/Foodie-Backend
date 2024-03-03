import express from "express";
import run from "./db.js";
import CreateUser from "./Routes/CreateUser.js";
import cors from "cors";
import DisplayData from "./Routes/DisplayData.js";
import OrderData from "./Routes/OrderData.js";
import dotenv from 'dotenv';
dotenv.config()




// Importing MongoDB connection function from the database module

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
app.use(cors());


// Define route handlers
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use(express.json());
app.use('/api', CreateUser);
app.use('/api', DisplayData);
app.use('/api',OrderData);


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
   




});

