import MonoDevelop from '../src/editors/monodevelop';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('MonoDevelop', () => {
  let monoDevelop: MonoDevelop;
  let isDirectoryStub: any;

  beforeEach(() => {
    monoDevelop = new MonoDevelop();
    isDirectoryStub = sinon.stub(monoDevelop, 'isDirectory');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = monoDevelop.key;
    expect(result).to.equal('monodevelop');
  });
  it('should return the correct editor name', () => {
    const result = monoDevelop.name;
    expect(result).to.equal('MonoDevelop');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await monoDevelop.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await monoDevelop.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await monoDevelop.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await monoDevelop.isPluginInstalled();
    expect(result).to.be.false;
  });
});
