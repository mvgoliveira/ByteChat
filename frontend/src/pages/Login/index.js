import HumansChatBox from "../../illustrations/HumansChatBox.svg";
import SignTemplate from "../../components/SignTemplate";
import { Title, SubTitle ,UserInput , PassInput, Submit } from "../../components/SignTemplate.js";
import '../Login/style.css';

export function Login() {
  document.addEventListener("DOMContentLoaded", function(event) {
    document.documentElement.setAttribute("data-theme", "light");

  })
    
  return (
    <SignTemplate image={HumansChatBox}>
      <Title>Faça seu login</Title>
      <SubTitle>para criar e gerenciar reuniões</SubTitle>
        <UserInput placeholder="Email"></UserInput>
        <PassInput placeholder="Senha"></PassInput>
        <Submit>Login</Submit>
        <div className="divider2">
          <p className="divider"></p>
          <p className="text">Ou</p>
          <p className="divider"></p>
        </div>
        <div>            
          <p className="underline_text">Ainda não possui uma conta?<a className="register" href="#"> Cadastre-se!</a></p>
        </div>
    </SignTemplate>
  );
}

