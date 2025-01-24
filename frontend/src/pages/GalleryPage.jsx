import React, {useState, useEffect} from "react";
import "../styles/components/Gallery.css";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Navigation from "../components/Navigation.jsx";

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
            <Navigation/>
            <div className="gallery-section">
                <div className="image-gallery">
                    {images.map((image) => (
                        <div key={image.id} className="image-item">
                            <img src={image.image_url} alt={`Image ${image.id}`}/>
                        </div>
                    ))}
                </div>
            </div>
            <ScrollToTop/>
        </div>
    );
};

export default GalleryPage;
