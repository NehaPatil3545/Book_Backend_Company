const mongoose = require("mongoose");

//create authors schemas

const AuthorSchema = mongoose.Schema({
 id: Number,
 name : String,
 books :[String],

})
const AuthorModel = mongoose.model("authors",AuthorSchema);  //books r colllection

module.exports = AuthorModel;