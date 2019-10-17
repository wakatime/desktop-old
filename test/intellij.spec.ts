import IntelliJ from '../src/editors/intellij';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('IntelliJ', () => {
  let intelliJ: IntelliJ;
  let isDirectoryStub: any;

  beforeEach(() => {
    intelliJ = new IntelliJ();
    isDirectoryStub = sinon.stub(intelliJ, 'isDirectory');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = intelliJ.key;
    expect(result).to.equal('intellijidea');
  });
  it('should return the correct editor name', () => {
    const result = intelliJ.name;
    expect(result).to.equal('IntelliJ IDEA');
  });
  it('should return the correct binary names', () => {
    const result = intelliJ.binaries;
    expect(result).to.deep.equal(['intellij']);
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await intelliJ.isEditorInstalled();
    expect(result).to.be.true;
  });
  // it("should return TRUE if plugin is installed", async () => {
  //   listExtensionsStub.resolves(true);
  //   const result = await vscode.isPluginInstalled();
  //   expect(result).to.be.true;
  // });
  // it("should return FALSE if plugin is n ot installed", async () => {
  //   listExtensionsStub.resolves(false);
  //   const result = await vscode.isPluginInstalled();
  //   expect(result).to.be.false;
  // });
});
