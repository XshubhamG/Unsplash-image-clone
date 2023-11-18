import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./index.css";
import axios from "axios";
import InputSearch from "./components/InputSearch";
import Filter from "./components/Filter";

const API_URL = "https://api.unsplash.com/search/photos";
const IMG_PER_PAGE = 20;

const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  // fetchImages Function
  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        const { data } = await axios.get(
          `${API_URL}?query=${
            searchInput.current.value
          }&page=${page}&per_page=${IMG_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  // useEffect
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // resetFetch Function
  const resetFetch = () => {
    fetchImages();
    setPage(1);
  };

  // handleSearch Function
  const handleSearch = (e) => {
    e.preventDefault();
    resetFetch();
  };

  // handleSelection Function
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetFetch();
  };

  return (
    <section className="container">
      <h1 className="title">Image Search</h1>

      {/* Input Form */}
      <InputSearch searchInput={searchInput} handleSearch={handleSearch} />

      {/* Filter Button */}
      <Filter handleSelection={handleSelection} />

      {/* Images Container */}
      <div className="images">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className="image"
          />
        ))}
      </div>

      {/* Button Container */}
      <div className="buttons">
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Previous</Button>
        )}
        {page < totalPages && (
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        )}
      </div>
    </section>
  );
};

export default App;
