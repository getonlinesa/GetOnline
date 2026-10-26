# Get Online SA website

Static site on GitHub Pages (main branch, root). Pages: `index.html` (English), `af/index.html` (Afrikaans), `voorbeeld/index.html` (example plumber, noindex).

## Things you set
- **Form key:** in the script near the bottom of each page, `CONFIG.formAccessKey`. Orders and the contact form are emailed to letsgo@getonlinesa.co.za through Web3Forms. Without the key nothing is sent.
- **Prices and special end date:** `CONFIG.prices` and `CONFIG.specialEnds`.
- **Photo:** save `assets/francois.webp` and replace the `FC` circle in the "Who builds your website" section (see the comment next to it).
- **Street address:** the TODO comment in the footer.

## Adding a client review (only real ones)
In each page, find `var REVIEWS = [];` and add one entry:
`{ name: "Name", business: "Business", town: "Town", stars: 5, text_en: "English text", text_af: "Afrikaanse teks" }`
Do this on both `index.html` and `af/index.html`. While the list is empty the page shows the "we're new" card.

## 1 March 2027
The visible prices switch back by themselves after 28 February 2027, but the structured data (JSON-LD `price` and `priceValidUntil`) does not. Update both pages then. Never extend the special by only changing the date.
