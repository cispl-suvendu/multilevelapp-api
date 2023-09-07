const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
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
        default:"VENDOR"
    },
    isActive: {
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})


const Vendor = mongoose.model('Vendor', vendorSchema)

module.exports = Vendor