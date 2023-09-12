const mongoose = require('mongoose');

const adminActivitySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
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


const AdminActivity = mongoose.model('AdminActivity', adminActivitySchema)

module.exports = AdminActivity