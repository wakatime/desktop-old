import Xamarin from '../src/editors/xamarin';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Xamarin', () => {
  let xamarin: Xamarin;
  let isDirectoryStub: any;

  beforeEach(() => {
    xamarin = new Xamarin();
    isDirectoryStub = sinon.stub(xamarin, 'isDirectory');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = xamarin.key;
    expect(result).to.equal('xamarin');
  });
  it('should return the correct editor name', () => {
    const result = xamarin.name;
    expect(result).to.equal('Xamarin');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await xamarin.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await xamarin.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await xamarin.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await xamarin.isPluginInstalled();
    expect(result).to.be.false;
  });
});
