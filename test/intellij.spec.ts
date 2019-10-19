import IntelliJ from '../src/editors/intellij';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('IntelliJ', () => {
  let intelliJ: IntelliJ;
  let isDirectorySyncStub: any;
  let isFileSyncStub: any;

  beforeEach(() => {
    intelliJ = new IntelliJ();
    isDirectorySyncStub = sinon.stub(intelliJ, 'isDirectorySync');
    isFileSyncStub = sinon.stub(intelliJ, 'isFileSync');
  });
  afterEach(() => {
    isDirectorySyncStub.restore();
    isFileSyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = intelliJ.key;
    expect(result).to.equal('intellijidea');
  });
  it('should return the correct editor name', () => {
    const result = intelliJ.name;
    expect(result).to.equal('IntelliJ IDEA');
  });
  it('should return the correct binary names', () => {
    const result = intelliJ.binaries;
    expect(result).to.deep.equal(['intellij']);
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await intelliJ.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await intelliJ.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileSyncStub.returns(true);
    const result = await intelliJ.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileSyncStub.returns(false);
    const result = await intelliJ.isPluginInstalled();
    expect(result).to.be.false;
  });
});
