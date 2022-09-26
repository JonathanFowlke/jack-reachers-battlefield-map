import Database from "../database";
import { fetchJson } from "../fetch";
import { getBook } from "../googlebooks";
import { isNotEmpty, removeUndefined } from "../utils";

const loadDatabase = async (refresh = false) => {
    const database = new Database("reacher", ["checksums", "books", "events", "locations", "characters", "inventory"]);
    try {
        let latest = await fetchJson("/data/checksums.json");
        let stored = await database.getAll("checksums");

        let locationsItem = latest.find((item) => item.name === "locations");
        await loadData(locationsItem, stored, database, refresh);

        await Promise.all(latest.filter((item) => item !== locationsItem).map(async (item) => await loadData(item, stored, database, refresh)));
        await database.replaceAll(latest, "checksums");
    } catch (ex) {
        console.error("Unable to update database.", ex);
    }
    return database;
};

const loadData = async (item, stored, database, refresh) => {
    let row = stored.find((row) => row.name === item.name);
    let updateNeeded = refresh || row?.checksum !== item.checksum || row?.id !== item.id;
    console.log("Checking data:", item.name, updateNeeded);

    if (updateNeeded) {
        let data = await fetchJson(`/data/${item.name}.json`);

        if (item.name === "locations") {
            await populateLocations(data);
        } else if (item.name === "books") {
            await populateBooks(data);
        } else if (item.name === "events") {
            let locations = database.getAll("locations");
            await populateEvents(data, locations);
        }

        await database.replaceAll(data, item.name);
    }
};

const populateLocations = (locations) => {
    const geocoder = new google.maps.Geocoder();

    return Promise.all(
        locations
            .filter((location) => !location.fictional && !location.position)
            .map(async (location) => {
                let address = [location.name, location.street, location.city, location.state, location.country].filter(isNotEmpty).join(", ");
                let response = await geocoder.geocode({ address });
                let result = response.results[0];
                if (result) {
                    Object.assign(location, {
                        name: location.name || result.formatted_address,
                        position: result.geometry?.location?.toJSON(),
                        bounds: location.bounds || result.geometry?.bounds?.toJSON(),
                        city: getAddressComponent(result, "locality"),
                        county: getAddressComponent(result, "administrative_area_level_2"),
                        state: getAddressComponent(result, "administrative_area_level_1"),
                        country: getAddressComponent(result, "country", true),
                        placeId: result.place_id,
                    });
                } else {
                    console.error("No geocode for: ", address, response);
                }
            })
    );
};

const getAddressComponent = (result, type, short = false) => {
    let component = result.address_components.find((current) => current.types.includes(type));
    return short ? component?.short_name : component?.long_name;
};

const populateBooks = (books) => {
    return Promise.all(
        books
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
};

const populateEvents = (events, locations) => {
    const directionsService = new google.maps.DirectionsService();

    return Promise.all([]);
};

export default loadDatabase;
