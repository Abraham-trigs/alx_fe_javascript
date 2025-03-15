// --- Existing Code for Quotes, Storage, and Basic Functions ---

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

// Function to show a random quote and store it in session storage
function showRandomQuote() {
    if (quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    document.getElementById("quoteDisplay").innerText = `\"${selectedQuote.text}\" - ${selectedQuote.category}`;
    // Save last displayed quote in session storage
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
    
    // Update category filter since a new category might have been added
    populateCategories();
    
    alert("Quote added successfully!");
}

// --- New Functions for Filtering ---

// Function to populate the category filter dropdown dynamically
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    // Clear existing options and add the default 'All Categories'
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    // Use a Set to extract unique categories from the quotes array
    const categories = new Set();
    quotes.forEach(quote => categories.add(quote.category));
    
    // Append each unique category as an option
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const categoryFilter = document.getElementById("categoryFilter");
    const selectedCategory = categoryFilter.value;
    
    // Remember the last selected filter in local storage
    localStorage.setItem("lastFilter", selectedCategory);
    
    let filteredQuotes = [];
    if (selectedCategory === "all") {
        filteredQuotes = quotes;
    } else {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }
    
    // If no quotes match, display a message
    if (filteredQuotes.length === 0) {
        document.getElementById("quoteDisplay").innerText = "No quotes available for the selected category.";
        return;
    }
    
    // Otherwise, display a random quote from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const selectedQuote = filteredQuotes[randomIndex];
    document.getElementById("quoteDisplay").innerText = `\"${selectedQuote.text}\" - ${selectedQuote.category}`;
    
    // Save the displayed quote in session storage
    sessionStorage.setItem("lastQuote", JSON.stringify(selectedQuote));
}

// --- Existing Code for JSON Import/Export (unchanged for this phase) ---

// Function to export quotes as a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from a JSON file using FileReader, onload, and readAsText
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                // Update categories after import
                populateCategories();
                alert("Quotes imported successfully!");
                filterQuotes();
            } else {
                alert("Invalid file format. Expected an array of quotes.");
            }
        } catch (error) {
            alert("Error parsing JSON file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// --- Initialization on Page Load ---

document.addEventListener("DOMContentLoaded", () => {
    // Log that quotes have been loaded
    if (quotes.length > 0) {
        console.log("Quotes loaded from local storage.");
    }
    
    // Populate the category filter dropdown
    populateCategories();
    
    // Retrieve last selected filter from local storage
    const lastFilter = localStorage.getItem("lastFilter");
    if (lastFilter) {
        document.getElementById("categoryFilter").value = lastFilter;
        filterQuotes();
    } else {
        // Retrieve last viewed quote from session storage, if available
        const lastQuote = sessionStorage.getItem("lastQuote");
        if (lastQuote) {
            const parsedQuote = JSON.parse(lastQuote);
            document.getElementById("quoteDisplay").innerText = `\"${parsedQuote.text}\" - ${parsedQuote.category}`;
        } else {
            showRandomQuote();
        }
    }
});

// Attach event listener to 'Show New Quote' button
document.getElementById("newQuote").addEventListener("click", () => {
    // If a filter is active, use filterQuotes; otherwise, show a random quote
    const categoryFilter = document.getElementById("categoryFilter");
    if (categoryFilter.value === "all") {
        showRandomQuote();
    } else {
        filterQuotes();
    }
});

// Attach event listener to 'Export Quotes' button
document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);
