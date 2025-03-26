const API_URL = "https://api.freeapi.app/api/v1/public/books";
let books = [];
let page = 1;

async function fetchBooks() {
    try {
        const response = await fetch(`${API_URL}?page=${page}`);
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data.data)) {
            books = [...books, ...data.data.data]; // Correct path to books
            displayBooks(books);
        } else {
            console.error("Error: API did not return expected book array", data);
        }
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

// Display Books in Grid/List
function displayBooks(bookList) {
    if (!Array.isArray(bookList) || bookList.length === 0) {
        console.error("No books found", bookList);
        document.getElementById("booksContainer").innerHTML = "<p>No books found</p>";
        return;
    }

    const container = document.getElementById("booksContainer");
    container.innerHTML = "";

    bookList.forEach(book => {
        const info = book.volumeInfo; // Correctly accessing volumeInfo
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
        <div class="hgtDiv">
            <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="Book Cover">
            <h3>${info.title || "No Title"}</h3>
            <p>Author: ${info.authors ? info.authors.join(", ") : "Unknown"}</p>
            <p>Publisher: ${info.publisher || "Unknown"}</p>
            <p>Published: ${info.publishedDate || "N/A"}</p>
        </div>
            <button onclick="openBook('${info.infoLink}')">More Info</button>
        `;
        container.appendChild(bookElement);
    });
}

// Open book details in a new tab
function openBook(url) {
    window.open(url, "_blank");
}

// Toggle List/Grid View
function toggleView(view) {
    const container = document.getElementById("booksContainer");
    container.className = view;
}

// Search Books
function searchBooks() {
    // debugger
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredBooks = books.filter(book => {
        const info = book.volumeInfo || {}; // Ensure volumeInfo exists
        const title = info.title ? info.title.toLowerCase() : ""; 
        const authors = info.authors ? info.authors.join(", ").toLowerCase() : "";    
        return title.includes(query) || authors.includes(query);
    });
    displayBooks(filteredBooks);
}

// Sort Books
function sortBooks(criteria) {
    // debugger
    const sortedBooks = [...books].sort((a, b) => {
        const titleA = a.volumeInfo?.title || "";
        const titleB = b.volumeInfo?.title || "";

        const dateA = a.volumeInfo?.publishedDate || "0000-00-00"; 
        const dateB = b.volumeInfo?.publishedDate || "0000-00-00";

        if (criteria === "title") return titleA.localeCompare(titleB);
        if (criteria === "publishedDate") return new Date(dateA) - new Date(dateB);
    });
    displayBooks(sortedBooks);
}

// Load More Books (Pagination)
function loadMoreBooks() {
    page++;
    fetchBooks();
}

// Fetch initial books on page load
fetchBooks();
