import Coda from '../src/editors/coda';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Coda', () => {
  let coda: Coda;
  let isDirectorySyncStub: any;
  let fileExistsSyncStub: any;

  beforeEach(() => {
    coda = new Coda();
    isDirectorySyncStub = sinon.stub(coda, 'isDirectorySync');
    fileExistsSyncStub = sinon.stub(coda, 'fileExistsSync');
  });
  afterEach(() => {
    isDirectorySyncStub.restore();
    fileExistsSyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = coda.key;
    expect(result).to.equal('coda');
  });
  it('should return the correct editor name', () => {
    const result = coda.name;
    expect(result).to.equal('Coda');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await coda.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await coda.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    fileExistsSyncStub.returns(true);
    const result = await coda.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    fileExistsSyncStub.returns(false);
    const result = await coda.isPluginInstalled();
    expect(result).to.be.false;
  });
});
