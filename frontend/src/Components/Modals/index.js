import { useEffect, useState } from "react";
import { Container, NameModalContainer, VideoModalContainer } from "./styles";

export function NameModal({isOpen, isInputFill, children}) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <Container isOpen={isModalOpen}>
      <NameModalContainer isInputFill={isInputFill}>
        <span> Como você quer ser chamado? </span>
        <div>
          {children}
        </div>
      </NameModalContainer>
    </Container>
  )
}

export function VideoModal({ isOpen, name, children }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <Container isOpen={isModalOpen}>
      <VideoModalContainer>
        <span> Olá, {name} </span>
        <div id="controllers">
          {children}
        </div>
      </VideoModalContainer>
    </Container>
  )
}