import chai from 'chai';

import Libs from '../../src/utils/libs';

const { expect } = chai;

describe('utils libs', () => {
  it('should return error message if key has an invalid format', () => {
    const validation = Libs.validateKey('invalid');
    expect(validation).to.equal(
      'Api key invalid. Find your api key from wakatime.com/settings/api-key',
    );
  });
  it('should return "" if key has correct format', () => {
    const validation = Libs.validateKey('3766d456-bab3-4c63-8bf5-b439f3e43569');
    expect(validation).to.equal('');
  });
});
