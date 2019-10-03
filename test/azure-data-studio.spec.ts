import AzureDataStudio from "../src/editors/azure-data-studio";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Azure Data Studio", () => {
  let azureDataStudio: AzureDataStudio;
  let isDirectoryStub: any;

  beforeEach(() => {
    azureDataStudio = new AzureDataStudio();
    isDirectoryStub = sinon.stub(azureDataStudio, "isDirectory");
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it("should return the correct key name", () => {
    const result = azureDataStudio.key;
    expect(result).to.equal("azuredatastudio");
  });
  it("should return the correct editor name", () => {
    const result = azureDataStudio.name;
    expect(result).to.equal("Azure Data Studio");
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await azureDataStudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  // it('should return FALSE if editor is not installed', async () => {
  //     isDirectoryStub.resolves(false);
  //     const result = await vscode.isEditorInstalled();
  //     expect(result).to.be.false;
  // });
});
