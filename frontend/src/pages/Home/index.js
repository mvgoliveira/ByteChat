import React from 'react';
import { Container } from './styles';
import HomePublicIllustration from '../../images/svg/HomePublic.svg';

export function Home() {
  return (
    <Container>
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
          <button type="button">Criar uma reunião</button>
          
          <article>
            <input placeholder='Digite o código da sala' />
            <button type="button">Participar</button>
          </article>
        </div>

        <div id="section-right">
          <article id="section-right-top">
            <img src={HomePublicIllustration} alt="Home Public Illustration"/>
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