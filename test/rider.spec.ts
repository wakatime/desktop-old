import Rider from '../src/editors/rider';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Rider', () => {
  let rider: Rider;
  let isDirectorySyncStub: any;
  let isFileSyncStub: any;

  beforeEach(() => {
    rider = new Rider();
    isDirectorySyncStub = sinon.stub(rider, 'isDirectorySync');
    isFileSyncStub = sinon.stub(rider, 'isFileSync');
  });
  afterEach(() => {
    isDirectorySyncStub.restore();
    isFileSyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = rider.key;
    expect(result).to.equal('rider');
  });
  it('should return the correct editor name', () => {
    const result = rider.name;
    expect(result).to.equal('Rider');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectorySyncStub.resolves(true);
    const result = await rider.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await rider.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileSyncStub.returns(true);
    const result = await rider.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileSyncStub.returns(false);
    const result = await rider.isPluginInstalled();
    expect(result).to.be.false;
  });
});
