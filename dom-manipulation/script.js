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

// Load quotes from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    if (quotes.length > 0) {
        console.log("Quotes loaded from local storage.");
    }
});
