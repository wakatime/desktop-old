import TeXstudio from '../src/editors/texstudio';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('TeXstudio', () => {
  let textstudio: TeXstudio;
  let isDirectoryStub: any;
  let findMacroFileStub: any;

  beforeEach(() => {
    textstudio = new TeXstudio();
    isDirectoryStub = sinon.stub(textstudio, 'isDirectory');
    findMacroFileStub = sinon.stub(textstudio, 'findMacroFile');
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should return the correct key name', () => {
    const result = textstudio.key;
    expect(result).to.equal('texstudio');
  });
  it('should return the correct editor name', () => {
    const result = textstudio.name;
    expect(result).to.equal('TeXstudio');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await textstudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await textstudio.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    findMacroFileStub.returns('Macro_0.txsMacro');
    const result = await textstudio.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    findMacroFileStub.returns('');
    const result = await textstudio.isPluginInstalled();
    expect(result).to.be.false;
  });
});
