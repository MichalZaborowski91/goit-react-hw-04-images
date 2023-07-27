import React, { useEffect, useState } from 'react';
import axios from 'axios';
import css from './imagesFinder.module.css';
import SearchBar from 'components/searchBar/searchBar';
import Button from '../button/button.jsx';
import Loader from '../loader/loader.jsx';
import Modal from '../modal/modal.jsx';

const API_KEY = '36841303-60370a725d5fd0d1f3e01c212';

const ImagesFinder = () => {
  const [images, setImages] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [perPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() => {
    closeModal();
    fetchImages();
    setIsLoading(false);
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${inputSearch}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );
      const data = await response.data.hits;
      const dataTotalHits = await response.data.totalHits;
      setImages(data);
      setTotalHits(dataTotalHits);
    } catch (error) {
      console.log('error', error);
    }
  };

  const addMoreImages = async () => {
    const nextPage = currentPage + 1;
    const response = await axios.get(
      `https://pixabay.com/api/?q=${inputSearch}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );
    const newImages = response.data.hits;
    setImages(prevState => [...prevState, ...newImages]);
    setCurrentPage(nextPage);
  };
  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  const handleChange = e => {
    setInputSearch(e.target.value);
    if (e.target.value === '') {
      return setIsLoading(false);
    }
    setIsLoading(true);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    fetchImages();
    setIsLoading(false);
  };
  return (
    <div>
      <div>
        <SearchBar
          inputSearch={inputSearch}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <ul className={css.gallery}>
              {images.length > 0 ? (
                <>
                  {images.map(el => (
                    <li className={css.item} key={el.id}>
                      <img
                        className={css.image}
                        src={el.webformatURL}
                        alt={el.tags}
                        onClick={() => openModal(el)}
                      />
                    </li>
                  ))}
                </>
              ) : (
                <h2>No images to display</h2>
              )}
            </ul>
            {images.length === 0 || images.length >= totalHits ? (
              <Button onClick={addMoreImages} />
            ) : (
              <Button onClick={addMoreImages} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesFinder;
