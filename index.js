//main backend file  (json formatter)
// 
// const mongoose = require('mongoose');

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://neha_patil:9075954788neha@cluster0.jt0jp.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const bcollection = client.db("book-company").collection("books").findOne({ISBN: "12345FIVE"});    
//   bcollection.then((data)=>console.log(data)).catch((err)=>console.log(err))
// });


//another method to connect
// async function listDatabases(client){
//     databaseList = await client.db().admin().listDatabases()
//     console.log("The databases are:")
//     databaseList.databases.forEach(db=>console.log(db.name));
// }
// async function main(){
//     const uri = "mongodb+srv://neha_patil:9075954788neha@cluster0.jt0jp.mongodb.net/book-company?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try{
//         await client.connect();
//         const result = await client.db("book-company").collection("books").findOne({ISBN: "12345FIVE"})
//         console.log(result)
//         // await listDatabases(client)
//     }
//     catch(err){
//         console.log(err)
//     }
//     finally{
//         await client.close()
//     }
// }
// main()

require('dotenv').config()
const db = require("./database/index.js");
const BookModel = require("./database/books")
const AuthorModel = require("./database/authors")
const PublicationModel = require("./database/publications")

const express = require("express")
const app = express()
app.use(express.json())

var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB,{useNewUrlParser:true, useUnifiedTopology: true}).then(() => console.log("CONNECTION ESTABLISHED"))

//http://localhost:3000/books
app.get("/books", async(req,res) => {
    const getAllBooks =await BookModel.find();
    return res.json(getAllBooks)
})

//http://localhost:3000/book-isbn/12345FIVE
app.get("/book-isbn/:isbn",async(req,res) => {
    const {isbn}= req.params;
    const getSpecificBook = await BookModel.findOne({ISBN: isbn});
    if(getSpecificBook===null){
        return res.json({"error" : `No book found for the ISBN of ${isbn}`})
    }
    return res.json(getSpecificBook);
})

//http://localhost:3000/book-category/tech
app.get("/book-category/:cat",async(req,res) => {
    const {cat} = req.params;
    const getSpecificBooks = await BookModel.find({category: cat})  //bc category is array
    if(getSpecificBooks.length===0){
        return res.json({"error" : `No book found for the Category of ${cat}`})
    }
    return res.json(getSpecificBooks);
})

// http://localhost:3000/authors
app.get("/authors",async(req,res) => {
    const getAllAuthors = await AuthorModel.find()
    return res.json(getAllAuthors)
})

// http://localhost:3000/author-id/1
app.get("/author-id/:id",async(req,res) => {
    let {id} = req.params;
    id = Number(id)
    const getSpecificAuthor = await AuthorModel.findOne({id: id})
    
    if(getSpecificAuthor===null){
        return res.json({"error" : `No book found for the id of ${id}`})
    }
    return res.json(getSpecificAuthor);
})

// http://localhost:3000/author-isbn/12345ONE
app.get("/author-isbn/:isbn",async(req,res) => {
    const {isbn} = req.params;
    const getSpecificAuthor = await AuthorModel.find({books: isbn}); 
    console.log(getSpecificAuthor)
    if(getSpecificAuthor.length===0){
        return res.json({"error" : `No book found for the ISBN of ${isbn}`})
    }
    return res.json(getSpecificAuthor);
})

// http://localhost:3000/publications
app.get("/publications", async(req,res) => {
    const getAllPublications = await PublicationModel.find()
    return res.json(getAllPublications)
})

//http://localhost:3000/publication-isbn/12345ONE
app.get("/publication-isbn/:isbn",async(req,res) => {
    const {isbn} = req.params;
    const getSpecificPublication = await PublicationModel.find({books: isbn}); 
    console.log(getSpecificPublication)
    if(getSpecificPublication.length===0){
        return res.json({"error" : `No book found for the ISBN of ${isbn}`})
    }
    return res.json(getSpecificPublication);
})


// http://localhost:3000/book
app.post("/book", async(req,res) => {
    const addNewBook =await BookModel.create(req.body);
    return res.json({
        books: addNewBook,
        message: "Book was added !!!"
    })
})

// http://localhost:3000/author
app.post("/author", async(req,res) => {
    const addNewAuthor =await AuthorModel.create(req.body);
    return res.json({
        authors: addNewAuthor,
        message: "Author was added !!!"
    })
})

// http://localhost:3000/publication
app.post("/publication", async(req,res) => {
    const addNewPublication =await PublicationModel.create(req.body);
    return res.json({
        publications: addNewPublication,
        message: "Publication was added !!!"
    })
})

// http://localhost:3000/book-update/12345THREE
app.put("/book-update/:isbn", async(req,res) => {
    const {isbn} = req.params
    
    const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn},req.body,{new: true})
    return res.json({
        books: updateBook,
        message: "Book was Updated !!!"
    })
})

// http://localhost:3000/author-update/1
app.put("/author-update/:id", async(req,res) => {
    const {id} = req.params
    const updateAuthor = await AuthorModel.findOneAndUpdate({id: id},req.body,{new: true})
    return res.json({
        books: updateAuthor,
        message: "Author was Updated !!!"
    })
})

// http://localhost:3000/publication-update/1
app.put("/publication-update/:id", async(req,res) => {
    const {id} = req.params
    const updatePublication = await PublicationModel.findOneAndUpdate({id: id},req.body,{new: true})
    return res.json({
        books: updatePublication,
        message: "Publication was Updated !!!"
    })  
})
// http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", async(req,res) => {
    console.log(req.params)
    const {isbn} = req.params
    const deleteBook = await BookModel.deleteOne({ISBN: isbn})
    return res.json({bookDeleted: deleteBook, message: "Book was deleted!!!"})
})


// http://localhost:3000/author-delete/1
app.delete("/author-delete/:id", async(req,res) => {
    
    const {id} = req.params
    const deleteAuthor = await AuthorModel.deleteOne({id: id})
    return res.json({authorDeleted: deleteAuthor, message: "Author was deleted!!!"})
})

// http://localhost:3000/publication-delete/1
app.delete("/publication-delete/:id", async(req,res) => {
    
    const {id} = req.params
    const deletepublication = await PublicationModel.deleteOne({id: id})
    return res.json({publicationDeleted: deletepublication, message: "publication was deleted!!!"})
})

// http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", async(req,res) => {
     const {isbn,id} = req.params;
     let getSpecificBook = await BookModel.findOne({ISBN: isbn})
     if(getSpecificBook===null){
        return res.json({"error" : `No book found for the ISBN of ${isbn}`})
     }
     else{
         getSpecificBook.authors.remove(id)
         const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, getSpecificBook, {new: true})
         //const deleteAuthorFromBook = await BookModel.deleteOne({ISBN: isbn})
         return res.json({authorDeleted: updateBook, message: "author was deleted!!!"})
     }
     
    
})



app.listen(3000, () => {
    console.log("my express is running..........")
})