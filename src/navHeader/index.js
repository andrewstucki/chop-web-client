// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openMenu } from '../sideMenu/dux';
import NavHeader from './navHeader';

const mapStateToProps = state => ({ logoUrl: state.feed.organization.logoUrl });
const mapDispatchToProps = dispatch => bindActionCreators({ openMenu }, dispatch);

const VisibleNavHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavHeader);

export default VisibleNavHeader;
