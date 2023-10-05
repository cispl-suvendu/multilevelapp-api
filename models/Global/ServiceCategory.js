const mongoose = require('mongoose');

const ServiceCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field!'],
        trim: true
    },
    caturl: {
        type: String,
        required: [true, 'Cat url is required field!'],
        trim: true
    }, 
    catstatus:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})


const ServiceCategory = mongoose.model('ServiceCategory', ServiceCategorySchema)

module.exports = ServiceCategory