const jwt = require('jsonwebtoken');
const vendorUser = require("../models/vendor/vendorModel")
require('dotenv').config();

module.exports = (req, res, next) => {

    // authorization === 'Bearer xtsjdncksnsfnksfki'

    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({error: 'You must be logged in as Vendor.'})
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, payload) => {
        if(error) {
            return res.status(401).json({error: 'You must be logged in as Vendor.'})
        }
        
        const {_id} = payload;
        const user = await vendorUser.findById(_id);
        if(!user) return res.status(401).json({error: 'You must be logged in as Vendor.'})
        req.user = user;
        next();
    })
}
