/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {Container} from "./styles";

import { useAuth } from "../../hooks/useAuth";

export function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  
  const history = useHistory();
  
  const { 
    login, 
    clientMediaStream, 
    addClientMediaStream, 
    clientPeer, 
    addClientPeer 
  } = useAuth();

  useEffect(() => {
    if (clientMediaStream !== null) {
      clientMediaStream.getTracks().forEach(function(track) {
        track.stop();
      });

      addClientMediaStream(null);
    }

    if (clientPeer !== null) {
      clientPeer.disconnect();
      addClientPeer(null);
    }
    
  }, [clientMediaStream, clientPeer])

  function handleRoomIDInputChange(event) {
    setRoomId(event.currentTarget.value);
  }

  function handleNameInputChange(event) {
    setUsername(event.currentTarget.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (username !== "" && roomId !== "") {
      login(username);
      history.push(`/room/${roomId}`);
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="digite seu nome"
          value={username}
          onChange={handleNameInputChange}
        />
        <input
          type="text"
          placeholder="digite o código da sala"
          value={roomId}
          onChange={handleRoomIDInputChange}
        />
        <button type="submit">Entrar na sala</button>
      </form>
    </Container>
  );
}