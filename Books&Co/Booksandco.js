let books = [
    { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/800px-The_Great_Gatsby_Cover_1925_Retouched.jpg", title: "The Great Gatsby" },
    { img: "https://upload.wikimedia.org/wikipedia/en/5/51/1984_first_edition_cover.jpg", title: "1984" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/800px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg", title: "To Kill a Mockingbird" },
    { img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg", title: "The Catcher in the Rye" },
    { img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327940656i/153747.jpg", title: "Moby-Dick" }
];

let movies = [
    { img: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg", title: "Inception" },
    { img: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg", title: "The Matrix" },
    { img: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg?20170315171411", title: "The Dark Knight" },
    { img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQNGITE1zbUDbS_FYzJDOrPkDA8Cc2-MLCjcMB0rx-HW0pWwoKws8WbgSML1mv4xD2me4z9", title: "The Godfather" },
    { img: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg", title: "Forrest Gump" }
];

let bookIndex = 0;
let movieIndex = 0;

function showRandomBook(direction) {
    if (direction === 'next') {
        bookIndex = (bookIndex + 1) % books.length;
    } else {
        bookIndex = (bookIndex - 1 + books.length) % books.length;
    }
    updateBookDisplay();
}

function showRandomMovie(direction) {
    if (direction === 'next') {
        movieIndex = (movieIndex + 1) % movies.length;
    } else {
        movieIndex = (movieIndex - 1 + movies.length) % movies.length;
    }
    updateMovieDisplay();
}

function updateBookDisplay() {
    let bookDisplay = document.getElementById('bookImages');
    bookDisplay.innerHTML = `
        <a href="#" class="book-link">
            <img src="${books[bookIndex].img}" alt="${books[bookIndex].title}" class="book-image" />
            <p>${books[bookIndex].title}</p>
        </a>
    `;
}

function updateMovieDisplay() {
    let movieDisplay = document.getElementById('movieImages');
    movieDisplay.innerHTML = `
        <a href="#" class="movie-link">
            <img src="${movies[movieIndex].img}" alt="${movies[movieIndex].title}" class="movie-image" />
            <p>${movies[movieIndex].title}</p>
        </a>
    `;
}


setInterval(() => showRandomBook('next'), 3000); 
setInterval(() => showRandomMovie('next'), 3000); 


updateBookDisplay();
updateMovieDisplay();

const apiKey = 'AIzaSyBrXyc5lfr3wRJR70zr65Kh0tm7fPIU2oM'; 

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
        showRandomBook(); 

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

setInterval(() => showRandomBook('next'), 3000);
setInterval(() => showRandomMovie('next'), 3000); 


updateBookDisplay();
updateMovieDisplay();



