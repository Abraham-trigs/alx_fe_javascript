const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Simulated server API

// Array to store quotes along with their categories (loaded from local storage if available)
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Abraham is maturing in Java.", category: "Programming" },
    { text: "First, solve the problem. Then, write the code.", category: "Software Development" },
    { text: "He is a Good programmer.", category: "Best Practices" }
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to fetch quotes from the mock server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        const serverQuotes = await response.json();
        
        // Simulating server quotes with text and category fields
        const formattedQuotes = serverQuotes.slice(0, 5).map(post => ({
            text: post.title, // Using 'title' as quote text
            category: "General" // Default category for mock data
        }));

        console.log("Fetched quotes from server:", formattedQuotes);
        mergeServerQuotes(formattedQuotes);
    } catch (error) {
        console.error("Error fetching quotes from server:", error);
    }
}

// Periodically fetch server updates every 30 seconds
setInterval(fetchQuotesFromServer, 30000);

// Load server quotes when page loads
document.addEventListener("DOMContentLoaded", fetchQuotesFromServer);

// Function to merge server quotes into local storage with conflict resolution
function mergeServerQuotes(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    let conflicts = [];

    serverQuotes.forEach(serverQuote => {
        const localMatch = localQuotes.find(localQuote => localQuote.text === serverQuote.text);
        if (!localMatch) {
            localQuotes.push(serverQuote);
        } else if (localMatch.category !== serverQuote.category) {
            conflicts.push({ local: localMatch, server: serverQuote });
        }
    });

    if (conflicts.length > 0) {
        handleConflicts(conflicts, localQuotes);
    }

    localStorage.setItem("quotes", JSON.stringify(localQuotes));
    console.log("Merged server quotes into local storage.");
    showNotification("New quotes have been added or updated from the server.");
}

// Function to handle conflicts
function handleConflicts(conflicts, updatedQuotes) {
    conflicts.forEach(conflict => {
        // Server data takes priority
        const index = updatedQuotes.findIndex(q => q.text === conflict.local.text);
        updatedQuotes[index] = conflict.server;
    });
    showNotification("Conflicts resolved: Server data applied.");
}

// Function to display notifications
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 5000);
}

// Function to show a random quote and store it in session storage
function showRandomQuote() {
    if (quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    document.getElementById("quoteDisplay").innerText = `"${selectedQuote.text}" - ${selectedQuote.category}`;
    
    // Save last displayed quote to session storage
    sessionStorage.setItem("lastQuote", JSON.stringify(selectedQuote));
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    // Validate input fields
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

    // Add new quote to the array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    
    // Save updated quotes to local storage
    saveQuotes();
    
    // Clear input fields after adding quote
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    
    alert("Quote added successfully!");
}

// Load quotes from local storage and restore last viewed quote from session storage on page load
document.addEventListener("DOMContentLoaded", () => {
    if (quotes.length > 0) {
        console.log("Quotes loaded from local storage.");
    }
    
    // Retrieve last viewed quote from session storage
    const lastQuote = sessionStorage.getItem("lastQuote");
    if (lastQuote) {
        const parsedQuote = JSON.parse(lastQuote);
        document.getElementById("quoteDisplay").innerText = `"${parsedQuote.text}" - ${parsedQuote.category}`;
    }
});

// Attach event listener to 'Show New Quote' button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
