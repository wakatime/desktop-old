import SublimeText2 from '../src/editors/sublime-text-2';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Sublime Text 2', () => {
  let sublimeText2: SublimeText2;
  let isDirectorySyncStub: any;

  beforeEach(() => {
    sublimeText2 = new SublimeText2();
    isDirectorySyncStub = sinon.stub(sublimeText2, 'isDirectorySync');
  });
  afterEach(() => {
    isDirectorySyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = sublimeText2.key;
    expect(result).to.equal('sublimetext2');
  });
  it('should return the correct editor name', () => {
    const result = sublimeText2.name;
    expect(result).to.equal('Sublime Text 2');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await sublimeText2.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await sublimeText2.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await sublimeText2.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await sublimeText2.isPluginInstalled();
    expect(result).to.be.false;
  });
});
