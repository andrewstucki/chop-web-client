// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openMenu } from '../sideMenu/dux';
import NavHeader from './navHeader';

const mapDispatchToProps = dispatch => bindActionCreators({ openMenu }, dispatch);

const VisibleNavHeader = connect(
  null,
  mapDispatchToProps
)(NavHeader);

export default VisibleNavHeader;
