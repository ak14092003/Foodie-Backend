
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

mongoose.set('strictQuery', false);
// Replace the placeholder with your Atlas connection string
const uri = process.env.MONGO_URL;

async function run() {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB Atlas");

        // Fetch all documents from the "food_items" collection
        const FoodItem = mongoose.model("food_items", mongoose.Schema({}), "food_items");
        global.food_items = await FoodItem.find({});
        const foodCategory = mongoose.model("foodCategory", mongoose.Schema({}), "foodCategory");
        global.foodCategory = await foodCategory.find({});
       
    } catch (err) {
        console.error("Error:", err);
    } finally {
        // Close the Mongoose connection when done
       
        
    }
}

run().catch(console.dir);

export default run;
