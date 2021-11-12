import { createContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

import { api } from '../services/api';

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(false);

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

  const login = async (email, password) => {
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
      clientData
    }}>
      { props.children }
    </AuthContext.Provider>
  )
}