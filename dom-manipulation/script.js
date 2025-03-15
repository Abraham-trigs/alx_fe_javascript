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

// Function to populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

    // Extract unique categories using map() and Set
    const categories = [...new Set(quotes.map(quote => quote.category))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;  // ✅ Replaced innerText with textContent
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
    document.getElementById("quoteDisplay").textContent = `"${selectedQuote.text}" - ${selectedQuote.category}`;  // ✅ Replaced innerText with textContent

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

    // Add new quote
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Save and update categories
    saveQuotes();
    populateCategories();  // Ensures new category appears in dropdown

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
    
    const lastQuote = sessionStorage.getItem("lastQuote");
    if (lastQuote) {
        const parsedQuote = JSON.parse(lastQuote);
        document.getElementById("quoteDisplay").textContent = `"${parsedQuote.text}" - ${parsedQuote.category}`;  // ✅ Replaced innerText with textContent
    }
});

// Attach event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addQuote);
