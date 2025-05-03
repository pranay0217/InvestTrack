import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},{timestamps: true});
const User = mongoose.model("User", userSchema);
export default User;
// This code defines a Mongoose schema and model for a user in a MongoDB database. The schema includes fields for username, email, and password, all of which are required. The model is then exported for use in other parts of the application.