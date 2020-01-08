import React, { useReducer } from 'react';
//Generate Random Ids to work with before ID
import uuid from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types'

const ContactState = props => {
  const initalState = {
    contacts: [
      {
        "id": 1,
        "name": "Delete Me",
        "email": "del@gmail.com",
        "phone": "222-222-222-2222",
        "type": "personal"
      },
      {
        "id": 2,
        "name": "Adrian Mes",
        "email": "mes@gmail.com",
        "phone": "666-666-666-66666",
        "type": "personal",
      },
      {
        "id": 3,
        "name": "Hanna Smith",
        "email": "smith@gmail.com",
        "phone": "111-111-1111",
        "type": "professional",
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initalState)

  // Actions CRUD

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}>
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState