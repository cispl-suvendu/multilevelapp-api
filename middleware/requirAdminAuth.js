const jwt = require('jsonwebtoken');
const adminUser = require("../models/admin/adminModel")
require('dotenv').config();

module.exports = (req, res, next) => {

    // authorization === 'Bearer xtsjdncksnsfnksfki'

    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({error: 'You must be logged in as Admin.'})
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, payload) => {
        if(error) {
            return res.status(401).json({error: 'You must be logged in as Admin.'})
        }
        
        const {_id} = payload;
        const user = await adminUser.findById(_id);
        if(!user) return res.status(401).json({error: 'You must be logged in as Admin.'})
        req.user = user;
        next();
    })
}
