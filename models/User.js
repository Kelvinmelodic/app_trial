//this is the schema files

const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
      type: String,
      minlength: [4, 'Name is less than 4 characters'],
      required:  [true, 'First name is requred'],
      maxlenth:  [255, 'Name is more than 255 character']
      
    },
    lastName: String,

    email:{
        type: String,
        unique: true

    } ,
    password: {
        type: String,
        minlength:  [8, 'password must be at least 8 character long'],
        required:    true
    },
    phone: String,
    role:  {
        type: String,
        enum: ['admin', 'user', 'superadmin'],
        default: 'user',
        required: true
        
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User