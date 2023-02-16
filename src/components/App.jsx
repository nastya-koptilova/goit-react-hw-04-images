import React, { Component } from 'react';
import css from './App.module.css';
import { GlobalStyle } from './GlobalStyle';
import { getPhotos } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    search: '',
    page: 0,
    load: false,
    modal: false,
    largeUrl: '',
    total: 0,
    alt: '',
  };

  async componentDidUpdate(_, prevState) {
    const { page, search } = this.state;
    if (
      page !== prevState.page &&
      search === prevState.search &&
      search !== ''
    ) {
      try {
        this.setState({
          load: true,
        });
        const images = await getPhotos(search, page);
        const { hits, total } = images;
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          load: false,
          total: total,
        }));
      } catch (error) {
        console.log(error.message);
      }
    }

    if (search !== prevState.search) {
      try {
        const images = await getPhotos(search, page);
        const { hits, total } = images;
        if (hits.length === 0) {
          this.setState({
            load: false,
          });
          alert('No images for your request!');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          load: false,
          total: total,
        }));
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  onFormSubmit = value => {
    if (this.state.search === value) {
      return;
    }
    this.setState({ search: value, load: true, images: [], page: 1, total: 0 });
  };

  onButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onImageClick = (url, alt) => {
    this.setState({ modal: true, largeUrl: url, alt: alt });
  };

  onModalClose = () => {
    this.setState({ modal: false, largeUrl: '', alt: '' });
  };

  render() {
    const { images, load, total, modal, largeUrl, alt } = this.state;
    return (
      <>
        <GlobalStyle />
        <div className={css.container}>
          <Searchbar onFormSubmit={this.onFormSubmit} />
          <ImageGallery images={images} onImageClick={this.onImageClick} />
          {load && <Loader />}
          {images.length !== 0 && images.length < total && (
            <Button onButtonClick={this.onButtonClick} />
          )}
          {modal && (
            <Modal
              large={largeUrl}
              onModalClose={this.onModalClose}
              alt={alt}
            />
          )}
        </div>
      </>
    );
  }
}
