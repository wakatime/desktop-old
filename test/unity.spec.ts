import Unity from '../src/editors/unity';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Unity', () => {
  let unity: Unity;
  let isDirectoryStub: any;

  beforeEach(() => {
    unity = new Unity();
    isDirectoryStub = sinon.stub(unity, 'isDirectory');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = unity.key;
    expect(result).to.equal('unity');
  });
  it('should return the correct editor name', () => {
    const result = unity.name;
    expect(result).to.equal('Unity');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await unity.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await unity.isEditorInstalled();
    expect(result).to.be.false;
  });
});
