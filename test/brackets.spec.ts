import Brackets from '../src/editors/brackets';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Brackets', () => {
  let brackets: Brackets;
  let isDirectoryStub: any;

  beforeEach(() => {
    brackets = new Brackets();
    isDirectoryStub = sinon.stub(brackets, 'isDirectory');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = brackets.key;
    expect(result).to.equal('brackets');
  });
  it('should return the correct editor name', () => {
    const result = brackets.name;
    expect(result).to.equal('Brackets');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await brackets.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await brackets.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await brackets.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await brackets.isPluginInstalled();
    expect(result).to.be.false;
  });
});
