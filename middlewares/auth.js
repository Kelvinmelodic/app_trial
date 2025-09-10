const jwt = require("jsonwebtoken");
const User = require("../models/User")

const protect = async (req, res, next) => {
    let token;

    //if(
       // req.headers.authorization &&
        //req.headers.authorization.startsWith("Bearer")
    //) {
        try {
           token = req.headers.authorization.split(" ")[1];
           const decoded = jwt.verify(token, process.env.JWT_SECRET);
           const user = await User.findById(decoded.id).select("-password");
           req.user = user;
           next();
        } catch (error) {
          res.status(401).json({message: "Not authorized"}) 
          console.log(error) 
        }
    }


const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json("not allowed to perform this action", 403)
        }
        next()
    }
}


exports.protect = protect;
exports.authorize = authorize