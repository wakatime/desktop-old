import Komodo from '../src/editors/komodo';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Komodo', () => {
  let komodo: Komodo;
  let isDirectoryStub: any;

  beforeEach(() => {
    komodo = new Komodo();
    isDirectoryStub = sinon.stub(komodo, 'isDirectory');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = komodo.key;
    expect(result).to.equal('komodo');
  });
  it('should return the correct editor name', () => {
    const result = komodo.name;
    expect(result).to.equal('Komodo');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await komodo.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await komodo.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await komodo.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await komodo.isPluginInstalled();
    expect(result).to.be.false;
  });
});
