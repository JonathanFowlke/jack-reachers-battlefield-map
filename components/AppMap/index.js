import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const options = {
    disableDefaultUI: true,
};

const containerStyle = {
    flex: "1 1 auto",
};

const AppMap = () => {
    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
            <GoogleMap options={options} center={{ lat: 0, lng: 0 }} zoom={2} mapContainerStyle={containerStyle}>
                {/* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    );
};

export default AppMap;
