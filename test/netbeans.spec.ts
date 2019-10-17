import Netbeans from '../src/editors/netbeans';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Netbeans', () => {
  let netbeans: Netbeans;
  let isDirectoryStub: any;
  let isFileSyncStub: any;

  beforeEach(() => {
    netbeans = new Netbeans();
    isDirectoryStub = sinon.stub(netbeans, 'isDirectory');
    isFileSyncStub = sinon.stub(netbeans, 'isFileSync');
  });
  afterEach(() => {
    isDirectoryStub.restore();
    isFileSyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = netbeans.key;
    expect(result).to.equal('netbeans');
  });
  it('should return the correct editor name', () => {
    const result = netbeans.name;
    expect(result).to.equal('Netbeans');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await netbeans.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await netbeans.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileSyncStub.returns(true);
    const result = await netbeans.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileSyncStub.returns(false);
    const result = await netbeans.isPluginInstalled();
    expect(result).to.be.false;
  });
});
