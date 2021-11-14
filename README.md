# 💻🐺 ByteChat

ByteChat é uma aplicação Web de vídeo chamada desenvolvida como metodo de avaliação e treinamento no processo trainee do RAMO IEE do CEFET/RJ.
 
 ---

### :man_technologist: Sobre a aplicação

O Case escolhido foi **Aplicação web do tipo plataforma de vídeo chamada** onde deveria ser desenvolvido uma aplicação estilo Discord, Zoom, teams e meet...

A aplicação conta com um sistema de autenticação, criação de salas públicas e privadas, controle de acesso de usuários a salas privadas, e compartilhamento de vídeo e audio.

Este projeto usa as seguintes tecnologias:

- [React](https://reactjs.org)
- [WebRTC](https://webrtc.org)
- [JWT](https://jwt.io)
- [Bcrypt](https://github.com/dcodeIO/bcrypt.js#readme)

**Hospedagem**: Para acessar o site hospeadado no netlify **[clique aqui](https://github.com/mvgoliveira/ByteChat)** [ainda não hospedado].

---

### :desktop_computer: Páginas da aplicação
<div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 8px">
 <img style="min-width: 300px;" src="" width="400px"/>
</div>

---

### 📁 Instalação

```bash
  #  clone o repositório
  git clone https://github.com/mvgoliveira/ByteChat

  #  navegue até o repositório clonado
  cd LetMeAsk-web
  
  #  navegue até as pastas específicas
  cd frontend
  cd backend

  #  baixe as dependências
  yarn [dentro de cada página específica]
 
  #  divirta-se!
  yarn start [no frontend]
  yarn dev [no backend]
```

É necessário adicionar as variáveis ambientes REACT_APP_TOKEN_SECRET [no frontend], MONGO_URL e TOKEN_SECRET [no backend].
as variáveis TOKEN_SECRET são usados pelo jwt para assinar e verificar os tokens de autenticação e a variável MONGO_URL é usado pelo mongoose para efetuar a conexão com o mongodb.

<hr>

Feito com :hearts: por **grupo 7**.
