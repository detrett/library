const myLibrary = [];

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
}

function displayBooks() {
    myLibrary.forEach((item) => console.log(item.info()));
}

const book1 = new Book('The Demolished Man', 'Alfred Bester', 250, true);
const book2 = new Book('Ubik', 'Philip K. Dick', 288, true);
const book3 = new Book('Divergent', 'Veronica Roth', 380, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

displayBooks();