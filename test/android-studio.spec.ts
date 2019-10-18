import AndroidStudio from '../src/editors/android-studio';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Android Studio', () => {
  let androidStudio: AndroidStudio;
  let fileExistsSyncStub: any;
  let pluginsDirectoryStub: any;
  let isDirectorySyncStub: any;
  let isBinaryStub: any;

  beforeEach(() => {
    androidStudio = new AndroidStudio();
    fileExistsSyncStub = sinon.stub(androidStudio, 'fileExistsSync');
    pluginsDirectoryStub = sinon.stub(androidStudio, 'pluginsDirectory');
    isDirectorySyncStub = sinon.stub(androidStudio, 'isDirectorySync');
    isBinaryStub = sinon.stub(androidStudio, 'isBinary');
  });
  afterEach(() => {
    fileExistsSyncStub.restore();
    pluginsDirectoryStub.restore();
    isDirectorySyncStub.restore();
    isBinaryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = androidStudio.key;
    expect(result).to.equal('androidstudio');
  });
  it('should return the correct editor name', () => {
    const result = androidStudio.name;
    expect(result).to.equal('Android Studio');
  });
  it('should return the correct binary name', () => {
    const result = androidStudio.binary;
    expect(result).to.equal('editor');
  });
  it('should return TRUE if editor is installed', async () => {
    isBinaryStub.resolves(true);
    isDirectorySyncStub.returns(true);
    const result = await androidStudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return TRUE if editor is installed by directory', async () => {
    isBinaryStub.resolves(false);
    isDirectorySyncStub.returns(true);
    const result = await androidStudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isBinaryStub.resolves(false);
    isDirectorySyncStub.returns(false);
    const result = await androidStudio.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    fileExistsSyncStub.returns(true);
    pluginsDirectoryStub.returns('');
    const result = await androidStudio.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    fileExistsSyncStub.returns(false);
    pluginsDirectoryStub.returns('');
    const result = await androidStudio.isPluginInstalled();
    expect(result).to.be.false;
  });
});
