import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

class ImageGallery extends Component {
  state = {
    isLoading: false,
    images: [],
    error: null,
    showModal: false, // Добавим состояние для открытия/закрытия модального окна
    largeImageUrl: '', // Добавим состояние для хранения URL большого изображения
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ images: [], error: null }, () => this.fetchImages());
    }
  }

  fetchImages = () => {
    const { searchQuery } = this.props;
    const API_KEY = '35106771-5ec042213d922cbd410dda217';
    const BASE_URL = 'https://pixabay.com/api/';
    const perPage = 12;
    const currentPage = 1;

    const url = `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    this.setState({ isLoading: true });

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error fetching data');
      })
      .then((data) => this.setState({ images: data.hits }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  // Обработчик открытия модального окна
  openModal = (largeImageUrl) => {
    this.setState({ showModal: true, largeImageUrl });
  };

  // Обработчик закрытия модального окна
  closeModal = () => {
    this.setState({ showModal: false, largeImageUrl: '' });
  };

  render() {
    const { images, isLoading, error, showModal, largeImageUrl } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    return (
      <div>
        <ul className="ImageGallery">
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              openModal={this.openModal} // Передаем обработчик открытия модального окна в дочерний компонент
            />
          ))}
        </ul>
        <Button onClick={this.fetchImages} />
        {showModal && (
          <Modal largeImageURL={largeImageUrl} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
