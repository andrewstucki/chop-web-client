// @flow
import queries from '../../../src/io/queries';
import { generatePdf as generatePdfSaga } from '../../../src/io/saga';
import { generatePdf as generatePdfAction } from '../../../src/eventNotes/dux';
import { runSaga } from 'redux-saga';
import { errorBanner } from '../../../src/banner/dux';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Generate PDF', () => {
  const mockGeneratePdf = mock(queries.generatePdf);
  global.MouseEvent = jest.fn();

  test('Generate PDF success', async () => {
    const dispatched = [];
    await runSaga({
      dispatch: action => dispatched.push(action),
    }, generatePdfSaga,
    generatePdfAction('<h1>Event Notes</h1><p>Here are my notes.</p>')).toPromise();

    expect(mockGeneratePdf).toBeCalledWith('<h1>Event Notes</h1><p>Here are my notes.</p>');
  });

  test('Generate PDF failure', async () => {
    const dispatched = [];
    mockGeneratePdf.mockImplementation(() => {
      throw new Error('Broken');
    });

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, generatePdfSaga,
    generatePdfAction('<h1>Event Notes</h1><p>Here are my notes.</p>')).toPromise();

    expect(mockGeneratePdf).toBeCalledWith('<h1>Event Notes</h1><p>Here are my notes.</p>');
    expect(dispatched).toEqual([
      errorBanner('generate_pdf_error'),
    ]);
  });
});
