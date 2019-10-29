import WebStorm from '../src/editors/webstorm';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('WebStorm', () => {
  let webStorm: WebStorm;
  let isDirectoryStub: any;
  let isFileSyncStub: any;

  beforeEach(() => {
    webStorm = new WebStorm();
    isDirectoryStub = sinon.stub(webStorm, 'isDirectory');
    isFileSyncStub = sinon.stub(webStorm, 'isFileSync');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = webStorm.key;
    expect(result).to.equal('webstorm');
  });
  it('should return the correct editor name', () => {
    const result = webStorm.name;
    expect(result).to.equal('WebStorm');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await webStorm.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await webStorm.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileSyncStub.returns(true);
    const result = await webStorm.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileSyncStub.returns(false);
    const result = await webStorm.isPluginInstalled();
    expect(result).to.be.false;
  });
});
