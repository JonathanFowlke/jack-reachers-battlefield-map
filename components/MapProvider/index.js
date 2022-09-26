import React, { useContext } from "react";

const MapContext = React.createContext({
    map: null,
    overlays: null,
    setOverlays: () => {},
});

export const useMap = () => useContext(MapContext);

const MapProvider = ({ value, children }) => {
    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export default MapProvider;
