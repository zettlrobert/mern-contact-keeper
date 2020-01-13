import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from './../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_CURRENT
} from '../types'


const AuthState = props => {
  const initalState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initalState)


  // Load User
  const loadUser = async () => {

    // Token in default Header --> Special File
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      //request to check token
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }

  }


  // Register User
  const register = async (formData) => {
    // We send Data we need Content Type Header -- axios needs config Object
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      // Takes in URL api/users proxy in packagejson
      const res = await axios.post('/api/users', formData, config);

      //Api Users is hit.
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })

      // Get User
      loadUser();

    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })

    }
  }



  // Login User
  const login = async (formData) => {
    // We send Data we need Content Type Header -- axios needs config Object
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      // Takes in URL api/users proxy in packagejson
      const res = await axios.post('/api/auth', formData, config);

      //Api Users is hit.
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      // Get User
      loadUser();

    } catch (err) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: err.response.data.msg
      })

    }
  }



  // Logout User
  const logout = () => dispatch({ type: LOGOUT })


  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    })
  }


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors

      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState