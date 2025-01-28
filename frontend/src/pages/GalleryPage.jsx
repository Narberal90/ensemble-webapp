import React, { useState, useEffect } from "react";
import "../styles/components/Gallery.css";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Navigation from "../components/Navigation.jsx";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/style.css";

const GalleryPage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/ensemble/images/")
            .then((response) => response.json())
            .then((data) => setImages(data.images))
            .catch((error) => console.error("Error fetching images:", error));
    }, []);

    return (
        <div className="gallery">
            <Navigation />
            <div className="gallery-section">
                <Gallery>
                    <div className="image-gallery">
                        {images.map((image) => (
                            <Item
                                key={image.id}
                                original={image.image_url}
                                thumbnail={image.image_url}
                                width={image.width}
                                height={image.height}
                            >
                                {({ ref, open }) => (
                                    <div className="image-item">
                                        <img
                                            ref={ref}
                                            onClick={open}
                                            src={image.image_url}
                                            alt={`Image ${image.id}`}
                                            className="cursor-pointer rounded shadow"
                                        />
                                    </div>
                                )}
                            </Item>
                        ))}
                    </div>
                </Gallery>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default GalleryPage;
