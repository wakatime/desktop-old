import Processing from '../src/editors/processing';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Processing', () => {
  let processing: Processing;
  let isDirectorySyncStub: any;

  beforeEach(() => {
    processing = new Processing();
    isDirectorySyncStub = sinon.stub(processing, 'isDirectorySync');
  });
  afterEach(() => {
    isDirectorySyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = processing.key;
    expect(result).to.equal('processing');
  });
  it('should return the correct editor name', () => {
    const result = processing.name;
    expect(result).to.equal('Processing');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await processing.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await processing.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await processing.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await processing.isPluginInstalled();
    expect(result).to.be.false;
  });
});
