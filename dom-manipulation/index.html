const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Simulated server API

// Load existing quotes from local storage or set default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Abraham is maturing in Java.", category: "Programming" },
    { text: "First, solve the problem. Then, write the code.", category: "Software Development" },
    { text: "He is a Good programmer.", category: "Best Practices" }
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to fetch quotes from the mock server and handle conflicts
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        const serverQuotes = await response.json();
        
        // Simulating server quotes with text and category fields
        const formattedQuotes = serverQuotes.slice(0, 5).map(post => ({
            text: post.title, // Using 'title' as quote text
            category: "General" // Default category for mock data
        }));

        // Merge server quotes with local quotes, ensuring no duplicates
        formattedQuotes.forEach(serverQuote => {
            if (!quotes.some(localQuote => localQuote.text === serverQuote.text)) {
                quotes.push(serverQuote);
            }
        });

        saveQuotes();
        console.log("Merged quotes from server:", quotes);
        showNotification("New quotes added from server!");
    } catch (error) {
        console.error("Error fetching quotes from server:", error);
    }
}

// Function to post a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(SERVER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quote)
        });
        const result = await response.json();
        console.log("Quote successfully posted to server:", result);
    } catch (error) {
        console.error("Error posting quote to server:", error);
    }
}

// Function to show UI notification
function showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.top = "10px";
    notification.style.right = "10px";
    notification.style.background = "#28a745";
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Function to populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

    // Extract unique categories using map() and Set
    const categories = [...new Set(quotes.map(quote => quote.category))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category from local storage
    const lastSelectedCategory = localStorage.getItem("selectedCategory");
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
    }
}

// Function to show a random quote based on selected category
function showRandomQuote() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    
    // Filter quotes based on category selection
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);
    
    if (filteredQuotes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const selectedQuote = filteredQuotes[randomIndex];
    document.getElementById("quoteDisplay").textContent = `"${selectedQuote.text}" - ${selectedQuote.category}`;

    // Save last displayed quote to session storage
    sessionStorage.setItem("lastQuote", JSON.stringify(selectedQuote));
}

// Function to add a new quote and update categories
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    // Check for duplicate quotes
    const isDuplicate = quotes.some(quote => quote.text.toLowerCase() === newQuoteText.toLowerCase());
    if (isDuplicate) {
        alert("This quote already exists!");
        return;
    }

    // Create new quote object
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    
    // Save and update categories
    saveQuotes();
    populateCategories();

    // Post new quote to server
    postQuoteToServer(newQuote);

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    
    alert("Quote added successfully!");
}

// Function to filter quotes based on selected category
function filterQuotes() {
    localStorage.setItem("selectedCategory", document.getElementById("categoryFilter").value);
    showRandomQuote();
}

// Load quotes and restore last viewed quote on page load
document.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    fetchQuotesFromServer();
    
    const lastQuote = sessionStorage.getItem("lastQuote");
    if (lastQuote) {
        const parsedQuote = JSON.parse(lastQuote);
        document.getElementById("quoteDisplay").textContent = `"${parsedQuote.text}" - ${parsedQuote.category}`;
    }
});

// Periodically fetch server updates every 30 seconds
setInterval(fetchQuotesFromServer, 30000);

// Attach event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addQuote);
