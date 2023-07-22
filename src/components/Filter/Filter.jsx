// Filter.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { filter, handleFilterChange } = this.props;

    return (
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;