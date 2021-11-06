import WolfChatBox from "../../illustrations/WolfChatBox.svg";
import SignTemplate from "../../components/SignTemplate.js";
import { Title, SubTitle ,UserInput , PassInput, Submit } from "../../components/SignTemplate.js";
import '../Register/style.css';

export function Register() {
  return (
    <body>
      <SignTemplate image={WolfChatBox}>
          <Title>Faça seu Cadastro</Title>
          <SubTitle>para criar e gerenciar reuniões</SubTitle>
            <UserInput placeholder="Email"></UserInput>
            <PassInput placeholder="Senha"></PassInput>
            <PassInput placeholder="Confirme sua senha"></PassInput>
            <Submit>Cadastar-se</Submit>
      </SignTemplate>
    </body>
  );
}

