# 💻🐺 ByteChat

ByteChat é uma aplicação Web de vídeo chamada desenvolvida como metodo de avaliação e treinamento no processo trainee do RAMO IEEE do CEFET/RJ.
 
 ---

### :man_technologist: Sobre a aplicação

O Case escolhido foi **Aplicação web do tipo plataforma de vídeo chamada** onde deveria ser desenvolvido uma aplicação estilo Discord, Zoom, teams e meet...

A aplicação conta com um sistema de autenticação, criação de salas públicas e privadas, controle de acesso de usuários a salas privadas, e compartilhamento de vídeo e audio.

Este projeto usa as seguintes tecnologias:

- [React](https://reactjs.org)
- [WebRTC](https://webrtc.org)
- [JWT](https://jwt.io)
- [Bcrypt](https://github.com/dcodeIO/bcrypt.js#readme)

---

### :desktop_computer: Páginas da aplicação
<div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 8px">
 <img style="min-width: 500px;" src="https://user-images.githubusercontent.com/53785487/141688159-50efc533-80af-438b-8fe6-073da58b4093.png" width="400px"/>
 <img style="min-width: 500px;" src="https://user-images.githubusercontent.com/53785487/141688179-1a9b9fef-1860-404c-8f34-fe25a921dba0.png" width="400px"/>
 <img style="min-width: 500px;" src="https://user-images.githubusercontent.com/53785487/141688227-b993fabb-8392-448b-b44c-b00085eaa9e0.png" width="400px"/>
 <img style="min-width: 500px;" src="https://user-images.githubusercontent.com/53785487/141688299-185b455e-00e9-4f20-b689-383a30f49e60.png" width="400px"/>
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
