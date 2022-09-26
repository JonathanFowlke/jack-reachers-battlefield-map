import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useMap } from "../MapProvider";

const options = {
    disableDefaultUI: true,
    center: { lat: 0, lng: 0 },
    zoom: 2,
};

const containerStyle = {
    flex: "1 1 auto",
};

const AppMap = ({ ...props }) => {
    const { overlays } = useMap();

    return (
        <GoogleMap options={options} mapContainerStyle={containerStyle} {...props}>
            {overlays}
        </GoogleMap>
    );
};

export default AppMap;
