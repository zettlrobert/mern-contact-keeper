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
        "type": "personal"
      },
      {
        "id": 3,
        "name": "Hanna Smith",
        "email": "smith@gmail.com",
        "phone": "111-111-1111",
        "type": "professional"
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initalState)

  // Actions CRUD

  // Add Contact
  const addContact = contact => {
    contact.id = uuid.v4(); //randomID 

    dispatch({ type: ADD_CONTACT, payload: contact })
  }


  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }


  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }


  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }


  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  }


  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }


  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter

      }}>
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState