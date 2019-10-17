import Kate from '../src/editors/kate';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Kate', () => {
  let kate: Kate;
  let isDirectoryStub: any;
  let isFileStub: any;

  beforeEach(() => {
    kate = new Kate();
    isDirectoryStub = sinon.stub(kate, 'isDirectory');
    isFileStub = sinon.stub(kate, 'isFile');
  });
  afterEach(() => {
    isDirectoryStub.restore();
    isFileStub.restore();
  });
  it('should return the correct key name', () => {
    const result = kate.key;
    expect(result).to.equal('kate');
  });
  it('should return the correct editor name', () => {
    const result = kate.name;
    expect(result).to.equal('Kate');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await kate.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await kate.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileStub.resolves(true);
    const result = await kate.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileStub.resolves(false);
    const result = await kate.isPluginInstalled();
    expect(result).to.be.false;
  });
});
