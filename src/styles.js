// @flow
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
  
  label, div {
    color: ${props => props.theme.colors.gray100};
  }
  
  strong {
    font-weight: bold;
  }
  
  button, a {
    cursor: pointer;
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
  
  .public-DraftEditor-content {
    font-family: "Helvetica Neue", Helvetica, "Arial Nova", Arial, sans-serif;
    font-size: 16px;
    line-height: 1.25;
    max-height: 650px;
    overflow: auto;
}
  /* placing react-draftable styles here so we do not have to add a css-loader */
  .DraftEditor-editorContainer,.DraftEditor-root,.public-DraftEditor-content{height:inherit;text-align:initial}.public-DraftEditor-content[contenteditable=true]{-webkit-user-modify:read-write-plaintext-only}.DraftEditor-root{position:relative}.DraftEditor-editorContainer{background-color:rgba(255,255,255,0);border-left:.1px solid transparent;position:relative;z-index:1}.public-DraftEditor-block{position:relative}.DraftEditor-alignLeft .public-DraftStyleDefault-block{text-align:left}.DraftEditor-alignLeft .public-DraftEditorPlaceholder-root{left:0;text-align:left}.DraftEditor-alignCenter .public-DraftStyleDefault-block{text-align:center}.DraftEditor-alignCenter .public-DraftEditorPlaceholder-root{margin:0 auto;text-align:center;width:100%}.DraftEditor-alignRight .public-DraftStyleDefault-block{text-align:right}.DraftEditor-alignRight .public-DraftEditorPlaceholder-root{right:0;text-align:right}.public-DraftEditorPlaceholder-root{color:#9197a3;position:absolute;z-index:1}.public-DraftEditorPlaceholder-hasFocus{color:#bdc1c9}.DraftEditorPlaceholder-hidden{display:none}.public-DraftStyleDefault-block{position:relative;white-space:pre-wrap}.public-DraftStyleDefault-ltr{direction:ltr;text-align:left}.public-DraftStyleDefault-rtl{direction:rtl;text-align:right}.public-DraftStyleDefault-listLTR{direction:ltr}.public-DraftStyleDefault-listRTL{direction:rtl}.public-DraftStyleDefault-ol,.public-DraftStyleDefault-ul{margin:16px 0;padding:0}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR{margin-left:1.5em}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL{margin-right:1.5em}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR{margin-left:3em}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL{margin-right:3em}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR{margin-left:4.5em}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL{margin-right:4.5em}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR{margin-left:6em}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL{margin-right:6em}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR{margin-left:7.5em}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL{margin-right:7.5em}.public-DraftStyleDefault-unorderedListItem{list-style-type:square;position:relative}.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0{list-style-type:disc}.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1{list-style-type:circle}.public-DraftStyleDefault-orderedListItem{list-style-type:none;position:relative}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before{left:-36px;position:absolute;text-align:right;width:30px}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before{position:absolute;right:-36px;text-align:left;width:30px}.public-DraftStyleDefault-orderedListItem:before{content:counter(ol0) ". ";counter-increment:ol0}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before{content:counter(ol1,lower-alpha) ". ";counter-increment:ol1}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before{content:counter(ol2,lower-roman) ". ";counter-increment:ol2}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before{content:counter(ol3) ". ";counter-increment:ol3}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before{content:counter(ol4,lower-alpha) ". ";counter-increment:ol4}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset{counter-reset:ol0}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset{counter-reset:ol1}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset{counter-reset:ol2}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset{counter-reset:ol3}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset{counter-reset:ol4}.toolbar{display: flex;margin: 14px 0;}.toolbarGroup{display: flex;margin: 0 12px;}.toolbarGroup:first-of-type {margin-left: 0;}.toolbarGroup:last-of-type {margin-right: 0;}.toolbarButton {border: none;background: none;margin: 0 4px;padding: 0;}.toolbarButton:first-of-type {margin-left: 0;}
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
      black: '#000000',
      gray130: '#2D2D2E',
      gray100: '#404041',
      gray80: '#666667',
      gray50: '#9F9FA0',
      gray30: '#C6C6C6',
      gray15: '#E5E5E5',
      gray10: '#ECECEC',
      gray5: '#F6F6F6',
      white: '#FFFFFF',
    },
  },
};

type ThemeType = {|
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
  },
  shadows: {
    shadow1: string,
    shadow2: string,
    shadow3: string,
  },
|};

// Once we get into light/dark mode we will want to look into styled-themeing
// https://github.com/styled-components/styled-theming
const theme:ThemeType = {
  colors: {
    primary:    ionDesignValues.colors.brands.openNetwork,
    disabled:   ionDesignValues.colors.grayscale.gray5,
    background: ionDesignValues.colors.grayscale.white,
    textColor:  ionDesignValues.colors.grayscale.gray100,
    alternateTextColor: ionDesignValues.colors.grayscale.white,
    black:      ionDesignValues.colors.grayscale.black,
    white:      ionDesignValues.colors.grayscale.white,
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
  shadows: {
    shadow1: '0px 1px 3px rgba(45, 45, 46, 0.25)',
    shadow2: '0 2px 6px rgba(45, 45, 46, 0.25)',
    shadow3: '0px 8px 16px rgba(30, 31, 35, 0.25)',
  },
};

export { GlobalStyle, theme };
export type { ThemeType };
