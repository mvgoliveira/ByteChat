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
  }

  body, input, button, textarea {
    font: 400 1rem 'Roboto', sans-serif;
  }

  body::-webkit-scrollbar {
    width: 10px;
    height: 50%;
    background: #FAFAFA;
  }

  body::-webkit-scrollbar-track {
    background: #000;
    border: 4px solid transparent;
    background-clip: content-box;
  }

  body::-webkit-scrollbar-thumb {
    background: var(--divider);
    height: 10px;
    
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