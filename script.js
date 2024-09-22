const myLibrary = [];
const cards = document.getElementById('cards');

const newBookForm = document.getElementById('new-book-form');
const newBookBtn = document.getElementById('new-book-btn');
const newBookModal = document.getElementById('addModal');
const submitBtn = document.getElementById('submit-btn');
const xBtn = document.getElementById('x-btn');

const deleteModal = document.getElementById('deleteModal');
const closeBtn = document.getElementById("close");
const confirmDeleteBtn = document.getElementById('confirmDelete');

let bookToDelete = null;

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.index = 0;
}

Book.prototype.info = function () {
    if (this.isRead) return `${this.title} by ${this.author}, ${this.pages} pages, read.`;
    else return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
}

function addBookToLibrary(book) {
    let index = myLibrary.push(book) - 1;
    console.log(`Book title: ${book.title}. Given index: ${index}`);
    book.index = index;
    displayBooks();
}

function removeBookFromLibrary(bookToRemove) {
    myLibrary.splice(bookToRemove.index, 1);
    myLibrary.forEach((book, newIndex) => {
        book.index = newIndex;
        console.log(`Book title: ${book.title}. New index: ${book.index}`);
    });
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
        const trashIcon = document.createElement('img');

        cardDiv.classList.add('card');

        title.classList.add('card-title');
        title.textContent = book.title;

        author.classList.add('card-author');
        author.textContent = `Author: ${book.author}`;

        pages.classList.add('card-pages');
        pages.textContent = `Pages: ${book.pages}`;

        isRead.classList.add('card-read');
        isRead.textContent = `Read: ${book.isRead ? '✔️' : '❌'}`;

        trashIcon.classList.add('trash-icon');
        trashIcon.src = "icons/trash.svg"
        trashIcon.addEventListener('click', (event) => {
            bookToDelete = book;
            deleteModal.style.display = "block";
        })

        cardDiv.appendChild(title);
        cardDiv.appendChild(author);
        cardDiv.appendChild(pages);
        cardDiv.appendChild(isRead);
        cardDiv.appendChild(trashIcon);

        card.appendChild(cardDiv);

        cards.appendChild(card);
    });
}

newBookBtn.addEventListener('click', (event) => {
    newBookModal.style.display = "block";
})

confirmDeleteBtn.addEventListener('click', (event) => {
    if (bookToDelete) {
        removeBookFromLibrary(bookToDelete); 
        bookToDelete = null; 
        deleteModal.style.display = "none"; 
    }
})

xBtn.addEventListener('click', () => {
    newBookModal.style.display = "none";
})

closeBtn.addEventListener('click', (event) => {
    bookToDelete = null;
    deleteModal.style.display = "none"; 
})

newBookForm.addEventListener('submit', (event) => {

    if (!newBookForm.checkValidity()) {
        return; // If the form is invalid, let the browser handle the validation messages
    }
    event.preventDefault();

    const title = newBookForm.querySelector('input[id="form-title"]').value;
    const author = newBookForm.querySelector('input[id="form-author"]').value;
    const pages = newBookForm.querySelector('input[id="form-pages"]').value;
    const isRead = newBookForm.querySelector('input[id="is-read"]').checked;

    const newBook = new Book(title, author, pages, isRead);

    addBookToLibrary(newBook);
    newBookForm.reset();
    newBookModal.style.display = "none";
})

window.addEventListener('click', (event) => {
    if (event.target == deleteModal) {
        bookToDelete = null; 
        deleteModal.style.display = "none"; 
    }
    if (event.target == newBookModal) {
        newBookModal.style.display = "none";
    }
})

const book1 = new Book('The Demolished Man', 'Alfred Bester', 250, true);
const book2 = new Book('Ubik', 'Philip K. Dick', 288, true);
const book3 = new Book('Divergent', 'Veronica Roth', 380, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);





