const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const login = async(req, res) =>{
    const {email, password} = req.body;

    const foundUser = await User.findOne({email});
if (!foundUser) {
    return res.status(400).json({message: "email or password is incorrect"});
};

const matchPassword = await bcrypt.compare(password, foundUser.password);
if(!matchPassword){
    return res.status(400).json({message: "email or password is incorrect"});
}

const token = jwt.sign(
    {id: foundUser._id, email: foundUser.email},
    process.env.JWT_SECRET
)
res.status(200).json({ message: "user logged in", token})

};

exports.login = login