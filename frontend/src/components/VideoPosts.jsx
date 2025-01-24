import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import "../styles/components/VideoPosts.css";
import ScrollToTop from "./ScrollToTop.jsx";

const VideoPosts = () => {
    const [posts, setPosts] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const fetchPosts = async (page = 1) => {
        try {
            const response = await fetch(`http://localhost:8000/api/ensemble/posts/?page=${page}`);
            const data = await response.json();

            setPosts((prevPosts) => [...prevPosts, ...data.posts]);

            setHasMore(data.has_more);
        } catch (error) {
            console.error("Помилка при завантаженні постів:", error);
        }
    };

    useEffect(() => {
        fetchPosts(nextPage);
    }, [nextPage]);

    const loadMorePosts = () => {
        if (hasMore) {
            setNextPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <section className="video-posts">
            <div className="posts-container">
                {posts.map((post) => (
                    <div key={post.id} className="video-post">
                        <div
                            data-aos="fade-up"
                            data-aos-duration="200"
                            data-aos-anchor-placement="top-bottom"
                            className="post-description"
                            dangerouslySetInnerHTML={{__html: post.description}}
                        />
                        <div className="video-container">
                            <ReactPlayer
                                className="react-player"
                                url={post.video} // URL відео
                                light={post.image_url || true}
                                controls={true}
                                width="100%"
                                height="100%"
                                playing
                            />
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="load-more-container">
                    <button className="load-more-button" onClick={loadMorePosts}>
                        Показати більше
                    </button>
                </div>
            )}
            <ScrollToTop />
        </section>
    );
};

export default VideoPosts;
