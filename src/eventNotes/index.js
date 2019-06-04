//@flow
import EventNotes from './eventNotes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { generatePdf } from './dux';
import { updateEventNotes } from '../event/dux';


const mapStateToProps = state => {
  const { eventNotes } = state.event;
  return {
    eventNotes,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  generatePdf,
  updateEventNotes,
}, dispatch);

const VisibleEventNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventNotes);

export default VisibleEventNotes;
