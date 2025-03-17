exports.createBook = (id, title, details) => {
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