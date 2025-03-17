const express = require("express")
const bookController = require("./bookController")

const routes = express.Router()

routes.get("/whoami", bookController.getStudentNumber)

routes.get("/books", bookController.getAllBooks)

routes.get("/books/:id", bookController.getBookById)

routes.post("/books", bookController.addNewBook)

module.exports = routes