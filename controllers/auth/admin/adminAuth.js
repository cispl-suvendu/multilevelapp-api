const adminSchema = require("../../../models/admin/adminModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Joi = require("joi");
const sendEmailForgotPassword = require("../../../emails/admin/template-forgot-password") 

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

const adminSignin = async (req, res) => {
    //console.log(req.body)
    //res.status(200).json({msg: "user signin"})
    try {
        const { error } = validateLoginSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const adminUser = await adminSchema.findOne({ email: req.body.email });

        if (!adminUser) return res.status(404).json({error:"You are not an Admin"});

        const validPass = await bcrypt.compare(req.body.password, adminUser.password);
        if (!validPass) return res.status(400).json({error:"Password does not match!"});

        //Create and assign a token
        const token = jwt.sign({ _id: adminUser._id }, process.env.TOKEN_SECRET);
        // res.header("auth-token", token).send(token);

        const { _id, email, firstName, lastName, role } = adminUser;

        const currentAdminUser = {
            _id, email, firstName, lastName, role, token
        }
        res.status(200).json(currentAdminUser)
    } catch (error) {
        return res.status(505).json({error:error.message});
    }
}


const adminSignup = async (req, res) => {
    const { error } = validateRegisterSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const emailExists = await adminSchema.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json({error:"Email allready exists"});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const userData = new adminSchema({
        email: req.body.email,
        password: hashPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    try {
        const saveUserData = await userData.save();
        const token = jwt.sign({ _id: userData._id }, process.env.TOKEN_SECRET);
        const { _id, email, firstName, lastName, role } = saveUserData;
        const registerData = { _id, email, firstName, lastName, role, token };
        res.status(200).json(registerData)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const adminForgotPassword = async (req, res) => {
    const {email} = req.body
    try{
        const user = await adminSchema.findOne({email});
        if (!user) return res.status(404).json({error:`You dont have account with ${email}`});
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        const userData = {token, email}
        await sendEmailForgotPassword(userData)
        res.status(200).json({message:"Success"})
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const adminResetPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, payload) => {
        if(error) {
            return res.status(401).json({error: error.message})
        }
        const {_id} = payload;
        let user = await adminSchema.findById(_id);
        if(!user) return res.status(401).json({error: 'Your account is not valid!'})
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword
        await user.save()
        res.status(201).json({message:"Success"})
    })
}


module.exports = { adminSignin, adminSignup, adminForgotPassword, adminResetPassword };