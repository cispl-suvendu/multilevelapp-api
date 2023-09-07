require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DATABASE_URL

mongoose.set("strictQuery", false);

const contentDB = () => {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = contentDB;
