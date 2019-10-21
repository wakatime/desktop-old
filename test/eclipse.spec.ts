import Eclipse from '../src/editors/eclipse';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Eclipse', () => {
  let eclipse: Eclipse;
  let isDirectorySyncStub: any;

  beforeEach(() => {
    eclipse = new Eclipse();
    isDirectorySyncStub = sinon.stub(eclipse, 'isDirectorySync');
  });
  afterEach(() => {
    isDirectorySyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = eclipse.key;
    expect(result).to.equal('eclipse');
  });
  it('should return the correct editor name', () => {
    const result = eclipse.name;
    expect(result).to.equal('Eclipse');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await eclipse.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await eclipse.isEditorInstalled();
    expect(result).to.be.false;
  });
});
