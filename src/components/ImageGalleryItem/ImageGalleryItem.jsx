import PropTypes from 'prop-types';
import { Item, Image } from "./ImageGalleryItem.Styled";

export function ImageGalleryItem({ largeImg, url, tags }) {
  return (
    <Item>
      <Image src={url} alt={tags} data-large={largeImg} />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
