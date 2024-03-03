import mongoose from "mongoose";




const { Schema } = mongoose;


const UserSchema = new Schema({
    name:{
        type : String,
        required : true
    },

    location:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

const User = mongoose.model('user', UserSchema);
//const User = mongoose.model('user', UserSchema);: 
//This line creates a Mongoose model called User 
//using the mongoose.model() method. The first 
//argument is the singular name of the collection 
//that the model represents, which in this case is 
//'user'. The second argument is the schema 
//(UserSchema) that defines the structure of the 
//documents in the collection.

export default User;