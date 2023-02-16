import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import { GlobalStyle } from './GlobalStyle';
import { getPhotos } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);
  const [largeUrl, setLargeUrl] = useState('');
  const [totalImg, setTotalImg] = useState(0);
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (search !== '') {
      const fetchImages = async () => {
        try {
          setLoad(true);
          const imagesData = await getPhotos(search, page);
          const { hits, total } = imagesData;
          if (hits.length === 0) {
            setLoad(false);
            alert('No images for your request!');
            return;
          }
          setImages(prevState => [...prevState, ...hits]);
          setLoad(false);
          setTotalImg(total);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchImages();
    }
    setLoad(false);
  }, [page, search]);

  const onFormSubmit = value => {
    if (search === value) {
      return;
    }
    setSearch(value);
    setLoad(true);
    setImages([]);
    setPage(1);
    setTotalImg(0);
  };

  const onButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  const onImageClick = (url, alt) => {
    setModal(true);
    setLargeUrl(url);
    setAlt(alt);
  };

  const onModalClose = () => {
    setModal(false);
    setLargeUrl('');
    setAlt('');
  };

  return (
    <>
      <GlobalStyle />
      <div className={css.container}>
        <Searchbar onFormSubmit={onFormSubmit} />
        <ImageGallery images={images} onImageClick={onImageClick} />
        {load && <Loader />}
        {images.length !== 0 && images.length < totalImg && (
          <Button onButtonClick={onButtonClick} />
        )}
        {modal && (
          <Modal large={largeUrl} onModalClose={onModalClose} alt={alt} />
        )}
      </div>
    </>
  );
};
