// @flow
export const EVENT_NOTES = 'EVENT_NOTES';
export const GENERATE_PDF = 'GENERATE_PDF';

export type GeneratePdfType = {
  type: typeof GENERATE_PDF,
  html: string,
};

export const generatePdf = (html: string):GeneratePdfType => (
  {
    type: GENERATE_PDF,
    html,
  }
);
