import React from "react";
import HeroHeader from "../components/HeroHeader";
import MainContent from "../components/MainContent";
import VideoPosts from "../components/VideoPosts.jsx";
import Navigation from "../components/Navigation.jsx";

const HomePage = () => {
    return (
        <>
            <Navigation/>
            <HeroHeader/>
            <MainContent/>
            <VideoPosts/>
        </>
    );
};

export default HomePage;
