import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding-right: 35px;

  .container_left {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
  }

  .container_right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 350px;

    h1 {
      color: var(--text);
      font-weight: 700;
      font-size: 28px;
      margin-bottom: 9px;
    }

    span {
      color: var(--text);
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 45px;
    }

    form {
      display: flex;
      flex-direction: column;
    
      input {
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 1px;
        background: #fff;
        padding: 13px 20px;
        border-radius: 0.5em;
        border: 2px solid #81899E;
        margin-bottom: 20px;
        font-family: 'Roboto', sans-serif;
      }
  
      button {
        font: 500 0.9rem 'Poppins', sans-serif;
        color: #fff;
        background: var(--button);
        cursor: pointer;
        text-align: center;
        border-radius: 0.5em;
        padding: 15px 40px;
        margin-top: 15px;
  
        transition: background 150ms ease-in-out;
  
        &:active {
          transform: scale(0.98);
        }
  
        &:hover {
          background: var(--button_hover);
        }
      }
    }
  }
`;