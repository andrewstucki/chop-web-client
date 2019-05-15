// @flow
import { getTranslateLanguage } from '../../../src/selectors/channelSelectors';

describe('getTranslateLanguage', () => {
  test('returns only the language if region is included', () => {
    expect(getTranslateLanguage({ feed: { currentLanguage: 'en-US' }})).toEqual('en');
  });

  test('returns only the language if region is not included', () => {
    expect(getTranslateLanguage({ feed: { currentLanguage: 'en' }})).toEqual('en');
  });

  test('returns ISO-639-2 language', () => {
    expect(getTranslateLanguage({ feed: { currentLanguage: 'haw' }})).toEqual('haw');
  });

  test('returns language and region for Chinese', () => {
    expect(getTranslateLanguage({ feed: { currentLanguage: 'zh-CN' }})).toEqual('zh-CN');
  });
});
