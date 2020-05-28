import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs';
import os from 'os';
import path from 'path';

import Options from '../../src/utils/options';

const { expect } = chai;
const options = new Options();
chai.use(chaiAsPromised);

const internals = {
  apiKey: '3766d456-bab3-4c63-8bf5-b439f3e43569',
};
describe.only('utils options', () => {
  beforeEach(async () => {
    const configFile = path.join(os.tmpdir(), '.wakatime.cfg');
    fs.writeFileSync(configFile, '');
    options.setConfigFile(configFile);
    await options.setSettingAsync('settings', 'api_key', internals.apiKey);
  });
  it('should get the correct apiKey from the config file', async () => {
    const apikey = await options.getApiKeyAsync();
    expect(apikey).to.equal(internals.apiKey);
  });
  it('should set and get debug correctly', async () => {
    await options.setSettingAsync('settings', 'debug', 'true');
    const debug = await options.getSettingAsync('settings', 'debug');
    expect(debug).to.equal('true');
  });
});
