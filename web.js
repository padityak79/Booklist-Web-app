//class book
class Book {
    constructor( title, author, isbn) {
        this.title= title;
        this.author = author;
        this.isbn = isbn;
    }

}

//class UI
class UI{
    static displayBooks() {
        var books = Store.getBooks();
        books.forEach( book => {
            UI.addBooktoBooklist(book);
        });
    }

    static addBooktoBooklist(book) {
        var booklist = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        booklist.append(row);
    }

    static deleteBookfromBooklist(element) {
        if(element.classList.contains('delete')) { 
            element.parentElement.parentElement.remove();
            Store.removeBook(element.parentElement.previousElementSibling.innerHTML);
            UI.showAlert('Book deleted successfully' , 'success');

        }
    }

    static showAlert( message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore( div, form);
        setTimeout( ()=> document.querySelector('.alert').remove(), 3000);
    }

    static clearFeilds() {
        document.querySelector('#title').value = " ";
        document.querySelector('#author').value = " ";
        document.querySelector('#isbn').value = " ";
    }
}

//store records
class Store {
    static getBooks(){
        var books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

}

//Event loadBooks
document.addEventListener('DOMContentLoaded',UI.displayBooks());

//Add book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    var title = document.querySelector('#title').value;
    var author = document.querySelector('#author').value;
    var isbn = document.querySelector('#isbn').value;
    if( title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all details' , 'danger');
    } else {
        var book = new Book(title,author,isbn);
        UI.addBooktoBooklist(book);
        Store.addBook(book);
        UI.showAlert(' Book successfully added' , 'success');

    }
    

    UI.clearFeilds();
});

//Delete book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBookfromBooklist(e.target);
})
