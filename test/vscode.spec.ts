import VsCode from '../src/editors/vscode';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Visual Studio Code', () => {
  let vscode: VsCode;
  let listExtensionsStub: any;
  let isDirectorySyncStub: any;
  let isBinaryStub: any;

  beforeEach(() => {
    vscode = new VsCode();
    listExtensionsStub = sinon.stub(vscode, 'listExtensions');
    isDirectorySyncStub = sinon.stub(vscode, 'isDirectorySync');
    isBinaryStub = sinon.stub(vscode, 'isBinary');
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should return the correct key name', () => {
    const result = vscode.key;
    expect(result).to.equal('visualstudiocode');
  });
  it('should return the correct editor name', () => {
    const result = vscode.name;
    expect(result).to.equal('Visual Studio Code');
  });
  it('should return the correct binary names', () => {
    const result = vscode.binaries;
    expect(result).to.deep.equal(['code']);
  });
  it('should return TRUE if editor is installed (isBinary)', async () => {
    isBinaryStub.resolves(true);
    const result = await vscode.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return TRUE if editor is installed', async () => {
    isBinaryStub.resolves(false);
    isDirectorySyncStub.returns(true);
    const result = await vscode.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isBinaryStub.resolves(false);
    isDirectorySyncStub.returns(false);
    const result = await vscode.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    listExtensionsStub.resolves(true);
    const result = await vscode.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    listExtensionsStub.resolves(false);
    const result = await vscode.isPluginInstalled();
    expect(result).to.be.false;
  });
});
