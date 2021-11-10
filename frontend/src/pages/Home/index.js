import React, { useState } from 'react';
import {MdNavigateNext, MdNavigateBefore, MdOutlineKeyboardAlt, MdVideocam} from 'react-icons/md';
import { Container } from './styles';
import HomePublicIllustration from '../../images/svg/HomePublic.svg';
import HomePrivateIllustration from '../../images/svg/HomePrivate.svg';

export function Home() {
  const [publicIcon, setPublicIcon] = useState(true);
  const [inputText, setInputText] = useState("");

  function handleSetIcon(IsPublic) {
    setPublicIcon(IsPublic);
  }

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  function enterRoom(event) {
    event.preventDefault();
    if (inputText !== "") {
      console.log(inputText);
      setInputText("");
    }
  }

  return (
    <Container isInputFill={inputText !== "" ? true : false}>
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
            <form onSubmit={enterRoom}>
              <div id="input-container">
                <MdOutlineKeyboardAlt size={25} color={inputText !== "" ? "#284DE2" : "#81899E" }/>
                <input placeholder='Digite o código da sala' onChange={handleInputChange} value={inputText}/>
              </div>
              <button type="submit">Participar</button>
            </form>
          </article>
        </div>

        <div id="section-right">
          <article id="section-right-top">
            <MdNavigateBefore size={36} color={publicIcon ? "#A6B5F0" : "#284DE2" } onClick={() => handleSetIcon(true)}/>
            { publicIcon 
              ? <img src={HomePublicIllustration} alt="Home Public Illustration"/>
              : <img src={HomePrivateIllustration} alt="Home Private Illustration"/>
            }
            <MdNavigateNext size={36} color={publicIcon ? "#284DE2" : "#A6B5F0" } onClick={() => handleSetIcon(false)}/>
          </article>
          
          <article id="section-right-bottom">
            <h3>Crie Reuniões Públicas</h3>
            <p>Crie reuniões e compartilhe um link sem se preocupar.</p>
          </article>
        </div>
      </section>
    </Container>
  );
}