// @flow
import Chat from './chat';
import { connect } from 'react-redux';
import { inputValue, updateInput, sendMessage } from './ducks';

const mapStateToProps = state => (
  {
    textValue: inputValue(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    textOnInput: value => dispatch(updateInput(value)),
    buttonOnClick: value => sendMessage(value),
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;