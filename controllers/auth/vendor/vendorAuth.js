const vendorSchema = require("../../../models/vendor/vendorModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Joi = require("joi");
const sendVendorEmailForgotPassword = require("../../../emails/vendor/template-forgot-password")

dotenv.config();

const validateRegisterSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});

const validateLoginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

const validateActiveVendor = Joi.object({
    isActive: Joi.boolean().required()
});

const validateUpdateVendor = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const vendorSignin = async (req, res) => {
    try {
        const { error } = validateLoginSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await vendorSchema.findOne({ email: req.body.email });

        if (!user) return res.status(404).json({error: "You are not a Vendor"});

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).json({error:"Password does not match!"});

        //Create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        // res.header("auth-token", token).send(token);

        const { _id, email, firstName, lastName, role, isActive, createdAt } = user;

        const currentUser = {
            _id, email, firstName, lastName, role, token, isActive, createdAt
        }
        res.status(200).json(currentUser)
    } catch (error) {
        return res.status(505).json({error:error.message});
    }
}


const vendorSignup = async (req, res) => {
    const { error } = validateRegisterSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const emailExists = await vendorSchema.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json({error: "Email allready exists"});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const userData = new vendorSchema({
        email: req.body.email,
        password: hashPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    try {
        const saveUserData = await userData.save();
        const token = jwt.sign({ _id: userData._id }, process.env.TOKEN_SECRET);
        const { _id, email, firstName, lastName, role, isActive, createdAt } = saveUserData;
        const registerData = { _id, email, firstName, lastName, role, token, isActive, createdAt };
        res.status(200).json(registerData)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const listAllVendor = async (req, res) => {
    const data = await vendorSchema.find();
    try {
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateActiveVendor = async (req, res) => {
    const { error } = validateActiveVendor.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { isActive } = req.body
    try {
        let currentUser = await vendorSchema.findById(req.params.id);
        if (!currentUser) {
            res.status(404).json({ error: "Vendor not found!" })
        }
        if (isActive) {
            currentUser.isActive = isActive
        }
        await currentUser.save()
        res.status(201).json(currentUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateVendor = async (req, res) => {
    const { error } = validateUpdateVendor.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { firstName, lastName, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        let currentUser = await vendorSchema.findById(req.params.id);
        if (!currentUser) {
            res.status(404).json({ error: "Vendor not found!" })
        }
        if (firstName) {
            currentUser.firstName = firstName
        }
        if (lastName) {
            currentUser.lastName = lastName
        }
        if (password) {
            currentUser.password = hashPassword
        }
        await currentUser.save()
        res.status(201).json(currentUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const vendorForgotPassword = async (req, res) => {
    const {email} = req.body
    try{
        const user = await vendorSchema.findOne({email});
        if (!user) return res.status(404).json({error:`You dont have account with ${email}`});
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        const userData = {token, email, id:user._id}
        await sendVendorEmailForgotPassword(userData)
        res.status(200).json({message:"Success"})
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const vendorResetPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, payload) => {
        if(error) {
            return res.status(401).json({error: error.message})
        }
        const {_id} = payload;
        let user = await vendorSchema.findById(_id);
        if(!user) return res.status(401).json({error: 'Your account is not valid!'})
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword
        await user.save()
        res.status(201).json({message:"Success"})
    })
}


module.exports = { vendorSignin, vendorSignup, listAllVendor, updateActiveVendor, updateVendor, vendorResetPassword, vendorForgotPassword };