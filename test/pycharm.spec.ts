import PyCharm from "../src/editors/pycharm";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("PyCharm", () => {
  let pyCharm: PyCharm;
  let isDirectoryStub: any;

  beforeEach(() => {
    pyCharm = new PyCharm();
    isDirectoryStub = sinon.stub(pyCharm, "isDirectory");
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it("should return the correct key name", () => {
    const result = pyCharm.key;
    expect(result).to.equal("pycharm");
  });
  it("should return the correct editor name", () => {
    const result = pyCharm.name;
    expect(result).to.equal("PyCharm");
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await pyCharm.isEditorInstalled();
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
