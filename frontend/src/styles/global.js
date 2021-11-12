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

  :root {
    --background: #FAFAFA;
    --text: #222C3B;
    --button: #284DE2;
    --button_hover: #2544c2;
    --button_theme:#222C3B;
    --divider: #acb3c2;
  }
`;