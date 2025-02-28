import { createGlobalStyle } from "styled-components";

// Global CSS reset and base styles
export const GlobalStyles = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Body and Root Element */
  html, body {
    height: 100%;
    font-size: 16px;
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    color: #212529;
    line-height: 1.5;
  }

  #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* Links */
  a {
    text-decoration: none !important;
    color: inherit !important;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  button:focus {
    outline: none;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
  }

 
  /* Variables */
  :root {
    --primary-color: #18a0fb;
    --secondary-color: #6c757d;
    --background-color: #FFFFFF;
    --app-white-color:  #FFFFFF;
    --text-color: #212529;
    --border-radius: 4px;
  }
`;
