import CLion from '../src/editors/clion';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('CLion', () => {
  let cLion: CLion;
  let isDirectorySyncStub: any;
  let isFileSyncStub: any;

  beforeEach(() => {
    cLion = new CLion();
    isDirectorySyncStub = sinon.stub(cLion, 'isDirectorySync');
    isFileSyncStub = sinon.stub(cLion, 'isFileSync');
  });
  afterEach(() => {
    isDirectorySyncStub.restore();
    isFileSyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = cLion.key;
    expect(result).to.equal('clion');
  });
  it('should return the correct editor name', () => {
    const result = cLion.name;
    expect(result).to.equal('CLion');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await cLion.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await cLion.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileSyncStub.returns(true);
    const result = await cLion.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileSyncStub.returns(false);
    const result = await cLion.isPluginInstalled();
    expect(result).to.be.false;
  });
});
