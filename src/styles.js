import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import color from 'color';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body, html, p, input, button, option {
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

const ionDesignValues = {
  colors: {
    brands: {
      lifeChurch: '#A6192E',
      openNetwork: '#2993E5',
      churchMetrics: '#4CB239',
      churchOnlinePlatform: '#FF9000',
      developDotMe: '#764AFF',
    },
    utilities: {
      actionBlue: '#009ECC',
      validGreen: '#09C1A1',
      warningYellow: '#FFBA0C',
      errorRed: '#E33300',
    },
    grayscale: {
      gray130: '#2D2D2E',
      gray100: '#404041',
      gray80: '#666667',
      gray50: '#9F9FA0',
      gray30: '#C6C6C6',
      gray10: '#ECECEC',
      gray5: '#F6F6F6',
      white: '#FFFFFF',
    },
  },
};

type ThemeType = {
  colors: {
    [string]: string,
  },
  buttons: {
    [string]: {
      default: string,
      hover: string,
      active: string,
      focusShadow: string,
      text: string,
      border?: string,
    }
  },
  animation: {
    easeIn: string,
    easeOut: string,
    easeInOut: string,
    duration: string,
  }
};

// Once we get into light/dark mode we will want to look into styled-themeing
// https://github.com/styled-components/styled-theming
const theme:ThemeType = {
  colors: {
    primary:    ionDesignValues.colors.brands.openNetwork,
    disabled:   ionDesignValues.colors.grayscale.gray5,
    background: ionDesignValues.colors.grayscale.white,
    textColor:  ionDesignValues.colors.grayscale.gray100,
    alternateTextColor: ionDesignValues.colors.grayscale.white,
    gray100:    ionDesignValues.colors.grayscale.gray100,
    gray50:     ionDesignValues.colors.grayscale.gray50,
    gray30:     ionDesignValues.colors.grayscale.gray30,
    gray10:     ionDesignValues.colors.grayscale.gray10,
    gray5:      ionDesignValues.colors.grayscale.gray5,
    dangerText: ionDesignValues.colors.utilities.errorRed,
    warningText: ionDesignValues.colors.utilities.warningYellow,
    validText: ionDesignValues.colors.utilities.validGreen,
  },
  buttons: {
    primary: {
      default:  ionDesignValues.colors.brands.openNetwork,
      hover:    color(ionDesignValues.colors.brands.openNetwork).lighten(0.1).hex(),
      active:   color(ionDesignValues.colors.brands.openNetwork).darken(0.1).hex(),
      focusShadow: `0px 0px 0px 1px ${ionDesignValues.colors.grayscale.white} inset`,
      text:     ionDesignValues.colors.grayscale.white,
    },
    secondary: {
      default:  ionDesignValues.colors.grayscale.white,
      hover:    ionDesignValues.colors.grayscale.white,
      active:   ionDesignValues.colors.grayscale.gray10,
      focusShadow: `0px 0px 0px 1px ${ionDesignValues.colors.grayscale.gray30} inset`,
      text:     ionDesignValues.colors.brands.openNetwork,
      border:   ionDesignValues.colors.grayscale.gray30,
    },
  },
  animation: {
    easeIn:     'cubic-bezier(0.6, 0, 0.8, 0.3)',
    easeOut:    'cubic-bezier(0.2, 0.7, 0.4, 1)',
    easeInOut:  'cubic-bezier(0.7, 0, 0.3, 1)',
    duration:   '300ms',
  },
};

export { GlobalStyle, theme };
export type { ThemeType };
