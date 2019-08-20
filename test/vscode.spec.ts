import VsCode from "../src/editors/vscode";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Visual Studio Code", () => {
  let vscode: VsCode;
  let listExtensionsStub: any;
  let isDirectoryStub: any;

  beforeEach(() => {
    vscode = new VsCode();
    listExtensionsStub = sinon.stub(vscode, "listExtensions");
    isDirectoryStub = sinon.stub(vscode, "isDirectory");
  });
  afterEach(() => {
    listExtensionsStub.restore();
    isDirectoryStub.restore();
  });
  it("should return the correct key name", () => {
    const result = vscode.key;
    expect(result).to.equal("visualstudiocode");
  });
  it("should return the correct editor name", () => {
    const result = vscode.name;
    expect(result).to.equal("Visual Studio Code");
  });
  it("should return the correct binary name", () => {
    const result = vscode.binary;
    expect(result).to.equal("code");
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await vscode.isEditorInstalled();
    expect(result).to.be.true;
  });
  // it('should return FALSE if editor is not installed', async () => {
  //     isDirectoryStub.resolves(false);
  //     const result = await vscode.isEditorInstalled();
  //     expect(result).to.be.false;
  // });
  it("should return TRUE if plugin is installed", async () => {
    listExtensionsStub.resolves(true);
    const result = await vscode.isPluginInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if plugin is n ot installed", async () => {
    listExtensionsStub.resolves(false);
    const result = await vscode.isPluginInstalled();
    expect(result).to.be.false;
  });
});
