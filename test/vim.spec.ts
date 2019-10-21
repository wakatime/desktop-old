import Vim from '../src/editors/vim';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Vim', () => {
  let vim: Vim;
  let isBinaryStub: any;

  beforeEach(() => {
    vim = new Vim();
    isBinaryStub = sinon.stub(vim, 'isBinary');
  });
  afterEach(() => {
    isBinaryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = vim.key;
    expect(result).to.equal('vim');
  });
  it('should return the correct editor name', () => {
    const result = vim.name;
    expect(result).to.equal('Vim');
  });
  it('should return the correct binary names', () => {
    const result = vim.binaries;
    expect(result).to.deep.equal(['vi', 'vim']);
  });
  it('should return TRUE if editor is installed', async () => {
    isBinaryStub.resolves(true);
    const result = await vim.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isBinaryStub.resolves(false);
    const result = await vim.isEditorInstalled();
    expect(result).to.be.false;
  });
});
