function renderList(books) {
    const bookList = document.getElementById('list');
    bookList.innerHTML = " ";
    bookList.innerHTML += `<div class="book" id="title">
                    <div>id</div>
                    <div>name</div>
                    <div>price</div>
                    <div>actions</div>
                  </div>`;
    books.forEach(book => {
        bookList.innerHTML += `
        <div class="book">
        <div>${book.id}</div>
        <div>${book.name}</div>
        <div>${book.price}</div>
        <div>
            <button onclick="deleteBook(${book.id})">Delete</button>
            <button onclick="shoeBook(${book.id})">read</button>
        </div>
    </div>
    `;
    });
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
                    <button id="inc"  onclick=""updateBook(${book.id},null,null,${book.rating + 1},null)"">+</button>
                </div>
            </div>
        </div>
    `;
}
