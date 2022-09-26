import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import AppMap from "../components/AppMap";
import loadDatabase from "../services/dataloader";
import { useLoadScript } from "@react-google-maps/api";

const Main = styled.main`
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    overflow: hidden;
`;

const MainApp = ({ Component, pageProps }) => {
    const [database, setDatabase] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    });

    useEffect(() => {
        if (isLoaded) {
            loadDatabase().then((db) => {
                setDatabase(db);
            });
        }
    }, [isLoaded]);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{"Reacher's Battlefield Map"}</title>
            </Head>
            <Main>
                {isLoaded ? <AppMap /> : "Loading..."}
                <Component {...pageProps} />
            </Main>
        </>
    );
};

export default MainApp;
