const mongoose = require("mongoose");

//create book schemas

const BookSchema = mongoose.Schema({
 ISBN : String,
 title : String,
 authors : [Number],
 language : String,
 pubDate : String,
 numOfPage : Number,
 category : [String],
 publication : Number
})
const BookModel = mongoose.model("books",BookSchema);  //books r colllection

module.exports = BookModel;