import PhpStorm from '../src/editors/phpstorm';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('PhpStorm', () => {
  let phpStorm: PhpStorm;
  let isDirectorySyncStub: any;
  let isFileSyncStub: any;

  beforeEach(() => {
    phpStorm = new PhpStorm();
    isDirectorySyncStub = sinon.stub(phpStorm, 'isDirectorySync');
    isFileSyncStub = sinon.stub(phpStorm, 'isFileSync');
  });
  afterEach(() => {
    isDirectorySyncStub.restore();
    isFileSyncStub.restore();
  });
  it('should return the correct key name', () => {
    const result = phpStorm.key;
    expect(result).to.equal('phpstorm');
  });
  it('should return the correct editor name', () => {
    const result = phpStorm.name;
    expect(result).to.equal('PhpStorm');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await phpStorm.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return TRUE if editor is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await phpStorm.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileSyncStub.returns(true);
    const result = await phpStorm.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileSyncStub.returns(false);
    const result = await phpStorm.isPluginInstalled();
    expect(result).to.be.false;
  });
});
