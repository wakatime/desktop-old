import Atom from '../src/editors/atom';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Atom', () => {
  let atom: Atom;
  let isEditorInstalledStub: any;
  let isDirectoryStub: any;
  let apmStub: any;

  beforeEach(() => {
    atom = new Atom();
    isEditorInstalledStub = sinon.stub(atom, 'isEditorInstalled');
    isDirectoryStub = sinon.stub(atom, 'isDirectory');
    apmStub = sinon.stub(atom, 'apm');
  });
  afterEach(() => {
    isEditorInstalledStub.restore();
    isDirectoryStub.restore();
    apmStub.restore();
  });
  it('should return the correct key name', () => {
    const result = atom.key;
    expect(result).to.equal('atom');
  });
  it('should return the correct editor name', () => {
    const result = atom.name;
    expect(result).to.equal('Atom');
  });
  it('should return the correct binary names', () => {
    const result = atom.binaries;
    expect(result).to.deep.equal(['atom']);
  });
  it('should return TRUE if editor is installed', async () => {
    isEditorInstalledStub.resolves(true);
    const result = await atom.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isEditorInstalledStub.resolves(false);
    const result = await atom.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed when directory return TRUE', async () => {
    isDirectoryStub.resolves(true);
    const result = await atom.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return TRUE if plugin is installed when apm return TRUE', async () => {
    isDirectoryStub.resolves(false);
    apmStub.resolves(true);
    const result = await atom.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed when directory and apm return FALSE', async () => {
    isDirectoryStub.resolves(false);
    apmStub.resolves(false);
    const result = await atom.isPluginInstalled();
    expect(result).to.be.false;
  });
});
