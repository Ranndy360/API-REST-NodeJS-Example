const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        requiered:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        requiere:true,
        min:6,
        max:1024
    },
    password:{
        type:String,
        requiered:true,
        minlength:6
    },
    date:{
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('User',userSchema);