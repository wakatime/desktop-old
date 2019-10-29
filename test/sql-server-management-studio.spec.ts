import SqlServerManagementStudio from '../src/editors/sql-server-management-studio';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Sql Server Management Studio', () => {
  let sqlServerManagementStudio: SqlServerManagementStudio;
  let isDirectorySyncStub: any;

  beforeEach(() => {
    sqlServerManagementStudio = new SqlServerManagementStudio();
    isDirectorySyncStub = sinon.stub(sqlServerManagementStudio, 'isDirectorySync');
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should return the correct key name', () => {
    const result = sqlServerManagementStudio.key;
    expect(result).to.equal('sqlservermanagementstudio');
  });
  it('should return the correct editor name', () => {
    const result = sqlServerManagementStudio.name;
    expect(result).to.equal('Sql Server Management Studio');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await sqlServerManagementStudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await sqlServerManagementStudio.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isDirectorySyncStub.returns(true);
    const result = await sqlServerManagementStudio.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isDirectorySyncStub.returns(false);
    const result = await sqlServerManagementStudio.isPluginInstalled();
    expect(result).to.be.false;
  });
});
