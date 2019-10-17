import Chrome from '../src/editors/chrome';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Google Chrome', () => {
  let chrome: Chrome;
  let isDirectoryStub: any;

  beforeEach(() => {
    chrome = new Chrome();
    isDirectoryStub = sinon.stub(chrome, 'isDirectory');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = chrome.key;
    expect(result).to.equal('googlechrome');
  });
  it('should return the correct editor name', () => {
    const result = chrome.name;
    expect(result).to.equal('Google Chrome');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await chrome.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await chrome.isEditorInstalled();
    expect(result).to.be.false;
  });
});
