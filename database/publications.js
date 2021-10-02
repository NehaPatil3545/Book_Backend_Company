const mongoose = require("mongoose");

//create book schemas

const PublicationSchema = mongoose.Schema({
    id: Number,
    name : String,
    books :[String]
})
const PublicationModel = mongoose.model("publications",PublicationSchema);  //books r colllection

module.exports = PublicationModel;