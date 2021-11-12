/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import HumansChatBox from "../../illustrations/HumansChatBox.svg";
import {Container} from './styles';
import {useHistory} from 'react-router';
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const {
    login,
    clientData,
    isValidating,
    error,
    setError,
    setIsValidating
  } = useAuth();

  useEffect(() => {
    setError(false);
    setIsValidating(false);
  }, []);

  useEffect(() => {
    if (clientData) {
      history.replace('/');
    }
  }, [clientData]);
  
  function handleChangeEmail(event) {
    setEmail(event.target.value)
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setEmail("");
    setPassword("");
    login(email, password);
  }

  return (
    <Container isValidating={isValidating} error={error}>
      <div className="container_left">
        <img src={HumansChatBox} alt="Chat Box"></img>
      </div>
      
      <div className="container_right">
        <h1> Faça seu login </h1>
        <span> para criar e gerenciar reuniões </span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Digite seu email" onChange={handleChangeEmail} value={email}/>
          <input type="password" placeholder="Digite sua senha" onChange={handleChangePassword} value={password}/>
          { error && <p> *Email ou senha incorretos </p> }
          
          <button type="submit"> Login </button>
        </form>

        <section className="divider_container">
          <article className="divider"></article>
          <p>ou</p>
          <article className="divider"></article>
        </section>

        <p className="underline_text">
          Ainda não possui uma conta?
          <button onClick={() => history.push('/register')}> Cadastre-se! </button>
        </p>
      </div>
    </Container>
  );
}

