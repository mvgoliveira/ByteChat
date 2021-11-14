/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {FaMicrophoneSlash, FaVideo, FaVideoSlash} from "react-icons/fa";
import {IoClose} from "react-icons/io5";
import {MdNavigateNext} from 'react-icons/md';
import {TiMicrophone} from "react-icons/ti"
import Select from "react-select";

import publicIllustration from "../../images/svg/Public.svg";
import privateIllustration from "../../images/svg/Private.svg";

import { 
  Container, 
  NameModalContainer,
  VideoModalContainer,
  RoomTypeContainer,
  RoomSettingsContainer 
} from "./styles";

import { useSettings } from '../../hooks/useSettings';
import { useAuth } from "../../hooks/useAuth";

function NameModal({isOpen, isInputFill, children}) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const {
    setIsSettingsModalOpen
  } = useSettings();

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <Container isOpen={isModalOpen}>
      <NameModalContainer isInputFill={isInputFill}>
        <IoClose id="closeModalButton" onClick={() => setIsSettingsModalOpen(false)}/>
        <span> Como você quer ser chamado? </span>
        <div>
          {children}
        </div>
      </NameModalContainer>
    </Container>
  )
}

function VideoModal({ isOpen, name, children }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const { 
    clientMediaStream
  } = useAuth();

  return (
    <Container isOpen={isModalOpen}>
      <VideoModalContainer isVideoOpen={clientMediaStream ? true : false}>
        <span> Olá, {name} </span>
        <div id="controllers">
          {children}
        </div>
      </VideoModalContainer>
    </Container>
  )
}

export function SettingsModal() {
  const history = useHistory();

  const {
    isSettingsModalOpen,
  } = useSettings();

  const [isNameModalOpen, setIsNameModalOpen] = useState(isSettingsModalOpen);
  const [isVideoInputOpen, setIsVideoInputOpen] = useState(false);

  const {
    roomCode,
    name,
    handleInputNameChange,
    isClientVideoOpen,
    toggleClientVideo,
    isClientAudioOpen,
    toggleClientAudio,
    videoOptions,
    videoChangeSelected,
    handleSelectVideo,
    setIsSettingsModalOpen,
    setIsComplete
  } = useSettings();

  const { 
    addClientName,
    clientMediaStream, 
    addClientMediaStream
  } = useAuth();

  useEffect(() => {
    setIsNameModalOpen(isSettingsModalOpen);
  }, [isSettingsModalOpen]);

  function openVideoModal(event) {
    event.preventDefault();
    if (name !== "") {
      setIsNameModalOpen(false);
      setIsVideoInputOpen(true);
    }
  }

  useEffect(() => {
    handleSelectVideo("");

    if (clientMediaStream) {
      clientMediaStream.getTracks().forEach(track => {
        track.stop();
      });
      addClientMediaStream(null);
    }
  }, []);

  function enterRoom(event) {
    event.preventDefault();
    if (name !== "" && clientMediaStream) {
      setIsVideoInputOpen(false);
      setIsSettingsModalOpen(false);
      addClientName(name);
      setIsComplete(true);
      history.push(`/room/${roomCode}`);
    }
  }

  return (
    <>
      <NameModal id="" isOpen={isNameModalOpen} isInputFill={name !== "" ? true : false}>
        <form className="buttonsContainer" onSubmit={openVideoModal}>
          <input
            id="nameInput"
            placeholder='Digite seu nome'
            onChange={handleInputNameChange}
            value={name}
            name="name"
            autoComplete="off"
          />
          <button type="submit" id="name-next-button"><MdNavigateNext size={36} color="#fff"/></button>
        </form>
      </NameModal>

      <VideoModal isOpen={isVideoInputOpen} name={name} >
        <div id="container-left">
          <div id="video-container">
            <span id="muted-element">Mudo</span>

            <video id="video-element"></video>
          </div>

          <form id="video-controllers" onSubmit={enterRoom}>
            <section id="section-left">
              { isClientVideoOpen
                ? <button type="button" onClick={toggleClientVideo}><FaVideo/></button>
                : <button type="button" onClick={toggleClientVideo}><FaVideoSlash/></button>
              }
              
              { isClientAudioOpen
                ? <button type="button" onClick={toggleClientAudio}><TiMicrophone/></button>
                : <button type="button" onClick={toggleClientAudio}><FaMicrophoneSlash/></button>
              }
            </section>

            <section id="section-right">
              <button type="submit"><MdNavigateNext size={36} color="#fff"/></button>
            </section>
          </form>
        </div>

        <div id="container-right">
          <p> Câmera </p>
          <Select 
            options={videoOptions} 
            value={videoChangeSelected} 
            onChange={handleSelectVideo}
            placeholder="Selecione sua câmera"
          />
        </div>
      </VideoModal>
    </>
  )
}

export function RoomTypeModal() {
  const {isRoomTypeModalOpen, setIsRoomTypeModalOpen} = useSettings();

  const {
    handleCreateRoom
  } = useSettings();

  function handleSendCreateRoom(isPrivate) {
    setIsRoomTypeModalOpen(false);
    handleCreateRoom(isPrivate);
  }

  return (
    <Container isOpen={isRoomTypeModalOpen}>
      <RoomTypeContainer>
        <span>Escolha o tipo de sala <IoClose onClick={() => setIsRoomTypeModalOpen(!isRoomTypeModalOpen)}/></span>
        
        <div id="containerBottom">
          <section id="containerLeft">
            <img src={publicIllustration} alt="public illustration"></img>
            <button type="button" onClick={() => handleSendCreateRoom(false)}> Sala Pública </button>
          </section>
          
          <section id="containerRight">
            <img src={privateIllustration} alt="public illustration"></img>
            <button type="button" onClick={() => handleSendCreateRoom(true)}> Sala privada </button>
          </section>
        </div>
      </RoomTypeContainer>
    </Container>
  );
}

export function RoomSettingsModal({ isOpen, children }) {
  const [isRoomSettingsModalOpen, setIsRoomSettingsModalOpen] = useState(isOpen);
  
  useEffect(() => {
    setIsRoomSettingsModalOpen(isOpen);
  }, [isOpen]);
  
  return (
    <Container isOpen={isRoomSettingsModalOpen}>
      <RoomSettingsContainer>
        {children}
      </RoomSettingsContainer>
    </Container>
  );
}