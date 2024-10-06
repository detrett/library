const myLibrary = [];
const cards = document.getElementById("cards");

const newBookForm = document.getElementById("new-book-form");
const newBookBtn = document.getElementById("new-book-btn");
const newBookModal = document.getElementById("addModal");
const submitBtn = document.getElementById("submit-btn");
const xBtn = document.getElementById("x-btn");

const deleteModal = document.getElementById("deleteModal");
const closeBtn = document.getElementById("close");
const confirmDeleteBtn = document.getElementById("confirmDelete");

let bookToDelete = null;

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.index = 0;
  }
}

const info = {
  info() {
    if (this.isRead)
      return `${this.title} by ${this.author}, ${this.pages} pages, read.`;
    else
      return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
  },
};

const toggleRead = {
  toggleRead() {
    this.isRead = !this.isRead;
    return this.isRead;
  },
};

Object.assign(Book.prototype, info);
Object.assign(Book.prototype, toggleRead);

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
    const card = document.createElement("li");
    const cardDiv = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const isRead = document.createElement("p");
    const iconsDiv = document.createElement("div");
    const readIcon = document.createElement("img");
    const trashIcon = document.createElement("img");

    cardDiv.classList.add("card");

    title.classList.add("card-title");
    title.textContent = book.title;

    author.classList.add("card-author");
    author.textContent = `Author: ${book.author}`;

    pages.classList.add("card-pages");
    pages.textContent = `Pages: ${book.pages}`;

    isRead.classList.add("card-read");
    isRead.textContent = `Read: ${book.isRead ? "✔️" : "❌"}`;

    iconsDiv.classList.add("icons");

    readIcon.classList.add("icon");
    readIcon.src = book.isRead ? "icons/unread.svg" : "icons/read.svg";
    readIcon.addEventListener("click", (event) => {
      const newIsRead = book.toggleRead();
      isRead.textContent = `Read: ${newIsRead ? "✔️" : "❌"}`;
      readIcon.src = newIsRead ? "icons/unread.svg" : "icons/read.svg";
    });

    trashIcon.classList.add("trash-icon");
    trashIcon.src = "icons/trash.svg";
    trashIcon.addEventListener("click", (event) => {
      bookToDelete = book;
      deleteModal.style.display = "block";
    });

    cardDiv.appendChild(title);
    cardDiv.appendChild(author);
    cardDiv.appendChild(pages);
    cardDiv.appendChild(isRead);

    iconsDiv.appendChild(readIcon);
    iconsDiv.appendChild(trashIcon);

    cardDiv.appendChild(iconsDiv);

    card.appendChild(cardDiv);

    cards.appendChild(card);
  });
}

newBookBtn.addEventListener("click", (event) => {
  newBookModal.style.display = "block";
});

confirmDeleteBtn.addEventListener("click", (event) => {
  if (bookToDelete) {
    removeBookFromLibrary(bookToDelete);
    bookToDelete = null;
    deleteModal.style.display = "none";
  }
});

xBtn.addEventListener("click", () => {
  newBookModal.style.display = "none";
});

closeBtn.addEventListener("click", (event) => {
  bookToDelete = null;
  deleteModal.style.display = "none";
});

newBookForm.addEventListener("submit", (event) => {
  const titleForm = newBookForm.querySelector('input[id="form-title"]');
  const authorForm = newBookForm.querySelector('input[id="form-author"]');
  const pagesForm = newBookForm.querySelector('input[id="form-pages"]');
  let isValid = false;

  const inputs = [titleForm, authorForm, pagesForm];
  inputs.forEach((input) => {
    const errorField = document.querySelector(`#${input.id} + span.error`);

    if (!input.validity.valid) {
      showError(input, errorField);
      isValid = false;
      return;
    } else {
      isValid = true;
      errorField.textContent = "";
      errorField.className = "error";
    }
  });

  event.preventDefault();

  if (isValid) {
    const title = titleForm.value;
    const author = authorForm.value;
    const pages = pagesForm.value;
    const isRead = newBookForm.querySelector('input[id="is-read"]').checked;

    const newBook = new Book(title, author, pages, isRead);

    addBookToLibrary(newBook);
    newBookForm.reset();
    newBookModal.style.display = "none";
  }
});

function showError(input, errorField) {
  if (input.validity.valueMissing) {
    console.error(`Value missing for ${input.id}`);
    errorField.textContent = `Value missing for ${input.id}`;
  } else if (input.validity.typeMismatch) {
    console.error(`Type mismatch for ${input.id}`);
    errorField.textContent = `Type mismatch for ${input.id}`;
  } else if (input.validity.tooShort) {
    console.error("Too short");
    errorField.textContent = `Content too short!`;
  } else if (input.validity.rangeOverflow) {
    console.error("Too long");
    errorField.textContent = `Are you sure bro?`;
  }

  errorField.className = "error active";
}

window.addEventListener("click", (event) => {
  if (event.target == deleteModal) {
    bookToDelete = null;
    deleteModal.style.display = "none";
  }
  if (event.target == newBookModal) {
    newBookModal.style.display = "none";
  }
});

const book1 = new Book("The Demolished Man", "Alfred Bester", 250, true);
const book2 = new Book("Ubik", "Philip K. Dick", 288, true);
const book3 = new Book("Divergent", "Veronica Roth", 380, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
