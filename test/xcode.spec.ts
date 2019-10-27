import Xcode from '../src/editors/xcode';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Xcode', () => {
  let xcode: Xcode;
  let isDirectoryStub: any;
  let isBinaryStub: any;

  beforeEach(() => {
    xcode = new Xcode();
    isDirectoryStub = sinon.stub(xcode, 'isDirectory');
    isBinaryStub = sinon.stub(xcode, 'isBinary');
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should return the correct key name', () => {
    const result = xcode.key;
    expect(result).to.equal('xcode');
  });
  it('should return the correct editor name', () => {
    const result = xcode.name;
    expect(result).to.equal('Xcode');
  });
  it('should return the correct binary names', () => {
    const result = xcode.binaries;
    expect(result).to.deep.equal(['xed']);
  });
  it('should return TRUE if editor is installed (isBinary)', async () => {
    isBinaryStub.resolves(true);
    const result = await xcode.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return TRUE if editor is installed', async () => {
    isBinaryStub.resolves(false);
    isDirectoryStub.resolves(true);
    const result = await xcode.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isBinaryStub.resolves(false);
    isDirectoryStub.resolves(false);
    const result = await xcode.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await xcode.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await xcode.isPluginInstalled();
    expect(result).to.be.false;
  });
});
