//@flow
import { connect } from 'react-redux';
import { removeTab } from './dux';
import Tab from './tab';

const mapStateToProps = (state, ownProps) => {
  const { type } = ownProps;
  return {
    type,
  };
};

const mapDispatchToProps = dispatch => (
  {
    removeTab: type => dispatch(removeTab(type)),
  }
);

const VisibleTab = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab);

export default VisibleTab;
