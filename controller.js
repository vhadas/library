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
    saveToLocalStorage();
    loadFromLocalStorage();
    renderList(getBooks());
}

function updateBook(id, name, price, rating, image){
    const book = getBookById(id);
    if(book){
        book.name = name || book.name;
        book.price = price || book.price;
        book.image = image || book.image; 
        book.rating = rating || book.rating;
    }
    saveToLocalStorage();
    loadFromLocalStorage();
    renderList(getBooks());
    // renderBook(book);
}

function deleteBook(id){
    GBooks = GBooks.filter(book => book.id !== id);
    saveToLocalStorage();
    onInit();
}

function shoeBook(id){
    book = getBookById(id);
    renderBook(book);
}

function onInit() {
    if(localStorage.getItem('books')){
        loadFromLocalStorage();
    }
    else{
        saveToLocalStorage();
    }
    renderList(getBooks());
}

function saveToLocalStorage(){
    localStorage.setItem('books', JSON.stringify(GBooks));
}

function loadFromLocalStorage(){
    let books = JSON.parse(localStorage.getItem('books'));
    if(books) GBooks = books;
}

function loadData(){
    localStorage.setItem('books', JSON.stringify(booksData));
    loadFromLocalStorage();
    renderList(getBooks());
}

onInit();