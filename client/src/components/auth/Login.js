import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';


const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);


  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;


  useEffect(() => {
    if (isAuthenticated) {
      //Redirect if Authenticated
      props.history.push('/');
    }

    //Ckeck error text //Create id if Applicaiton gets bigger
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // es-lint-disable-next-line
  }, [error, isAuthenticated, props.history]);


  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  // Destructure to use Variables from User Object
  const { email, password } = user;

  // Get Current Value (user object), with name and target value for name to enter Input into State
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })


  const onSubmit = e => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please find all Fields', 'danger');
    } else {
      login({
        email,
        password
      })
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Login;