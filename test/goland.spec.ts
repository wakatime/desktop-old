import GoLand from "../src/editors/goland";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("GoLand", () => {
  let goLand: GoLand;
  let isDirectoryStub: any;

  beforeEach(() => {
    goLand = new GoLand();
    isDirectoryStub = sinon.stub(goLand, "isDirectory");
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it("should return the correct key name", () => {
    const result = goLand.key;
    expect(result).to.equal("goland");
  });
  it("should return the correct editor name", () => {
    const result = goLand.name;
    expect(result).to.equal("GoLand");
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await goLand.isEditorInstalled();
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
