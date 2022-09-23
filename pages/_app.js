import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import AppMap from "../components/AppMap";
import loadDatabase from "../services/dataloader";

const Main = styled.main`
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    overflow: hidden;
`;

const MainApp = ({ Component, pageProps }) => {
    const [database, setDatabase] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        loadDatabase().then((db) => {
            setDatabase(db);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{"Reacher's Battlefield Map"}</title>
            </Head>
            <Main>
                {isLoading ? "Loading..." : "Loaded"}
                <AppMap />
                <Component {...pageProps} />
            </Main>
        </>
    );
};

export default MainApp;
