const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    passWord: String,
});
module.exports = mongoose.model("users",userSchema);

