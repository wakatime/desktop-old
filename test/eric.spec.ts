import Eric from '../src/editors/eric';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Eric', () => {
  let eric: Eric;
  let pipListStub: any;
  let isPipInstalledStub: any;
  let fileExistsSyncStub: any;

  beforeEach(() => {
    eric = new Eric();
    pipListStub = sinon.stub(eric, 'pipList');
    isPipInstalledStub = sinon.stub(eric, 'isPipInstalled');
    fileExistsSyncStub = sinon.stub(eric, 'fileExistsSync');
  });
  afterEach(() => {
    pipListStub.restore();
    isPipInstalledStub.restore();
    fileExistsSyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = eric.key;
    expect(result).to.equal('eric');
  });
  it('should return the correct editor name', () => {
    const result = eric.name;
    expect(result).to.equal('Eric');
  });
  it('should return TRUE if editor is installed', async () => {
    isPipInstalledStub.resolves(true);
    pipListStub.resolves('bla bla eric-ide bla bla');
    const result = await eric.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isPipInstalledStub.resolves(true);
    pipListStub.resolves('');
    const result = await eric.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    fileExistsSyncStub.returns(true);
    const result = await eric.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    fileExistsSyncStub.returns(false);
    const result = await eric.isPluginInstalled();
    expect(result).to.be.false;
  });
});
