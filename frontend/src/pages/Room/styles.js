import styled from "styled-components";

export const Container = styled.div`

  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #141E2E;

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

  button {
    display: inline-block;
    border: none;
    border-radius: 8px;
    padding: 1rem 1.3rem;
    margin: 0;
    text-decoration: none;
    background: #273547;
    color: #ffffff;
    cursor: pointer;
    transition: background 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;

    svg {
      margin-top: 5px;
      width: 24px;
      height: 24px;
    }
  }

  button:hover,
  button:focus {
    background: #0053ba;
  }

  button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }

  button:active {
    transform: scale(0.99);
  }

  @media (max-width: 700px) {
    video {
      height: auto;
      width: 100%;
    }
  }
`;