const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    const { text, author = 'Unknown' } = quote

    quoteText.textContent = text;
    authorText.textContent = author;

    text.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
    hideLoader();
}

//GET QUOTES FROM API
async function fetchQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {

    }
}

showLoader();
fetchQuotes();

twitterBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showLoader();
    tweetQuote()
})

newQuoteBtn.addEventListener('click', (event) => {
    event.preventDefault()
    fetchQuotes()
})

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

/*SHOW & HODE LOADER */
function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoader() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}