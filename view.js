let currentPage = 1; 
const booksPerPage = 5; 




function renderList(books) {
    
    const bookList = document.getElementById('list');
    bookList.innerHTML = " ";

    // חישוב אינדקסים
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const paginatedBooks = books.slice(startIndex, endIndex);


    bookList.innerHTML += `
        <button onclick="sortByName()">sortByName</button>
        <button onclick="sortByPrice()">sortByPrice</button>
        <div class="book" id="title">
        <div>id</div>
        <div>name</div>
        <div>price</div>
        <div>actions</div>
        </div>`;
    paginatedBooks.forEach(book => {
    bookList.innerHTML += `
        <div class="book">
            <div>${book.id}</div>
            <div>${book.name}</div>
            <div>${book.price}</div>
            <div>
                <button onclick="deleteBook(${book.id})">Delete</button>
                <button onclick="shoeBook(${book.id})">read</button>
                <button onclick="updateBookForm(${book.id})">update</button>
            </div>
        </div>`;
    });
                
    renderPagination(books.length);
}

function renderBook(book){
    const b = document.getElementById('show-book');
    b.innerHTML = " ";
    b.innerHTML += `
    <h2 id="book-title">${book.name}</h2>
        <div id="book-content">
            <img id="left" src="${book.image}" alt="">
            <div id="right">
                <p id="price">price: ${book.price}</p>
                <div id="rateControl">
                    <span>Rate: </span>
                    <button id="dec" onclick="updateBook(${book.id},null,null,${book.rating - 1},null)">-</button>
                    <span id="rateValue">${book.rating}</span>
                    <button id="inc"  onclick="updateBook(${book.id},null,null,${book.rating + 1},null)">+</button>
                </div>
            </div>
        </div>
    `;
}

function updateBookForm(id){
    const book = getBookById(id);
    const b = document.getElementById('show-book');
    b.innerHTML = " ";
    b.innerHTML += `
    <h1>update book</h1>
    <form id="update-form" onsubmit="handleUpdateFormSubmit(event,${id})">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="${book.name}" required ><br><br>

        <label for="price">Price:</label>
        <input type="number" id="price" name="price" min="0" value="${book.price}" required><br><br>

        <label for="rating">Rating:</label>
        <input type="number" id="rating" name="rating" min="1" max="10" value="${book.rating}" required><br><br>

        <label for="image">Image URL:</label>
        <input type="url" id="image" name="image" value="${book.image}" required><br><br>

        <button type="submit">apdate</button>
    </form>
    `
}


function handleUpdateFormSubmit(event, id) {
    event.preventDefault();  

    
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const rating = parseInt(document.getElementById('rating').value);
    const image = document.getElementById('image').value;

    
    updateBook(id, name, price, rating, image);

    const b = document.getElementById('show-book');
    b.innerHTML = " ";
    b.innerHTML += `
    <h1>Updated</h1>
    `;
}


function AddBook(){
    const b = document.getElementById('show-book');
    b.innerHTML = " ";
    b.innerHTML += `
    <h1>add book</h1>
    <form id="add-form" onsubmit="handleAddFormSubmit(event)">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required ><br><br>

        <label for="price">Price:</label>
        <input type="number" id="price" name="price" min="0" required><br><br>

        <label for="rating">Rating:</label>
        <input type="number" id="rating" name="rating" min="1" max="10"  required><br><br>

        <label for="image">Image URL:</label>
        <input type="url" id="image" name="image" required><br><br>

        <button type="submit">add book</button>
    </form>
    `
}


function handleAddFormSubmit(event) {
    event.preventDefault();  

    
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const rating = parseInt(document.getElementById('rating').value);
    const image = document.getElementById('image').value;

    
    createBook( name, price, rating, image);

    const b = document.getElementById('show-book');
    b.innerHTML = " ";
    b.innerHTML += `
    <h1>add</h1>
    `;
}


function sortByName() {
    const sortedBooks = [...GBooks].sort((a, b) => a.name.localeCompare(b.name));
    renderList(sortedBooks);
}

function sortByPrice() {
    const sortedBooks = [...GBooks].sort((a, b) => a.price - b.price);
    renderList(sortedBooks);
}

function renderPagination(totalBooks) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // ניקוי התוכן הקודם

    const totalPages = Math.ceil(totalBooks / booksPerPage);

    // הוספת כפתורים לעמודים
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<button onclick="goToPage(${i})">${i}</button>`;
    }

    // כפתור הבא
    if (currentPage < totalPages) {
        pagination.innerHTML += `<button onclick="nextPage()">Next</button>`;
    }

    // כפתור הקודם
    if (currentPage > 1) {
        pagination.innerHTML += `<button onclick="prevPage()">Back</button>`;
    }
}

function goToPage(page) {
    currentPage = page;
    renderList(getBooks());
}

function nextPage() {
    currentPage++;
    renderList(getBooks());
}

function prevPage() {
    currentPage--;
    renderList(getBooks());
}
