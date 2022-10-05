import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { headerFontFamily } from "../Constants";
import useSize from "@react-hook/size";

const Container = styled.div`
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    font-size: 1rem;
    font-family: ${headerFontFamily};
    font-stretch: condensed;
    width: ${(props) => props.$width + "px" || "auto"};
`;

const Lined = styled.span`
    display: flex;
    flex-direction: row;

    :before,
    :after {
        content: "";
        flex: 1 1;
        border-bottom: 0.1em solid ${(props) => props.lineColor};
        margin: auto;
    }

    :before {
        margin-inline-end: 1em;
    }

    :after {
        margin-inline-start: 1em;
    }
`;

const Name = styled.span`
    display: inline-block;
    font-size: 4em;
    font-weight: 600;
    letter-spacing: 0.1em;

    :after {
        content: " ";
        margin-left: -0.1em;
    }
`;

const Banner = ({ lineColor = "currentColor", ...props }) => {
    const nameRef = useRef(null);
    const [width] = useSize(nameRef);

    return (
        <Container $width={width} {...props}>
            <Lined lineColor={lineColor}>{" A "}</Lined>
            <Name ref={nameRef}>{"Jack Reacher"}</Name>
            <Lined lineColor={lineColor}>{" Map "}</Lined>
        </Container>
    );
};

export default Banner;
