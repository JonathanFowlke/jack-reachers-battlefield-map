import React, { useEffect, useMemo } from "react";
import { Marker } from "@react-google-maps/api";
import { useData } from "../components/DataProvider";
import { useMap } from "../components/MapProvider";
import { isNotEmpty } from "../services/utils";
import { fitMapLocations } from "../services/googlemaps";

const generateMarkers = (locations) => {
    return locations
        .map((location) => (location.position ? <Marker key={location.id} position={location.position} title={location.name} /> : null))
        .filter(isNotEmpty);
};

const getBookLocations = (books, locations) => {
    if (books && locations) {
        return books
            .map((book) => book.locations?.map((locationId) => locations.find((location) => location.id === locationId)))
            .flat()
            .filter(isNotEmpty);
    }
};

const HomePage = () => {
    const { books, locations } = useData();
    const { map, setOverlays } = useMap();

    const bookLocations = useMemo(() => getBookLocations(books, locations), [books, locations]);

    useEffect(() => {
        if (bookLocations && map) {
            fitMapLocations(bookLocations, map);

            let markers = generateMarkers(bookLocations);
            setOverlays(markers);
        }
        return () => {
            setOverlays(null);
        };
    }, [bookLocations, map, setOverlays]);

    return <div></div>;
};

export default HomePage;
