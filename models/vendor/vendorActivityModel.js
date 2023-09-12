const mongoose = require('mongoose');

const vendorActivitySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        trim: true
    },
    activityLog:[
        {
            type: new mongoose.Schema({
                message:String
            },{
                timestamps:true
            })
        }
    ]
},{
    timestamps:true
})


const VendorActivity = mongoose.model('VendorActivity', vendorActivitySchema)

module.exports = VendorActivity