const bookModel = require("./bookModel")

let books = []




// functions
exports.getStudentNumber = (req, res) => {
    res.json({
        studentN : "2690851"
    })
}

exports.getAllBooks = (req, res) => {
    try{
        res.json(books)
    }
    catch(err){
        res.status(500).json({
            message: "Yeah, There arent any books here"
        })
    }
}

exports.getBookById = (req, res) => {
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

exports.addNewBook = (req, res) => {
    const {id, title, details} = req.body
    const missingFields = !id || !title || !details  ||!details[0].id || ! details[0].author || !details[0].genre || !details[0].publicationYear

    if(missingFields){
        res.status(400).json({
            error: "Missing required book details"
        })
    }
    else{
        const newBook = bookModel.createBook(id, title, details)
        res.status(201).json({
            message: `Successfully created a new book`
        })
    }
}