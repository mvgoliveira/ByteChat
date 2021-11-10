import React from 'react';
import {MdNavigateNext, MdNavigateBefore, MdOutlineKeyboardAlt, MdVideocam} from 'react-icons/md';
import {FaMicrophoneSlash, FaVideo, FaVideoSlash} from "react-icons/fa"
import {TiMicrophone} from "react-icons/ti"
// import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import Select from "react-select";

import { Container } from './styles';
import HomePublicIllustration from '../../images/svg/HomePublic.svg';
import HomePrivateIllustration from '../../images/svg/HomePrivate.svg';
import { NameModal, VideoModal } from '../../Components/Modals';
import { useHome } from '../../hooks/useHome';

export function Home() {

  const {
    roomCode,
    isNameInputOpen,
    name,
    openVideoModal,
    handleInputNameChange,
    isVideoInputOpen,
    enterRoom,
    isVideoOpen,
    toggleVideo,
    isAudioOpen,
    toggleAudio,
    videoOptions,
    videoChangeSelected,
    handleSelectVideo,
    openNameModal,
    handleInputRoomCodeChange,
    isPublicIcon,
    handleSetIcon
  } = useHome();

  return (
    <Container isInputFill={roomCode !== "" ? true : false}>
      <NameModal id="" isOpen={isNameInputOpen} isInputFill={name !== "" ? true : false}>
        {/* <AiOutlineLoading3Quarters size={36} id="loading"/> */}
        <form className="buttonsContainer" onSubmit={openVideoModal}>
          <input
            id="nameInput"
            placeholder='Digite seu nome'
            onChange={handleInputNameChange}
            value={name}
            name="name"
            autoComplete="off"
          />
          <button type="submit"><MdNavigateNext size={36} color="#fff"/></button>
        </form>
      </NameModal>

      <VideoModal isOpen={isVideoInputOpen} name={name}>
        <div id="container-left">
          <div id="video-container">
            <span id="muted-element">Mudo</span>

            <video id="video-element"></video>
          </div>

          <form id="video-controllers" onSubmit={enterRoom}>
            <section id="section-left">
              { isVideoOpen
                ? <button type="button" onClick={toggleVideo}><FaVideo/></button>
                : <button type="button" onClick={toggleVideo}><FaVideoSlash/></button>
              }
              
              { isAudioOpen
                ? <button type="button" onClick={toggleAudio}><TiMicrophone/></button>
                : <button type="button" onClick={toggleAudio}><FaMicrophoneSlash/></button>
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

      <header>
        <div id="header-left">
          <h1> ByteChat </h1>
        </div>
        <div id="header-right">
          <button type="button">Fazer Login</button>
        </div>
      </header>

      <section>
        <div id="section-left">
          <h2> Simplicidade e facilidade </h2>
          <p> Matenha-se conectado com seus amigos e família com rapidez e segurança. </p>
          <button type="button"> <MdVideocam size={25}/> Criar uma reunião</button>
          
          <article>
            <form onSubmit={openNameModal}>
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