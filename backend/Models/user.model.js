import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "userName is required"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
    },
    phone: {
        type: String,
        trim: true,
        required: [true, "Phone number is required"],
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required"],
    },
    address: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    }
    
});

const User = mongoose.model('User', userSchema);
export default User;
