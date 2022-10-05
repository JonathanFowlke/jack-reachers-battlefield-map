import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useLoadScript } from "@react-google-maps/api";
import DataProvider, { dataTables } from "../components/DataProvider";
import MapProvider from "../components/MapProvider";
import Banner from "../components/Banner";
import AppMap from "../components/AppMap";
import loadDatabase from "../services/dataloader";

const Main = styled.main`
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    overflow: hidden;
`;

//TODO: perhaps have as a splash while data loads and then animate to the side?
const AppBanner = styled(Banner)`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    pointer-events: none;
`;

const compileData = async (database) => {
    let data = { database };
    await Promise.all(
        dataTables.map(async (table) => {
            data[table] = await database.getAll(table);
        })
    );
    return data;
};

const MainApp = ({ Component, pageProps }) => {
    const [dataContext, setDataContext] = useState({});

    const [overlays, setOverlays] = useState(null);
    const [mapContext, setMapContext] = useState({ overlays, setOverlays });
    useEffect(() => {
        setMapContext((prevState) => ({ ...prevState, overlays }));
    }, [overlays]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    });

    useEffect(() => {
        if (isLoaded) {
            loadDatabase().then((database) => {
                compileData(database).then((data) => {
                    setDataContext(data);
                });
            });
        }
    }, [isLoaded]);

    const handleMapLoad = (map) => {
        setMapContext((prevState) => ({
            ...prevState,
            map,
        }));
    };

    return (
        <DataProvider value={dataContext}>
            <MapProvider value={mapContext}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>{"Reacher's Battlefield Map"}</title>
                </Head>
                <Main>
                    <AppBanner />
                    {isLoaded ? <AppMap onLoad={handleMapLoad} /> : "Loading..."}
                    <Component {...pageProps} />
                </Main>
            </MapProvider>
        </DataProvider>
    );
};

export default MainApp;
