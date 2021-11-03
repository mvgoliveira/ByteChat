import Global_header from "styles/globalheader";
import HumansChatBox from "illustrations/HumansChatBox.svg";
import 'pages/styles.css';

function login_page() {
  return (
    <body>
      <Global_header/>
      <div className="login_page">
        <style>@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap');</style>
          <div className="login_image">
            <img src={HumansChatBox}></img>
          </div>
          <div className="login_view">
            <div className="login_container">
              <p className="title">Faça seu login</p>
              <p className="subtitle">para criar e gerenciar reuniões</p>
                <input className="un " type="text" align="center" placeholder="Email"></input>
                <input className="pass" type="password" align="center" placeholder="Senha"></input>
                <a class="submit">Login</a>
                <div className="divider2">
                  <p className="divider"></p>
                  <p className="text">Ou</p>
                  <p className="divider"></p>
                </div>
                <div>            
                  <p className="underline_text">Ainda não possui uma conta?<a className="register" href="#"> Cadastre-se!</a></p>
                </div>        
            </div>  
          </div>   
      </div>
    </body>
  
  );
}

export default login_page;
