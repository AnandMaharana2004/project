require('dotenv').config();
const { findOne } = require('../models/product');
const userModel = require('../models/user');
const {hashPassword,comparePassword} = require('../utils/bcryptUtils');
const jwt = require('jsonwebtoken');

const loginController = async (req,res)=>{
    let {email,password} = req.body;
    let user = await userModel.findOne({email});
    if(!user)  res.send("the invalid credential")
    let result = await comparePassword(password,user?.password);
    if(!result){
        return res.status(401).json({error:"Invalid email or password !!"});
    }
    const token = jwt.sign({email:user.email,userId:user._id},"secret");
    res.cookie('token',token);
    console.log(user,token)
    res.send("user login successfuly");

}

module.exports = loginController
