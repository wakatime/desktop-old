import AppCode from "../src/editors/appcode";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("AppCode", () => {
  let appCode: AppCode;
  let isDirectoryStub: any;

  beforeEach(() => {
    appCode = new AppCode();
    isDirectoryStub = sinon.stub(appCode, "isDirectory");
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it("should return the correct key name", () => {
    const result = appCode.key;
    expect(result).to.equal("appcode");
  });
  it("should return the correct editor name", () => {
    const result = appCode.name;
    expect(result).to.equal("AppCode");
  });
  it("should return the correct binary names", () => {
    const result = appCode.binaries;
    expect(result).to.deep.equal(["appcode"]);
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await appCode.isEditorInstalled();
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
