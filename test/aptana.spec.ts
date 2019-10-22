import Aptana from '../src/editors/aptana';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Aptana Studio', () => {
  let aptana: Aptana;
  let isDirectoryStub: any;

  beforeEach(() => {
    aptana = new Aptana();
    isDirectoryStub = sinon.stub(aptana, 'isDirectory');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = aptana.key;
    expect(result).to.equal('aptana');
  });
  it('should return the correct editor name', () => {
    const result = aptana.name;
    expect(result).to.equal('Aptana');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await aptana.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await aptana.isEditorInstalled();
    expect(result).to.be.false;
  });
  //   it('should return TRUE if plugin is installed', async () => {
  //     isDirectoryStub.returns(true);
  //     pluginsDirectoryStub.returns('');
  //     const result = await aptana.isPluginInstalled();
  //     expect(result).to.be.true;
  //   });
  //   it('should return FALSE if plugin is not installed', async () => {
  //     isDirectoryStub.returns(false);
  //     pluginsDirectoryStub.returns('');
  //     const result = await aptana.isPluginInstalled();
  //     expect(result).to.be.false;
  //   });
});
