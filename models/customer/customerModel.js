const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
        trim: true,
        lowercase: true
    },
    serviceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        trim: true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceCategory',
        trim: true
    },
    serviceCratedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        trim: true
    }
},{
    timestamps:true
})


const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer