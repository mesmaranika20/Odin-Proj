// Array to store all books
const myLibrary = [];

// Constructor for Book objects
class Book {
  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID();  // Unique ID
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// Function to create a book and add to library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

// Function to show all books on screen
function displayBooks() {
  const container = document.getElementById("book-list");
  container.innerHTML = ""; // clear old display

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><b>Author:</b> ${book.author}</p>
      <p><b>Pages:</b> ${book.pages}</p>
      <p><b>Read:</b> ${book.isRead ? "Yes" : "No"}</p>
      <button onclick="removeBook('${book.id}')">Remove</button>
    `;

    container.appendChild(card);
  });
}

// Remove book using unique ID
function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// Handle form submit
document.getElementById("bookForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, pages, isRead);

  this.reset();
});