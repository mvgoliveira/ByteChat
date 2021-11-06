import styled from "styled-components";

export const Container = styled.div`

  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--main-dark);
  
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
    gap: 10px;
  }

  #video_grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .video_container {
      display: flex;
      flex-direction: column;

      video {
        object-fit: cover;
        height: 220px;
        border-radius: 1rem;
        margin: 0.5rem;
        width: 350px;
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
      }
      
      span {
        position: relative;
        z-index: 999;
        top: -19%;
        right: 30%;
        align-self: center;
        padding: 3px 15px;
        border-radius: 8px;
        background: rgba(0,0,0,0.2);
        color: #fbfbfb;
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