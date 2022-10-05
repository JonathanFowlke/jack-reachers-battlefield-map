import React from "react";
import { headerFonts } from "../Constants";

const Fonts = ({ fonts = headerFonts, ...props }) => {
    const fontString = fonts.map((font) => font.replace(/ /g, "+")).join("|");
    return <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${fontString}&display=swap`} {...props} />;
};

export default Fonts;
