// @flow
import { connect } from 'react-redux';
import VideoHeader from './videoHeader';

const mapStateToProps = state => {
  const { title, description, endTime } = state.feed.event;

  return {
    title,
    description,
    endTime: endTime * 1000,
  };
};

const VisibleVideoHeader = connect(
  mapStateToProps
)(VideoHeader);

export default VisibleVideoHeader;
