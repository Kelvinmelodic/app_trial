const User = require("../models/User");
const bcrypt = require('bcryptjs')

const getUsers = async (req, res) => {
    try{
    const users = await User.find({}).populate('posts')
    res.json({users})
    } catch(error) {
        res.status(500).json({message: "Internal Server error"})
        console.log(error)
    }
    
};

const getUser = async (req, res) =>{
    const user = await User.findById(req.params.id)
    if(!user) {
        return res.status(404).json({message: 'user not found'})
    }

    if (req.user.id !== req.params.id) {
        return res.status(403).json({message: "this is not your profile"})
    }
    res.json({user})
}

const createUsers = async(req, res) => {
    try{
const foundUser = await User.findOne({email: req.body.email});

if(foundUser) {
    return res.status(400).json({message: "user alreaady exist"});
}
const salt = await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash(req.body.password, salt)
console.log(hashPassword)

    let newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email:  req.body.email,
        phone:  req.body.phone,
        password: hashPassword,
        role: req.body.role
    })

    res.json({message: 'User Created', data: newUser})
    } catch(error){
        res.status(500).json({message: "internal server error"})
    }

}

const updateUser = async (req, res) =>{
    try{
      let user = await User.findById(req.params.id)
      if(!user){
        return res.status(404).json({message: 'user not found'})
    }
    user = await User.findByIdAndUpdate(
    req.params.id,
    {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone
        },
    },
    { new: true }
   );

   res.json({user})
    } catch(error) {
        res.status(500).json({message: "Something went wrong"})
        console.log(error)
    }
    };

const deleteUser = async (req, res) =>{

    let user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({message: 'user not found'})
    }
    user = await User.findByIdAndDelete(req.params.id);
   res.json({message: 'User deleted', user})
}


exports.getUsers = getUsers;
exports.getUser = getUser
exports.createUsers = createUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser