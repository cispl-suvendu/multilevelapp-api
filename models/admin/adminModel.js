const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required field!'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true
    },
    role:{
        type:String,
        default:"ADMIN"
    }
},{
    timestamps:true
})


const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin