const myLibrary = [];
const newBookBtn = document.getElementById('new-book-btn');
const cards = document.getElementById('cards');

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    if(this.isRead) return `${this.title} by ${this.author}, ${this.pages} pages, read.`;
    else return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`; 
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

//Delete all children of the list, then add all books in the array.
function displayBooks() {
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }

    myLibrary.forEach((book) => {
        const card = document.createElement('li');
        const cardDiv = document.createElement('div');
        const title = document.createElement('h3');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const isRead = document.createElement('p');

        cardDiv.classList.add('card');

        title.classList.add('card-title');
        title.textContent = book.title;

        author.classList.add('card-author');
        author.textContent = `Author: ${book.author}`;

        pages.classList.add('card-pages');
        pages.textContent = `Pages: ${book.pages}`;

        isRead.classList.add('card-read');
        isRead.textContent = `Read: ${book.isRead ? '✔️' : '❌'}`;

        cardDiv.appendChild(title);
        cardDiv.appendChild(author);
        cardDiv.appendChild(pages);
        cardDiv.appendChild(isRead);

        card.appendChild(cardDiv);

        cards.appendChild(card);
    });
}

const book1 = new Book('The Demolished Man', 'Alfred Bester', 250, true);
const book2 = new Book('Ubik', 'Philip K. Dick', 288, true);
const book3 = new Book('Divergent', 'Veronica Roth', 380, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);




