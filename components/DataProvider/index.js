import React, { useContext } from "react";

export const dataTables = ["books", "locations", "events", "characters", "inventory"];

const DataContext = React.createContext({
    books: null,
    events: null,
    locations: null,
    characters: null,
    inventory: null,
    database: null,
});

export const useData = () => useContext(DataContext);

const DataProvider = ({ value, children }) => {
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
