import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [username, setUsername] = useState("");
  const [clientMediaStream, setClientMediaStream] = useState(null);
  const [userPeer, setUserPeer] = useState(null); 
  const [cookies, setCookies] = useCookies(['username']);

  useEffect(() => {
    if (cookies.username !== undefined) {
      setUsername(cookies.username);
    }
  }, [cookies.username])

  function login(username) {
    setUsername(username);
    setCookies('username', username);
    return;
  }

  function logout() {
    setUsername("");
    setCookies('username', "");
    return;
  }

  function addClientMediaStream(stream) {
    setClientMediaStream(stream);
  }

  function addUserPeer(peer) {
    setUserPeer(peer);
  }

  return (
    <AuthContext.Provider value={{ 
      username, 
      login, 
      logout, 
      clientMediaStream, 
      addClientMediaStream, 
      userPeer, 
      addUserPeer 
    }}>
      { props.children }
    </AuthContext.Provider>
  )
}