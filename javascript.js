//#region DOM
const bookCardList = document.querySelector("#bookCardSection");
const btnCreateBook = document.querySelector("#btn-createBook");
const bookNameInput = document.querySelector("#bookName");
const authorInput = document.querySelector("#authorName");
const pagesInput = document.querySelector("#pages");
const readBool = document.querySelector("#read");
const bookForm = document.querySelector("#bookForm");
const btnModal = document.querySelector("#modal-button");

//#endregion

//#region variables
const LIBRARY = [];
//#endregion

//#region Bootstrap

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          const modal = document.querySelector("#createBook");
          btnCreateBook.setAttribute("data-bs-dismiss", "modal");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          bootstrapModal.hide();
          addBookToLibrary(
            bookNameInput.value,
            authorInput.value,
            pagesInput.value,
            readBool.checked
          );
          Print();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//#endregion

//#region Event Listener //

//#endregion
function createBookCard() {}

function Print() {
  console.log(LIBRARY);
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  LIBRARY.push(book);
}
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  displayInfo() {
    let readString = "";
    if (this.read) {
      readString = "already read";
    } else {
      readString = "not read yet";
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
  }
}
