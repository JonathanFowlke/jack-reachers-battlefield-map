import { fetchJson } from "../fetch";

export const getBookUrl = (isbn) => {
    return `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
};

export const getBook = async (isbn) => {
    let url = getBookUrl(isbn);
    let results = await fetchJson(url);
    if (results?.items?.length) {
        if (results.items.length > 1) {
            console.warn("More then 1 book available for: ", isbn, results.items.length);
        }
        return results.items[0];
    } else {
        console.error("No book for: ", isbn);
        return null;
    }
};
