import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  
  :root {
    --backgroundGrey: #F7F7FC;
    --darkBlue: #6E7191;
    --black: #14142B;
    --lightGrey: #EFF0F6;
    --btnColor: #4E4B66;
    --purple: #624AF2;
  }
  
  * {
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  
  html, body {
    height: 100%;
  }
  
  body {
    background: var(--backgroundGrey);
    color: var(--black);
  }

  button {
    padding: 10px 20px;
    background: var(--lightGrey);
    outline: 0;
    border-radius: 12px;
    font-size: 24px;
    border: none;
    color: var(--btnColor);
    cursor: pointer;
    
    &:hover {
      background: var(--purple);
      color: white;
    }
  }
  
  .container {
    width: 100%;
    max-width: 1680px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  main {
    padding: 2rem 0;
  }
  
  .center {
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

export const PageTitle = styled.h2` && {
  font-size: 36px;
  line-height: 34px;
  letter-spacing: 1px;
  color: #14142B;
}`

export default GlobalStyles;
