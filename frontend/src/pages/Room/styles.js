import styled from "styled-components";

export const Container = styled.div`

  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #18202D;

  #copyRoomCodeButton {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 3;
    top: 7%;
    right: 5%;

    font: 500 0.9rem 'Poppins', sans-serif;
    padding: 9px 15px;
    border: 2px solid #5373F5;
    color: #5373F5;
    border-radius: 8px;
    
    :hover {
      border: 2px solid #4460d4;
      color: #4460d4;
    }

    :active {
      transform: scale(0.98);
    }

    svg {
      width: 21px;
      height: 21px;
      margin-right: 10px;
    }
  }

  .select-container {
    width: 250px;
  }
  
  .videos_group {
    flex-grow: 0.6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    
  }

  .controllers {
    display: flex;
    gap: 35px;
    
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #273547;
      color: #ffffff;
      border-radius: 8px;
      transition: background 250ms ease-in-out, transform 150ms ease;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 60px;
      height: 60px;

      :hover {
        background: #0053ba;
      }

      :active {
        transform: scale(0.95);
      }

      svg {
        width: 30px;
        height: 30px;
      }
    }

    #disconnect-button {
      background: #E5332A;
    }
  }

  #video_grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 85vw;
    max-height: 480px;
    overflow: auto;
    gap: 15px;

    &::-webkit-scrollbar {
      width: 10px;
      height: 50%;
      background: transparent;
    }

    &::-webkit-scrollbar-track {
      background: #000;
      border: 4px solid transparent;
      background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--divider);
      height: 10px;
    }

    .video_container {
      display: flex;
      flex-direction: column;
      border-radius: 10px;

      video {
        object-fit: cover;
        width: 350px;
        height: 220px;
        border-radius: 1rem;
        margin: 0.5rem;
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
      }
      
      span {
        position: relative;
        top: -22%;
        right: 30%;
        align-self: center;
        padding: 3px 15px;
        border-radius: 8px;
        background: rgba(0,0,0,0.2);
        color: #fbfbfb;
        margin-bottom: -30px;
      }

      article {
        z-index: 1;
        display: none;
        position: relative;
        top: 80%;
        right: -31%;
        align-self: center;
        background: rgba(255, 0, 35, 0.5);
        color: #fbfbfb;
        
        padding: 3px 15px;
        border-radius: 8px;
        margin-bottom: -25px;
      }
    }
  }

  @media (max-width: 700px) {
    video {
      height: auto;
      width: 100%;
    }
  }
`;