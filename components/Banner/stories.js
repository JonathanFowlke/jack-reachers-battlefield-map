import React from "react";
import Banner from "./.";

export default {
    title: "Banner",
    component: Banner,
};

export const Primary = () => <Banner />;

export const Colored = () => <Banner style={{ color: "red" }} />;

export const LineColored = () => <Banner style={{ color: "yellow" }} lineColor={"black"} />;

export const Large = () => <Banner style={{ fontSize: "2rem" }} />;

export const Small = () => <Banner style={{ fontSize: "0.5rem" }} />;
