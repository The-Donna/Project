let bookIndex = 0;
let books = [];
const apiKey = 'AIzaSyBrXyc5lfr3wRJR70zr65Kh0tm7fPIU2oM'; // Replace with your actual API key

async function searchBook() {
    const query = document.getElementById('searchBox').value.trim();
    if (!query) {
        alert("Please enter a book title");
        return;
    }
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}&_=${Date.now()}`;
    try {
        console.log("Fetching from URL:", url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response:", data);
        books = data.items || [];
        displayResults(books);
        showRandomBook(); // Call showRandomBook here, after the data is available.
    } catch (error) {
        console.error("Error fetching book data:", error);
        document.getElementById('results').innerHTML = `<p style="color:red;">Error fetching book data: ${error.message}</p>`;
    }
}

function displayResults(books) {
    console.log("displayResults called with:", books);
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
        console.error("Error: 'results' div not found!");
        return;
    }
    resultsDiv.innerHTML = '';
    if (!books || books.length === 0) {
        resultsDiv.innerHTML = "<p>No books found.</p>";
        return;
    }
    books.forEach(book => {
        console.log("Processing book:", book);
        const title = book.volumeInfo?.title || "No title available";
        const authors = book.volumeInfo?.authors ? book.volumeInfo?.authors.join(", ") : "Unknown author";
        const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || "https://via.placeholder.com/128x200";
        console.log("Title:", title);
        console.log("Authors:", authors);
        console.log("Thumbnail:", thumbnail);
        const bookElement = document.createElement('div');
        bookElement.style.margin = "10px";
        bookElement.style.padding = "10px";
        bookElement.style.border = "1px solid #ccc";
        bookElement.innerHTML = `
            <img src="${thumbnail}" alt="${title}" style="display:block;">
            <h3>${title}</h3>
            <p><strong>Author(s):</strong> ${authors}</p>
        `;
        resultsDiv.appendChild(bookElement);
        console.log("Book element appended.");
    });
}

function showRandomBook() {
    if (books && books.length > 0) {
        updateBookDisplay();
    } else {
        console.log("no books to display");
    }
}

function updateBookDisplay() {
    if (books.length > 0) {
        const randomIndex = Math.floor(Math.random() * books.length);
        const randomBook = books[randomIndex];
        const title = randomBook.volumeInfo?.title || "No title available";
        const authors = randomBook.volumeInfo?.authors ? randomBook.volumeInfo?.authors.join(", ") : "Unknown author";
        const thumbnail = randomBook.volumeInfo?.imageLinks?.thumbnail || "https://via.placeholder.com/128x200";
        const titleElement = document.getElementById('randomBookTitle');
        const authorsElement = document.getElementById('randomBookAuthors');
        const thumbnailElement = document.getElementById('randomBookThumbnail');
        if (titleElement) {
            titleElement.textContent = title;
        } else {
            console.error("Error: 'randomBookTitle' element not found.");
        }
        if (authorsElement) {
            authorsElement.textContent = `Author(s): ${authors}`;
        } else {
            console.error("Error: 'randomBookAuthors' element not found.");
        }
        if (thumbnailElement) {
            thumbnailElement.src = thumbnail;
            thumbnailElement.alt = title;
        } else {
            console.error("Error: 'randomBookThumbnail' element not found.");
        }
    }
}

setInterval(showRandomBook, 3000);


