import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // Empty Brackets -> only run when Component loads
    // eslint-disable-next-line
  }, [])

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
        {/* Contact Form */}
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home;