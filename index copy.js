
//this file is done earlier for static database 
//final mongodb db is index.js


const db = require("./database/index.js");
// console.log(db.publications)
// console.log(db.books)
// console.log(db.authors)

const express = require("express")

const app = express()
app.use(express.json())

app.get("/books",(req,res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks)
})

app.get("/book-ISBN/:isbn",(req,res) => {
    const isbn = req.params.isbn;
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    if(getSpecificBook.length===0){
        return res.json({"error" : `No book found for the ISBN of ${isbn}`})
    }
    return res.json(getSpecificBook[0]);
})

http://localhost:3000/book-category/tech
app.get("/book-category/:cat",(req,res) => {
    const {cat} = req.params;
    const getSpecificBooks = db.books.filter((book) => book.category.includes(cat));   //bc category is array
    if(getSpecificBooks.length===0){
        return res.json({"error" : `No book found for the Category of ${cat}`})
    }
    return res.json(getSpecificBooks);
})

// http://localhost:3000/authors
app.get("/authors",(req,res) => {
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors)
})

// http://localhost:3000/author/1
app.get("/author/:id",(req,res) => {
    let {id} = req.params;
    id = Number(id)
    const getSpecificAuthor = db.authors.filter((author) => author.id === id);   
    if(getSpecificAuthor.length===0){
        return res.json({"error" : `No book found for the id of ${id}`})
    }
    return res.json(getSpecificAuthor);
})

// http://localhost:3000/author-isbn/12345ONE
app.get("/author-isbn/:isbn",(req,res) => {
    const {isbn} = req.params;
    console.log(isbn)
    const getSpecificAuthor = db.authors.filter((author) => author.books.includes(isbn));   
    console.log(getSpecificAuthor)
    if(getSpecificAuthor.length===0){
        return res.json({"error" : `No book found for the ISBN of ${isbn}`})
    }
    return res.json(getSpecificAuthor);
})

// http://localhost:3000/publications
app.get("/publications",(req,res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications)
})

http://localhost:3000/publication-isbn/12345ONE
app.get("/publication-isbn/:isbn",(req,res) => {
    const {isbn} = req.params;
    console.log(isbn)
    const getSpecificPublication = db.publications.filter((publication) => publication.books.includes(isbn));   
    console.log(getSpecificPublication)
    if(getSpecificPublication.length===0){
        return res.json({"error" : `No book found for the ISBN of ${isbn}`})
    }
    return res.json(getSpecificPublication);
})


// http://localhost:3000/book
app.post("/book",(req,res) => {
    db.books.push(req.body)
    return res.json(db.books)
})

// http://localhost:3000/author
app.post("/author",(req,res) => {
    db.authors.push(req.body)
    return res.json(db.authors)
})

// http://localhost:3000/publication
app.post("/publication",(req,res) => {
    db.publications.push(req.body)
    return res.json(db.publications)
})

// http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", (req,res) => {
    const {isbn} = req.params
    db.books.forEach((book) => {    
        if(book.ISBN === isbn) {
             console.log({...book, ...req.body})
            return {...book, ...req.body}    //...=merge two array called spread operator
        }
        return book
    })
    return res.json(db.books)
})

// http://localhost:3000/author-update/1
app.put("/author-update/:id", (req,res) => {
    const {id} = req.params
    db.authors.forEach((author) => {    
        if(author.id === id) {
            console.log({...author, ...req.body})
            return {...author, ...req.body}    //...=merge two array called spread operator
        }
        return author

    })
    return res.json(db.authors)
})

// http://localhost:3000/publication-update/1
app.put("/publication-update/:id", (req,res) => {
    const {id} = req.params
    db.publications.forEach((publication) => {    
        if(publication.id === id) {
            //console.log({...author, ...req.body})
            return {...publication, ...req.body}    //...=merge two array called spread operator
        }
        return publication

    })
    return res.json(db.publications)
})

// http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", (req,res) => {
    console.log(req.params)
    const {isbn} = req.params
    const filteredBooks = db.books.filter((book) => book.ISBN!==isbn )
    console.log(filteredBooks)
    db.books = filteredBooks;
    return res.json(db.books)
})

// http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id211", (req,res) => {
    console.log(req.params)
    let {isbn,id} = req.params
    id = Number(id)
    db.books.forEach((book) => {
        if(book.ISBN === isbn) {
            if(!book.authors.includes(id)){
                return;  //if id not match return nthing
            }
            book.authors = book.authors.filter((author) => author!==id)
            return book
        }
        return book
    })
    return res.json(db.books)
    
})



app.listen(3000, () => {
    console.log("my express is running..........")
})