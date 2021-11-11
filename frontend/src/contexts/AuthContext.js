import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [clientUsername, setClientUsername] = useState("");
  const [clientMediaStream, setClientMediaStream] = useState(null);
  const [cookies, setCookies] = useCookies(['clientUsername']);
  const [clientPeer, setClientPeer] = useState(null); 

  function addClientPeer(peer) {
    setClientPeer(peer);
  }

  useEffect(() => {
    if (cookies.clientUsername !== undefined) {
      setClientUsername(cookies.clientUsername);
    }
  }, [cookies.clientUsername])

  function addClientName(clientUsername) {
    setClientUsername(clientUsername);
    setCookies('clientUsername', clientUsername);
    return;
  }

  function removeClientName() {
    setClientUsername("");
    setCookies('clientUsername', "");
    return;
  }

  function addClientMediaStream(stream) {
    setClientMediaStream(stream);
  }

  return (
    <AuthContext.Provider value={{ 
      clientUsername, 
      addClientName, 
      removeClientName, 
      clientMediaStream, 
      addClientMediaStream,
      clientPeer,
      addClientPeer
    }}>
      { props.children }
    </AuthContext.Provider>
  )
}