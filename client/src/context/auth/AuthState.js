import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

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
  const loadUser = () => {
    console.log('Load User');
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

    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })

    }
  }

  // Login User
  const login = () => {
    console.log('Login User');
  }

  // Logout User
  const logout = () => {
    console.log('Load User');
  }


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