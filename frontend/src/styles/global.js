import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #FAFAFA;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    width: 100%;
  }

  body, input, button, textarea {
    font: 400 1rem 'Roboto', sans-serif;
  }
`;