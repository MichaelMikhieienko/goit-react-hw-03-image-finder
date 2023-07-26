import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
// import getImage from '../../api';

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '35106771-5ec042213d922cbd410dda217';
const getImage = async params => {
  const url = new URL(baseUrl);

  url.searchParams.append('key', apiKey);

  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  return response.json();
};

class ImageGallery extends Component {
  perPage = 12;

  state = {
    isLoading: false,
    images: [],
    error: null,
    showModal: false, // Добавим состояние для открытия/закрытия модального окна
    largeImageUrl: '', // Добавим состояние для хранения URL большого изображения
    page: 1,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ images: [], error: null }, () => this.fetchImages());
    }
  }

  fetchImages = () => {
    const { searchQuery } = this.props;

    this.setState({ isLoading: true, page: 1 }, () => {
      const { page } = this.state;

      getImage({ q: searchQuery, page, per_page: this.perPage })
        .then(data =>
          this.setState({ images: data.hits, total: data.totalHits })
        )
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    });
  };

  loadMoreHandleClick = () => {
    this.setState(
      prev => ({ ...prev, page: prev.page + 1 }),
      () => {
        const { page } = this.state;
        const { searchQuery } = this.props;

        getImage({ q: searchQuery, page, per_page: this.perPage })
          .then(data =>
            this.setState(prevState => ({
              ...prevState,
              images: [...prevState.images, ...data.hits],
              total: prevState.total + data.hits.length,
            }))
          )
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ isLoading: false }));
      }
    );
  };

  // Обработчик открытия модального окна
  openModal = largeImageUrl => {
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
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              openModal={this.openModal} // Передаем обработчик открытия модального окна в дочерний компонент
            />
          ))}
        </ul>
        {images.length > 0 && <Button onClick={this.loadMoreHandleClick} />}
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
