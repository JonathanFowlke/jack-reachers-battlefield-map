import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import AppMap from "../components/AppMap";
import fetchJson from "../utils/fetchJson";

const Main = styled.main`
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    overflow: hidden;
`;

const MainApp = ({ Component, pageProps }) => {
    const [books, setBooks] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        //TODO: get data from indexed db, if not there or out of date
        // 1. fetch from public json
        // 2. google books api (w/ key) https://www.googleapis.com/books/v1/volumes?q=isbn1984818511
        // 3. use google books covers
        // 4. fandom api? (chrono order?)
        fetchJson("/data/books.json").then((data) => {
            setBooks(data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Reacher's Battlefield Map</title>
            </Head>
            <Main>
                {isLoading ? "Loading" : "Loaded"}
                <AppMap />
                <Component {...pageProps} />
            </Main>
        </>
    );
};

export default MainApp;
