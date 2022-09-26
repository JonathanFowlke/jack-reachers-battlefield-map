import { isNotEmpty } from "../utils";

export const fitMapLocations = (locations, map) => {
    if (locations?.length && map) {
        let positions = locations.map((location) => location.position).filter(isNotEmpty);
        let extents = locations.map((location) => location.bounds).filter(isNotEmpty);
        if (positions.length === 1 && !extents.length) {
            map.setCenter(positions[0]);
            map.setZoom(14);
        } else if (positions.length || extents.length) {
            let bounds = new google.maps.LatLngBounds();
            positions.forEach((position) => {
                bounds.extend(position);
            });
            extents.forEach((extent) => {
                bounds.union(extent);
            });
            map.fitBounds(bounds);
        }
    }
};
