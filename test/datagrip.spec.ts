import DataGrip from '../src/editors/datagrip';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('DataGrip', () => {
  let dataGrip: DataGrip;
  let isDirectorySyncStub: any;
  let isFileSyncStub: any;

  beforeEach(() => {
    dataGrip = new DataGrip();
    isDirectorySyncStub = sinon.stub(dataGrip, 'isDirectorySync');
    isFileSyncStub = sinon.stub(dataGrip, 'isFileSync');
  });
  afterEach(() => {
    isDirectorySyncStub.restore();
    isFileSyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = dataGrip.key;
    expect(result).to.equal('datagrip');
  });
  it('should return the correct editor name', () => {
    const result = dataGrip.name;
    expect(result).to.equal('DataGrip');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await dataGrip.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await dataGrip.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return FALSE if plugin is installed', async () => {
    isFileSyncStub.returns(true);
    const result = await dataGrip.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileSyncStub.returns(false);
    const result = await dataGrip.isPluginInstalled();
    expect(result).to.be.false;
  });
});
