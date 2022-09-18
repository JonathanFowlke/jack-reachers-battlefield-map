import React from "react";
import styled from "styled-components";
import AppMap from "../components/AppMap";

const Main = styled.main`
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    overflow: hidden;
`;

const MainApp = ({ Component, pageProps }) => {
    return (
        <Main>
            <AppMap />
            <Component {...pageProps} />
        </Main>
    );
};

export default MainApp;
