// @flow
import { getTranslateLanguage } from '../../../src/selectors/channelSelectors';

describe('getTranslateLanguage', () => {
  test('returns only the language if region is included', () => {
    expect(getTranslateLanguage({ currentLanguage: 'en-US' })).toEqual('en');
  });

  test('returns only the language if region is not included', () => {
    expect(getTranslateLanguage({ currentLanguage: 'en' })).toEqual('en');
  });

  test('returns ISO-639-2 language', () => {
    expect(getTranslateLanguage({ currentLanguage: 'haw' })).toEqual('haw');
  });

  test('returns language and region for Chinese', () => {
    expect(getTranslateLanguage({ currentLanguage: 'zh-CN' })).toEqual('zh-CN');
  });
});
