// @flow
import { connect } from 'react-redux';

import {
  toggleLanguageSelector,
} from './dux';

import LanguageSelector from './languageSelector';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    currentLanguage: feedState.currentLanguage,
  };
};

const mapDispatchToProps = dispatch => (
  {
    toggleLanguageSelector: () => (dispatch(toggleLanguageSelector())),
  }
);

const VisibleLanguageSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelector);

export default VisibleLanguageSelector;
