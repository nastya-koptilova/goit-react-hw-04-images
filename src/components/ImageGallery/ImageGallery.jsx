import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.Styled';

export class ImageGallery extends Component {

  onImageClick = ({target}) => {
    const largeUrl = target.getAttribute('data-large');
    const alt = target.getAttribute('alt');
    this.props.onImageClick(largeUrl, alt);
  };

  render() {
    return (
      <Gallery onClick={this.onImageClick}>
        {this.props.images.map(({ webformatURL, id, largeImageURL, tags }) => (
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
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onImageClick: PropTypes.func.isRequired,
  };
