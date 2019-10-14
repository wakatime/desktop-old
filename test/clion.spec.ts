import CLion from "../src/editors/clion";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("CLion", () => {
  let cLion: CLion;
  let isDirectoryStub: any;

  beforeEach(() => {
    cLion = new CLion();
    isDirectoryStub = sinon.stub(cLion, "isDirectory");
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it("should return the correct key name", () => {
    const result = cLion.key;
    expect(result).to.equal("clion");
  });
  it("should return the correct editor name", () => {
    const result = cLion.name;
    expect(result).to.equal("CLion");
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await cLion.isEditorInstalled();
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
