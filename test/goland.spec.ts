import GoLand from '../src/editors/goland';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('GoLand', () => {
  let goLand: GoLand;
  let isDirectoryStub: any;
  let isFileSyncStub: any;

  beforeEach(() => {
    goLand = new GoLand();
    isDirectoryStub = sinon.stub(goLand, 'isDirectory');
    isFileSyncStub = sinon.stub(goLand, 'isFileSync');
  });
  afterEach(() => {
    isDirectoryStub.restore();
    isFileSyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = goLand.key;
    expect(result).to.equal('goland');
  });
  it('should return the correct editor name', () => {
    const result = goLand.name;
    expect(result).to.equal('GoLand');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await goLand.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await goLand.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileSyncStub.returns(true);
    const result = await goLand.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileSyncStub.returns(false);
    const result = await goLand.isPluginInstalled();
    expect(result).to.be.false;
  });
});
