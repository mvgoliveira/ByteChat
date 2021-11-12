import { useEffect, useState } from "react";
import {useHistory} from 'react-router';

import { useAuth } from "../../hooks/useAuth";

import WolfChatBox from "../../illustrations/WolfChatBox.svg";
import { Container } from './styles';

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const {
    register,
    clientData,
    isValidating,
    error,
    isRegistred,
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

  useEffect(() => {
    
    if (isRegistred) {
      history.push('/login');  
    }

  }, [isRegistred]);
  
  function handleChangeEmail(event) {
    setEmail(event.target.value)
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleChangeConfirmPassword(event) {
    setConfirmPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    register(email, password, confirmPassword);
  }

  return (
    <Container>
      <div className="container_left">
        <img src={WolfChatBox} alt="Chat Box"></img>
      </div>
      
      <div className="container_right">
        <h1> Faça seu Cadastro </h1>
        <span> para criar e gerenciar reuniões </span>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChangeEmail} value={email} placeholder="Digite seu email"/>
          <input type="password" onChange={handleChangePassword} value={password} placeholder="Digite sua senha"/>
          <input type="password" onChange={handleChangeConfirmPassword} value={confirmPassword} placeholder="Confirme sua senha"/>
          <button type="submit"> Cadastar-se </button>
        </form>
      </div>
    </Container>
  );
}

