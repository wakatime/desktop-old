import TextMate from '../src/editors/textmate';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('TextMate', () => {
  let textMate: TextMate;
  let isDirectoryStub: any;

  beforeEach(() => {
    textMate = new TextMate();
    isDirectoryStub = sinon.stub(textMate, 'isDirectory');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = textMate.key;
    expect(result).to.equal('textmate');
  });
  it('should return the correct editor name', () => {
    const result = textMate.name;
    expect(result).to.equal('TextMate');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await textMate.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await textMate.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await textMate.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await textMate.isPluginInstalled();
    expect(result).to.be.false;
  });
});
