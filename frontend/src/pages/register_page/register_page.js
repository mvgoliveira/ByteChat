import WolfChatBox from "illustrations/WolfChatBox.svg";
import 'pages/styles.css';
import Global_header from "styles/globalheader";

function register_page() {
  return (
    <body>
      <Global_header/>
      <div className="login_page">
      <style>@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap');</style>
        <div className="login_image">
          <img src={WolfChatBox}></img>
        </div>
        <div className="login_view">
          <div className="login_container">
            <p className="title">Faça seu Cadastro</p>
            <p className="subtitle">para criar e gerenciar reuniões</p>
              <input className="un " type="text" align="center" placeholder="Email"></input>
              <input className="pass" type="password" align="center" placeholder="Senha"></input>
              <input className="pass" type="password" align="center" placeholder="Confirme sua senha"></input>
              <a class="submit">Cadastar-se</a>      
          </div>  
        </div>   
    </div>
    </body>
  
  );
}

export default register_page;
