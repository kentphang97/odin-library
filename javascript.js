//#region DOM
const bookCardList = document.querySelector("#bookCardSection");
const btnCreateBook = document.querySelector("#btn-createBook");
const bookNameInput = document.querySelector("#bookName");
const authorInput = document.querySelector("#authorName");
const pagesInput = document.querySelector("#pages");
const readBool = document.querySelector("#read");
const bookForm = document.querySelector("#bookForm");
const btnModal = document.querySelector("#modal-button");
const btnDeleteBook = document.querySelector("#btnDeleteBook");
//const btndeleteBook = document.querySelector();

//#endregion

//#region variables
const LIBRARY = [];
let domDeleteAry;
//#endregion

//#region Bootstrap

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const form = document.querySelector(".needs-validation");
  const createBookModal = document.querySelector("#createBook");
  btnModal.addEventListener("click", () => {
    form.classList.remove("was-validated");
  });

  // Loop over them and prevent submission
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        addBookToLibrary(
          bookNameInput.value,
          authorInput.value,
          pagesInput.value,
          readBool.checked
        );

        const modal = document.querySelector("#createBook");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
        form.reset();
      }

      form.classList.add("was-validated");
    },
    false
  );
})();

//#endregion

//#region Event Listener //

btnDeleteBook.addEventListener("click", () => {
  removeBookFromLibrary(domDeleteAry);
});

//#endregion
function createBookCard() {
  bookCardList.innerHTML = "";
  LIBRARY.forEach((book, index) => {
    // Create parent div
    const colDiv = document.createElement("div");
    colDiv.className = "col-8 col-lg-4 col-xl-3";

    // Create card
    const cardDiv = document.createElement("div");
    cardDiv.className = "card border-success mb-3";

    // Create card body
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body text-success";

    // Title Section
    const cardTitleDiv = document.createElement("div");
    cardTitleDiv.className = "card-title justify-content-between";

    const title = document.createElement("h5");
    title.textContent = book.title;

    // Add title to card title
    cardTitleDiv.appendChild(title);

    // Card Text Section
    const cardText = document.createElement("h6");
    cardText.className = "card-text";

    const author = document.createElement("div");
    author.className = "mb-1";
    author.textContent = `By: ${book.author}`;

    const pages = document.createElement("div");
    pages.className = "mb-2";
    pages.textContent = `Number of pages: ${book.pages}`;

    // Switch Section
    const switchDiv = document.createElement("div");
    switchDiv.className =
      "form-check form-switch d-flex justify-content-between gap-1";

    const switchContainer = document.createElement("div");

    const switchInput = document.createElement("input");
    switchInput.className = "form-check-input";
    switchInput.setAttribute("type", "checkbox");
    switchInput.setAttribute("role", "switch");
    switchInput.setAttribute("id", `readOrNot${index}`);
    if (book.read) {
      switchInput.setAttribute("checked", "");
    }

    switchInput.addEventListener("change", () => {
      updateReadStatus(book.id);
    });

    const switchLabel = document.createElement("label");
    switchLabel.className = "form-check-label";
    switchLabel.setAttribute("for", `readOrNot${index}`);
    book.read
      ? (switchLabel.textContent = "Read")
      : (switchLabel.textContent = "Not Read");

    const dButton = document.createElement("button");
    dButton.setAttribute("type", "button");
    dButton.setAttribute("aria-label", "Close");
    dButton.setAttribute("data-bs-toggle", "modal");
    dButton.setAttribute("data-bs-target", "#deleteBookModal");
    dButton.setAttribute("data-dom-array", index);
    dButton.classList = "btn-close d-inline";

    dButton.addEventListener("click", () => {
      const dataDomArrayValue = dButton.getAttribute("data-dom-array");
      domDeleteAry = dataDomArrayValue;
    });

    // Combine switch
    switchContainer.appendChild(switchInput);
    switchContainer.appendChild(switchLabel);
    switchDiv.appendChild(switchContainer);
    switchDiv.appendChild(dButton);

    // Combine card text
    cardText.appendChild(author);
    cardText.appendChild(pages);
    cardText.appendChild(switchDiv);

    // Combine card body
    cardBodyDiv.appendChild(cardTitleDiv);
    cardBodyDiv.appendChild(cardText);

    // Combine card
    cardDiv.appendChild(cardBodyDiv);

    // Combine column
    colDiv.appendChild(cardDiv);

    bookCardList.appendChild(colDiv);
  });
}

function Print() {
  console.log(LIBRARY);
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  LIBRARY.push(book);
  createBookCard();
}

function removeBookFromLibrary(index) {
  if (Number(index) !== -1) {
    LIBRARY.splice(index, 1);
    createBookCard();
  }
}

function ClearFormInput() {
  bookNameInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readBool.checked = false;
}

function updateReadStatus(id) {
  const book = LIBRARY.find((book) => book.id === id);
  if (book) {
    book.toggleReadStatus();
    createBookCard();
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}
//Init Of Sample Books//
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("The Very Hungry Caterpillar", "Eric Carle", 281, false);
addBookToLibrary("David Copperfield", "Charles Dickens", 281, false);
addBookToLibrary("Le Père Goriot", "Honoré de Balzac", 281, false);
addBookToLibrary("Wuthering Heights", "Emily Brontë", 281, false);
addBookToLibrary("Divergent ", "Veronica Roth", 281, true);
