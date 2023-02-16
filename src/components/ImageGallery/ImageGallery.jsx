import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.Styled';

export const ImageGallery = ({onImageClick, images}) => {

  const onItemClick = ({target}) => {
    const largeUrl = target.getAttribute('data-large');
    const alt = target.getAttribute('alt');
    onImageClick(largeUrl, alt);
  };

    return (
      <Gallery onClick={onItemClick}>
        {images.map(({ webformatURL, id, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            largeImg={largeImageURL}
            tags={tags}
          />
        ))}
      </Gallery>
    );
  }

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onImageClick: PropTypes.func.isRequired,
  };
