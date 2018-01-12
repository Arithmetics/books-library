import moment from 'moment';


  console.log("hello from javascript!");
  console.log(moment().startOf('day').fromNow());


let myLibrary = [];
const bookcase = document.querySelector('#bookcase');
const formButton = document.querySelector('#newBook');
const cancelForm = document.querySelector('#cancelForm');
const bookForm = document.querySelector('#bookForm');

bookForm.addEventListener('submit', function(e){
  e.preventDefault();
  let newBook = new Book(
    this.elements.title.value,
    this.elements.author.value,
    this.elements.pages.value,
    this.elements.read.value
   )
   addBookToLibrary(newBook);
   document.querySelector('#bookcase').innerHTML = '';
   renderPage();
})

cancelForm.addEventListener('click', function(){
  let form = document.querySelector('#bookForm');
  form.classList.toggle('hiding');
})

formButton.addEventListener('click', function(){
  let form = document.querySelector('#bookForm');
  form.classList.toggle('hiding');
})

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead(){
    this.read = !this.read;
  }
}



function addBookToLibrary(book) {
  myLibrary.push(book);
}

function deleteBook(bookID) {
  myLibrary.splice(bookID, 1);
}

function renderPage() {
  let id = 0;
  myLibrary.forEach(function(book){
    let bookdiv = document.createElement("div");
    bookdiv.classList.add('book');
    bookdiv.dataset.id = id;
    let title = document.createElement('p');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let read = document.createElement('p');
    let readButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    title.textContent = "Title: " + book.title;
    author.textContent = "Author: "+ book.author;
    pages.textContent = "Pages: " + book.pages;
    if (book.read) {
      read.textContent = "Read?: Yes"
    } else {
      read.textContent = "Read?: No"
    }

    readButton.textContent = "Toggle Read";
    readButton.addEventListener('click', function(e){
      let bookIndex = e.target.parentNode.dataset.id;
      console.log(myLibrary[bookIndex]);
      myLibrary[bookIndex].toggleRead();
      rerenderBook(bookIndex);
    });

    deleteButton.textContent = "Delete Book";
    deleteButton.addEventListener('click', function(e){
      let bookIndex = e.target.parentNode.dataset.id;
      deleteBook(bookIndex);
      document.querySelector('#bookcase').innerHTML = '';
      renderPage();
    });

    bookdiv.appendChild(title);
    bookdiv.appendChild(author);
    bookdiv.appendChild(pages);
    bookdiv.appendChild(read);
    bookdiv.appendChild(readButton);
    bookdiv.appendChild(deleteButton);

    bookcase.appendChild(bookdiv);
    id++;
  })
}

function rerenderBook(bookID){
  bookdiv = document.querySelector(`div[data-id="${bookID}"]`);
  console.log(myLibrary)
  book = myLibrary[bookID];
  bookdiv.innerHTML = '';

  renderbook(bookID);
}

function renderBook(bookID){

  let title = document.createElement('p');
  let author = document.createElement('p');
  let pages = document.createElement('p');
  let read = document.createElement('p');
  let readButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  title.textContent = "Title: " + book.title;
  author.textContent = "Author: "+ book.author;
  pages.textContent = "Pages: " + book.pages;
  if (book.read) {
    read.textContent = "Read?: Yes"
  } else {
    read.textContent = "Read?: No"
  }

  readButton.textContent = "Toggle Read";
  readButton.addEventListener('click', function(e){
    let bookIndex = e.target.parentNode.dataset.id;
    console.log(bookIndex);
    myLibrary[bookIndex].toggleRead();
    rerenderBook(bookIndex);
  });

  deleteButton.textContent = "Delete Book";
  deleteButton.addEventListener('click', function(e){
    let bookIndex = e.target.parentNode.dataset.id;
    deleteBook(bookIndex);
    document.querySelector('#bookcase').innerHTML = '';
    renderPage();
  });

  bookdiv.appendChild(title);
  bookdiv.appendChild(author);
  bookdiv.appendChild(pages);
  bookdiv.appendChild(read);
  bookdiv.appendChild(readButton);
  bookdiv.appendChild(deleteButton);
}

const book1 = new Book("Headlopper", "Andrew M", 200, true);
const book2 = new Book("The Golden Compass", "Idk", 304, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
renderPage();
