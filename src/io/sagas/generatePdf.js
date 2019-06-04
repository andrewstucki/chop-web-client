// @flow
import type { Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import queries from '../queries';
import { type GeneratePdfType } from '../../eventNotes/dux';
import bugsnagClient from '../../util/bugsnag';
import { errorNotificationBanner } from '../../banner/dux';
import { isMobileDevice } from '../../util';

function* generatePdf (action: GeneratePdfType): Saga<void> {
  try {
    const result = yield call([queries, queries.generatePdf], action.html);
    if (result.generatePdf) {
      openPDF(result.generatePdf);
    } else {
      yield put(errorNotificationBanner('generate_pdf_error'));
      bugsnagClient.notify(new Error('Server returned false for generatePdf.'));
    }
  } catch (error) {
    yield put(errorNotificationBanner('generate_pdf_error'));
    bugsnagClient.notify(error);
  }
}


function openPDF (url: string) {
  // Just triggering window.open does not work on mobile devices, so we have to fake a user interactions
  if (isMobileDevice()) {
    // Create link in memory
    const anchor = window.document.createElement('a');
    anchor.target = '_blank';
    anchor.href = url;

    // Dispatch fake event
    anchor.dispatchEvent(new MouseEvent('click'));
  } else {
    window.open(url);
  }
}

export {
  generatePdf,
};
