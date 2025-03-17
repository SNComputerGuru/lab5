const express = require("express")
const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`)
})


// Storage for books
let books = []


// Book model

function createBook (id, title, details){
    return {
        "id": id,
        "title": title,
        "details": [{
            "id": details[0].id,
            "author": details[0].author,
            "genre": details[0].genre,
            "publicationYear": details[0].publicationYear
        }]
    }
}


// app
app.get("/whoami", getStudentNumber)

app.get("/books", getAllBooks)

app.get("/books/:id", getBookById)

app.post("/books", addNewBook)

app.put("/books/:id", updateBookDetails)

app.delete("/books/:id", deleteBookById)

//controller: because you didnt allow us to have multiple files
function getStudentNumber(req, res){
    res.json({
        studentN : "2690851"
    })
}

function getAllBooks(req, res){
    try{
        res.json(books)
    }
    catch(err){
        res.status(500).json({
            message: "Yeah, There arent any books here"
        })
    }
}

function getBookById(req, res){
    book = books.find(book => book.id == req.params.id)
    if(book){
        res.json(book)    
    }
    else{
        res.status(404).json({
            message: "404 Not Found"
        })
    }
}

function addNewBook(req, res){
    const {id, title, details} = req.body
    const missingFields = !id || !title || !details  ||!details[0].id || ! details[0].author || !details[0].genre || !details[0].publicationYear

    if(missingFields){
        res.status(400).json({
            error: "Missing required book details"
        })
    }
    else{
        const newBook = createBook(id, title, details)
        books.push(newBook)
        res.status(201).json({
            message: `Successfully created a new book`
        })
    }
}

function updateBookDetails(req, res){
    const book = books.find(book => book.id = req.params.id)
    const index = books.findIndex(book => book.id = req.params.id)

    const {details} = req.body


    if(book){
        Object.assign(book, {"details": details })
        books.splice(index, 1, book)
        res.status(200).json({
            message: "Book successfully updated"
        })        
    }
    else{
        res.status(404).json({
            error: "Book to update not found"
        })
    }
}

function deleteBookById(req, res){
    const book = books.find(book => book.id == req.params.id)
    console.log(book)

    if(book){
        const index = books.findIndex(book => book.id == req.params.id)
        books.splice(index, 1)
        res.status(200).json({
            message: "Successfully deleted a book hehehe"
        })
    }
    else{
        res.status(404).json({
            message: "Book to delete not found hehehe"
        })
    }
}