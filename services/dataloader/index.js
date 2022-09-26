import Database from "../database";
import { fetchJson } from "../fetch";
import { getBook } from "../googlebooks";
import { removeUndefined } from "../utils";

const loadDatabase = async (refresh = false) => {
    const database = new Database("reacher", ["checksums", "books", "events", "locations", "characters", "inventory"]);
    try {
        let directionsService = new google.maps.DirectionsService();
        let latest = await fetchJson("/data/checksums.json");
        let stored = await database.getAll("checksums");
        await Promise.all(
            latest.map(async (item) => {
                let row = stored.find((row) => row.name === item.name);
                let updateNeeded = refresh || row?.checksum !== item.checksum || row?.id !== item.id;
                console.log("Checking data: ", item.name, updateNeeded);

                if (updateNeeded) {
                    let data = await fetchJson(`/data/${item.name}.json`);
                    if (item.name === "books") {
                        await Promise.all(
                            data
                                .filter((book) => book.isbn?.length)
                                .map(async (book) => {
                                    let googleBook = await getBook(book.isbn);
                                    let volume = googleBook?.volumeInfo;
                                    if (volume) {
                                        Object.assign(
                                            book,
                                            removeUndefined({
                                                authors: volume.authors,
                                                published: volume.publishedDate,
                                                description: volume.description,
                                                pages: volume.pageCount,
                                                rating: volume.averageRating,
                                                rated: volume.ratingsCount,
                                                image: volume.imageLinks?.thumbnail,
                                                buy: volume.canonicalVolumeLink,
                                                preview: volume.previewLink,
                                            })
                                        );
                                    }
                                })
                        );
                    }
                    await database.replaceAll(data, item.name);
                }
            })
        );
        await database.replaceAll(latest, "checksums");
    } catch (ex) {
        console.error("Unable to update database. ", ex);
    }
    return database;
};

export default loadDatabase;
