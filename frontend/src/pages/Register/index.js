import WolfChatBox from "../../illustrations/WolfChatBox.svg";
import { Container } from './styles';

export function Register() {
  return (
    <Container>
      <div className="container_left">
        <img src={WolfChatBox} alt="Chat Box"></img>
      </div>
      
      <div className="container_right">
        <h1> Faça seu Cadastro </h1>
        <span> para criar e gerenciar reuniões </span>
        <input type="text" placeholder="Digite seu email"/>
        <input type="password" placeholder="Digite sua senha"/>
        <input type="password" placeholder="Confirme sua senha"/>
        <button type="button"> Cadastar-se </button>
      </div>
    </Container>
  );
}

