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

// Auto-play functionality
setInterval(() => showRandomBook('next'), 3000); // Change book every 3 seconds
setInterval(() => showRandomMovie('next'), 3000); // Change movie every 3 seconds

// Initial display
updateBookDisplay();
updateMovieDisplay();
