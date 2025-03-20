import { createGlobalStyle } from 'styled-components';


export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &:hover,
    &:focus {
      outline: none;
    }
  }

  html, body {
    height: 100%;
    scroll-behavior: smooth;
  }
`;
