const mongoose=require('mongoose');
const UserSchema =new Schema({
    name : {
        name : String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique: true
    },
    date : {
        type : Date,
        default : Date.now
    },
});
module.exports = mongoose.model('user',UserSchema)