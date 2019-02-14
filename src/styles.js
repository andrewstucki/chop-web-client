import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body, html, p, input, button {
    font-family: "Helvetica Neue", Helvetica, "Arial Nova", Arial, sans-serif;
    font-size: 16px;
    line-height: 1.25;
  }

  body,html {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    webkit-overflow-scrolling: touch; /* momentum scrolling */
    touch-action: manipulation;
    overscroll-behavior: none;
    -ms-scroll-chaining: none;
  }
  
  strong {
    font-weight: bold;
  }
  
  a {
    text-decoration: none;
  }
  
  p {
    color: ${props => props.theme.colors.gray100};
    margin: 1rem 0;
  }
  
  hr {
    margin: 1rem 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.gray10};
  }
  
  ol, ul {
    margin-left: 1.5rem;
  }
  
  ol li {
    list-style-type: decimal;
  }
  
  ul li {
    list-style-type: disc;
  }
  
  a[href]:not([href='javascript:void(0)']) {
    color: #2993E5;
  }
`;

// Once we get into light/dark mode we will want to look into styled-themeing
// https://github.com/styled-components/styled-theming
const theme = {
  colors: {
    primary:    '#2993e5',
    disabled:   '#f5f5f3',
    background: '#ffffff',
    gray100:    '#404041',
    gray50:     '#9f9fa0',
    gray30:     '#C6C6C6',
    gray10:     '#ECECEC',
    dangerText: '#dd3131',
  },
};

export { GlobalStyle, theme };
