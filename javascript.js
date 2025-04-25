const LIBRARY = [];

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
