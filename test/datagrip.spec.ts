import DataGrip from "../src/editors/datagrip";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("DataGrip", () => {
  let dataGrip: DataGrip;
  let isDirectoryStub: any;

  beforeEach(() => {
    dataGrip = new DataGrip();
    isDirectoryStub = sinon.stub(dataGrip, "isDirectory");
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it("should return the correct key name", () => {
    const result = dataGrip.key;
    expect(result).to.equal("datagrip");
  });
  it("should return the correct editor name", () => {
    const result = dataGrip.name;
    expect(result).to.equal("DataGrip");
  });
  it("should return the correct binary names", () => {
    const result = dataGrip.binaries;
    expect(result).to.deep.equal(["datagrip"]);
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await dataGrip.isEditorInstalled();
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
