function getBookById(id) {
    return GBooks.find(book => book.id === id);
}

function getBooks(){
    return GBooks;
}

function createBook(name,price,rating,image){
    const newBook = {
        "id": GId++,
        "name": name,
        "price": price,
        "rating": rating,
        "image": image
    }
    GBooks.push(newBook);
}

function updateBook(id, name, price, rating, image){
    const book = getBookById(id);
    if(book){
        book.name = name || book.name;
        book.price = price || book.price;
        book.image = image || book.image; 
        book.rating = rating || book.rating;
    }
    renderBook(book);
}

function deleteBook(id){
    GBooks = GBooks.filter(book => book.id !== id);
    onInit();
}

function shoeBook(id){
    book = getBookById(id);
    renderBook(book);
}

function onInit() {
    renderList(getBooks());
}


onInit();