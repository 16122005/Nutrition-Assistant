const mongoose = require('mongoose');

// Define the blueprint for your user account documents
const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    }
});

// Export the template model as 'User' so server.js can find and interact with it
module.exports = mongoose.model('User', UserSchema);