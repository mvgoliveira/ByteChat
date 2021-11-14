import { createContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify';

import { api } from '../services/api';

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const [clientData, setClientData] = useState(null);
  const [clientUsername, setClientUsername] = useState("");
  const [clientMediaStream, setClientMediaStream] = useState(null);
  const [clientPeer, setClientPeer] = useState(null); 

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      try {
        const verify = jwt.verify(token, process.env.REACT_APP_TOKEN_SECRET);
        
        setClientData({
          id: verify.id,
          email: verify.email
        });
      } catch (error) {}
    }
  }, []);

  useEffect(() => {
    if (clientData) {
      setIsValidating(false);
    }
  }, [clientData]);

  function addClientPeer(peer) {
    setClientPeer(peer);
  }

  function addClientName(clientUsername) {
    setClientUsername(clientUsername);
    return;
  }

  function removeClientName() {
    setClientUsername("");
    return;
  }

  function addClientMediaStream(stream) {
    setClientMediaStream(stream);
  }

  async function login (email, password) {
    setIsValidating(true);
    let userData = null;
    
    try {
      const { data } = await api.post('/login', { email, password });
      
      Cookies.set('token', data.token, { expires: 60 });
      api.defaults.headers.Authorization = `Bearer ${data.token}`

      const verify = jwt.verify(data.token, process.env.REACT_APP_TOKEN_SECRET);

      userData = { 
        id: verify.id, 
        email,
      };

      setClientData(userData);

    } catch (error) {
      setError(true);  
      setIsValidating(false);
    }
 }

 function logout() {
    Cookies.remove('token');
    delete api.defaults.headers.Authorization
    setClientData(null);
    setError(false);
    setIsValidating(false);
  }

  async function register(email, password, confirmPassword) {
    try {
      setIsValidating(true);
      const { data } = await api.post('/users', { email, password, confirmPassword });

      if (data) {
        setIsRegistered(true);
      }

    } catch (error) {
      toast.error("Não foi possível realizar o cadastro!");
      setError(true);
      setIsValidating(false);
      setIsRegistered(false);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      clientUsername, 
      addClientName, 
      removeClientName, 
      clientMediaStream, 
      addClientMediaStream,
      clientPeer,
      addClientPeer,
      login,
      logout,
      isValidating,
      error,
      clientData,
      setError,
      setIsValidating,
      register,
      isRegistered
    }}>
      { props.children }
    </AuthContext.Provider>
  )
}