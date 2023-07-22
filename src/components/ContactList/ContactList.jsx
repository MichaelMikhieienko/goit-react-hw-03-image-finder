// ContactList.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';

class ContactList extends Component {
  render() {
    const { contacts, deleteContact } = this.props;

    return (
      <div>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} deleteContact={deleteContact} />
        ))}
      </div>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;