import React, { useState } from 'react'

const Login = () => {
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
    console.log('Login Submit');

  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>

        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Login;