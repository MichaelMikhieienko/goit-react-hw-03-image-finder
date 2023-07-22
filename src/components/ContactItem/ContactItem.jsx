// ContactItem.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactItem extends Component {
  handleDelete = () => {
    const { contact, deleteContact } = this.props;
    deleteContact(contact.id);
  };

  render() {
    const { contact } = this.props;

    return (
      <div>
        {contact.name} - {contact.number}
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactItem;