import AppCode from '../src/editors/appcode';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('AppCode', () => {
  let appCode: AppCode;
  let isDirectoryStub: any;
  let isFileSyncStub: any;

  beforeEach(() => {
    appCode = new AppCode();
    isDirectoryStub = sinon.stub(appCode, 'isDirectory');
    isFileSyncStub = sinon.stub(appCode, 'isFileSync');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = appCode.key;
    expect(result).to.equal('appcode');
  });
  it('should return the correct editor name', () => {
    const result = appCode.name;
    expect(result).to.equal('AppCode');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await appCode.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileSyncStub.returns(true);
    const result = await appCode.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileSyncStub.returns(false);
    const result = await appCode.isPluginInstalled();
    expect(result).to.be.false;
  });
});
