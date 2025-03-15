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
    // Create a new FileReader instance
    const fileReader = new FileReader();
    
    // Define the onload event handler
    fileReader.onload = function(event) {
        try {
            // Parse the file contents (event.target.result) as JSON
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                // Add imported quotes to the quotes array
                quotes.push(...importedQuotes);
                // Save updated quotes to local storage
                saveQuotes();
                alert("Quotes imported successfully!");
                showRandomQuote();
            } else {
                alert("Invalid file format. Expected an array of quotes.");
            }
        } catch (error) {
            alert("Error parsing JSON file.");
        }
    };
    
    // Read the file as text using readAsText
    fileReader.readAsText(event.target.files[0]);
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
        document.getElementById("quoteDisplay").innerText = `\"${parsedQuote.text}\" - ${parsedQuote.category}`;
    }
});

// Attach event listener to 'Show New Quote' button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Attach event listener to 'Export Quotes' button
document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);
