import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends React.Component {
  state = {
    filter: '',
  };

  handleSubmit = (searchQuery) => {
    this.setState({ filter: searchQuery });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchQuery={this.state.filter} />
      </div>
    );
  }
}

export default App;
