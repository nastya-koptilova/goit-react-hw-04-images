import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Container, Image } from './Modal.Styled';

export const Modal = ({ onModalClose, large, alt }) => {

  useEffect(() => {
    window.addEventListener('keydown', onEscClose);
    return () => {
      window.removeEventListener('keydown', onEscClose);
    };
  });

  const onEscClose = event => {
    if (event.code === 'Escape') {
      onModalClose();
    }
  };

  const onOverlayClose = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  return (
    <Overlay onClick={onOverlayClose}>
      <Container>
        <Image src={large} alt={alt} />
      </Container>
    </Overlay>
  );
};

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
