import Notepadpp from '../src/editors/notepadpp';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Kate', () => {
  let notepadpp: Notepadpp;
  let isDirectoryStub: any;
  let isFileStub: any;

  beforeEach(() => {
    notepadpp = new Notepadpp();
    isDirectoryStub = sinon.stub(notepadpp, 'isDirectory');
    isFileStub = sinon.stub(notepadpp, 'isFile');
  });
  afterEach(() => {
    isDirectoryStub.restore();
    isFileStub.restore();
  });
  it('should return the correct key name', () => {
    const result = notepadpp.key;
    expect(result).to.equal('notepadpp');
  });
  it('should return the correct editor name', () => {
    const result = notepadpp.name;
    expect(result).to.equal('Notepadpp');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await notepadpp.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await notepadpp.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileStub.resolves(true);
    const result = await notepadpp.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileStub.resolves(false);
    const result = await notepadpp.isPluginInstalled();
    expect(result).to.be.false;
  });
});
