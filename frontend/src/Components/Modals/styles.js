import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } 

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  
  width: 100%;
  height: 100%;
  padding: 15px;
  background: rgba(0,0,0,0.6);
  
  display: ${props => props.isOpen ? "flex" : "none"};
  align-items: center;
  justify-content: center;
`;

export const NameModalContainer = styled.div`
  width: 660px;
  height: 380px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  span {
    font: bold 1.6rem 'Poppins', sans-serif;
    margin-bottom: 30px;
  }

  .buttonsContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    #name-next-button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${props => props.isInputFill ? "#284de2" : "#81899E"};
      width: 50px;
      height: 50px;
      border-radius: 8px;
      cursor: ${props => props.isInputFill ? "pointer" : "not-allowed"};
    }

    input {
      padding: 10px 35px;
      text-align: center;
      border: 1px;
      background: transparent;
      border: 2px solid #81899E;
      border-radius: 8px;
    }

    #loading {
      animation: ${rotate} 1s ease-in-out infinite;
    }
  }
`;

export const VideoModalContainer = styled.div`
  width: 740px;
  height: 420px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 8px;
  padding: 50px;

  span {
    font: bold 1.8rem 'Poppins', sans-serif;
    margin-bottom: 15px;
  }

  #controllers {
    display: flex;
    width: 100%;

    #container-left {
      #video-container {
        display: flex;
        flex-direction: column;
        height: 220px;
        width: 350px;
        background: #212c3b;
        border-radius: 1rem;

        video {
          object-fit: cover;
          border-radius: 1rem;
          height: 220px;
          width: 350px;
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
          -moz-transform: rotateY(180deg);
        }

        #muted-element {
          z-index: 1;
          display: none;
          position: relative;
          top: 80%;
          right: -35%;
          font: 500 0.9rem 'Poppins', sans-serif;
          align-self: center;
          background: rgba(255, 0, 1, 0.5);
          color: #fbfbfb;
          
          padding: 3px 15px;
          border-radius: 8px;
          margin-bottom: -27px;
        }
      }

      #video-controllers {
        display: flex;
        margin-top: 20px;
        height: 55px;
        
        #section-left {
          display: flex;
          gap: 15px; 
          flex: 1;

          button {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            text-decoration: none;
            background: #273547;
            color: #ffffff;
            cursor: pointer;
            width: 55px;
            height: 55px;

            svg {
              width: 24px;
              height: 24px;
            }
          }
        }

        #section-right {
          flex: 1;
          display: flex;
          justify-content: end;

          button {
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #284de2;
            width: 55px;
            height: 55px;
            border-radius: 8px;
          }
        }
      }
    }

    #container-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 15px;

      p {
        font: 500 1.2rem 'Poppins', sans-serif;
        margin-bottom: 15px;
      }
    }
  }
`;