/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {MdNavigateNext, MdNavigateBefore, MdOutlineKeyboardAlt, MdVideocam} from 'react-icons/md';

import { Container } from './styles';
import HomePublicIllustration from '../../images/svg/HomePublic.svg';
import HomePrivateIllustration from '../../images/svg/HomePrivate.svg';
import { useSettings } from '../../hooks/useSettings';
import { SettingsModal } from '../../Components/Modals';
import { useAuth } from '../../hooks/useAuth';

export function Home() {
  const [isPublicIcon, setIsPublicIcon] = useState(true);

  const {
    openSettingsModal,
    isSettingsModalOpen,
    setRoomCode,
    roomCode,
    setName
  } = useSettings();

  const {
    clientPeer,
    addClientPeer,
    removeClientName,
    login,
    logout
  } = useAuth();

  function handleSetIcon(IsPublic) {
    setIsPublicIcon(IsPublic);
  }

  function handleInputRoomCodeChange(event) {
    setRoomCode(event.target.value);
  }

  useEffect(() => {
    setRoomCode("");
    setName("");
    removeClientName();
  }, []);

  useEffect(() => {
    if (clientPeer) {
      clientPeer.disconnect();
      addClientPeer(null);
    }
  }, [clientPeer]);

  function handleLogin() {
    login("markusvi17@gmail.com", "23200007");
  }

  return (
    <Container isInputFill={roomCode !== "" ? true : false}>
      <SettingsModal isOpen={isSettingsModalOpen}>
      </SettingsModal>

      <header>
        <div id="header-left">
          <h1> ByteChat </h1>
        </div>
        <div id="header-right">
          <button type="button" onClick={handleLogin}>Fazer Login</button>
        </div>
      </header>

      <section>
        <div id="section-left">
          <h2> Simplicidade e facilidade </h2>
          <p> Matenha-se conectado com seus amigos e família com rapidez e segurança. </p>
          <button type="button"> <MdVideocam size={25}/> Criar uma reunião</button>
          
          <article>
            <form onSubmit={openSettingsModal}>
              <div id="input-container">
                <MdOutlineKeyboardAlt size={25} color={roomCode !== "" ? "#284DE2" : "#81899E" }/>
                <input 
                  id="roomInput"
                  name="room code"
                  placeholder='Digite o código da sala'
                  onChange={handleInputRoomCodeChange}
                  value={roomCode}
                  autoComplete="off"
                />
              </div>
              <button type="submit">Participar</button>
            </form>
          </article>
        </div>

        <div id="section-right">
          <article id="section-right-top">
            <MdNavigateBefore size={36} color={isPublicIcon ? "#A6B5F0" : "#284DE2" } onClick={() => handleSetIcon(true)}/>
            { isPublicIcon 
              ? <img src={HomePublicIllustration} alt="Home Public Illustration"/>
              : <img src={HomePrivateIllustration} alt="Home Private Illustration"/>
            }
            <MdNavigateNext size={36} color={isPublicIcon ? "#284DE2" : "#A6B5F0" } onClick={() => handleSetIcon(false)}/>
          </article>
          
          <article id="section-right-bottom">
            { isPublicIcon
              ? 
                <>
                  <h3>Crie Reuniões Públicas</h3>
                  <p>Crie reuniões e compartilhe um link sem se preocupar.</p>
                </>
              : 
                <>
                  <h3>Crie Reuniões Privadas</h3>
                  <p>Crie reuniões e selecione quem poderá participar.</p>
                </>
            }
          </article>
        </div>
      </section>
    </Container>
  );
}