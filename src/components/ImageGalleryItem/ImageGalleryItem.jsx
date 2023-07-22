import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={image.webformatURL} alt={image.tags} className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
