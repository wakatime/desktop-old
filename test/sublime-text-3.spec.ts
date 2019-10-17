import SublimeText3 from '../src/editors/sublime-text-3';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Sublime Text 3', () => {
  let sublimeText3: SublimeText3;
  let isEditorInstalledStub: any;
  let isDirectoryStub: any;

  beforeEach(() => {
    sublimeText3 = new SublimeText3();
    isEditorInstalledStub = sinon.stub(sublimeText3, 'isEditorInstalled');
    isDirectoryStub = sinon.stub(sublimeText3, 'isDirectory');
  });
  afterEach(() => {
    isEditorInstalledStub.restore();
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = sublimeText3.key;
    expect(result).to.equal('sublimetext3');
  });
  it('should return the correct editor name', () => {
    const result = sublimeText3.name;
    expect(result).to.equal('Sublime Text 3');
  });
  it('should return TRUE if editor is installed', async () => {
    isEditorInstalledStub.resolves(true);
    const result = await sublimeText3.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await sublimeText3.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isEditorInstalledStub.resolves(false);
    const result = await sublimeText3.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await sublimeText3.isPluginInstalled();
    expect(result).to.be.false;
  });
});
