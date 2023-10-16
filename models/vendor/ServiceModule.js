const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field!'],
        trim: true
    },
    cost: {
        type: Number,
        required: [true, 'Cost is required field!'],
        trim: true
    },
    description: {
        type: String
    },
    images: {
        type: Array
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceCategory',
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        trim: true
    },
    servicestatus: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})


const Services = mongoose.model('Service', ServiceSchema)

module.exports = Services