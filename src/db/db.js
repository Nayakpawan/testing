const mongoose = require("mongoose")
console.log("database connection done....");
mongoose.connect("mongodb://127.0.0.1:27017/Assignment");

module.export = {mongoose}