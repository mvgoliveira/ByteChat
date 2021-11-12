import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 150px;

  .container_left {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
  }

  .container_right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 350px;
    
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
        border: ${props => props.error ? "2px solid #E5332A" : "2px solid #81899E"};
        margin-bottom: 20px;
        font-family: 'Roboto', sans-serif;

        &:focus {
          outline: ${props => props.error ? "1px solid #c92820" : ""};
        }
      }

      p {
        color: #E5332A;
        font: 500 0.9rem 'Poppins', sans-serif;
      }

      > button {
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
  }

  .divider_container {
    display: inline-flex;
    margin-top: 35px;
    margin-bottom: 40px;
    align-items: center;
    justify-content: space-between;
  
    article {
      border-top: 2px solid var(--divider);
      border-radius: 5px;
      width: 40%;
    }

    p {
      color: var(--divider);
      font-weight: 500;
    }
  }

  .underline_text {
    display: flex;
    color: var(--text);
    justify-content: center;
    align-content: center;
    text-align: center;
    font-weight: 500;
    font-size: 16px;

    button {
      width: 92px;
      text-decoration: none;
      text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
      color: var(--button);
      margin-left: 5px;
      font-weight: 500;
      font-size: 16px;

      :hover {
        color: var(--button_hover);
      }
    }
  }
`;