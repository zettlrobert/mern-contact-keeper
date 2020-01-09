import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  // Init Hooks
  const text = useRef('')
  const contactContext = useContext(ContactContext);

  // Destructure and Pull from Context

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  })

  const onChange = e => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  }

  return (
    <form>
      <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
    </form>
  )
}

export default ContactFilter;