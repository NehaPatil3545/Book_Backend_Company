let books = [{
    ISBN : "12345ONE",
     title: "Getting Started with MERN",
     authors : [1,2],
     language : "en",
     pubDate : "2021-07-07",
     numOfPage : "225",
     category : ["fiction","programming","tech","web dev"],
     publication : 1,
},
{
    ISBN : "12345TWO",
     title: "Getting Started with Python",
     authors : [1,2],    //name can be same 
     language : "en",
     pubDate : "2021-07-07",
     numOfPage : "250",
     category : ["fiction","tech","web dev"],
     publication : 1,
}]
let authors = [{
    id : 1,
    name :"Neha",
    books :["12345ONE","12345TWO"],
},
{
    id : 2,
    name :"Ram",
     books :["12345TWO"],
}]
let publications = [{
    id : 1,
    name :"ShapeAI Publications",
    books :["12345ONE","12345TWO"],
},
{
    id : 2,
    name :"Patil Publications",
     books :[],
}]

module.exports = {books,authors,publications};