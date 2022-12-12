import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const pageEndRef = useRef();

  const fetchPhotos = async (pageNumber) => {
    const access_key = "RRhji8TB8ZlO4EyFt9JhRzAhG57ygFq33LIjP96Ywyw";
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${access_key}&page=${pageNumber}&per_page=10`
    );
    const resJson = await res.json();
    setPhotos([...photos, ...resJson]);
    setIsLoadMore(true);
    console.log("object", resJson);
  };

  useEffect(() => {
    fetchPhotos(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    if (isLoadMore) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEndRef.current);
    }
  }, [isLoadMore]);

  function loadMore() {
    setPageNumber((s) => s + 1);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        {photos.map((i) => {
          return (
            <div
              key={i.id}
              style={{
                width: 500,
                height: 200,
                background: "#ccc",
                margin: 10,
              }}
            >
              {i.user.name}
            </div>
          );
        })}
        <div ref={pageEndRef}>loading....</div>
        <button onClick={loadMore}>Load More</button>
      </div>
    </div>
  );
}

export default App;
