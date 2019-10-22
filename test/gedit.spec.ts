import Gedit from '../src/editors/gedit';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Gedit', () => {
  let gedit: Gedit;
  let isDirectoryStub: any;
  let brewListStub: any;

  beforeEach(() => {
    gedit = new Gedit();
    isDirectoryStub = sinon.stub(gedit, 'isDirectory');
    brewListStub = sinon.stub(gedit, 'brewList');
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should return the correct key name', () => {
    const result = gedit.key;
    expect(result).to.equal('gedit');
  });
  it('should return the correct editor name', () => {
    const result = gedit.name;
    expect(result).to.equal('Gedit');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await gedit.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return TRUE if editor is installed (Homebrew)', async () => {
    isDirectoryStub.resolves(false);
    brewListStub.resolves('bla bla gedit bla bla');
    const result = await gedit.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    brewListStub.resolves('');
    const result = await gedit.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await gedit.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await gedit.isPluginInstalled();
    expect(result).to.be.false;
  });
});
