import Gedit from "../src/editors/gedit";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Gedit", () => {
  let gedit: Gedit;
  let isEditorInstalledStub: any;
  let isDirectoryStub: any;
  let pluginsDirectoryStub: any;
  let appDirectoryStub: any;

  beforeEach(() => {
    gedit = new Gedit();
    isEditorInstalledStub = sinon.stub(gedit, "isEditorInstalled");
    isDirectoryStub = sinon.stub(gedit, "isDirectory");
    pluginsDirectoryStub = sinon.stub(gedit, "pluginsDirectory");
    appDirectoryStub = sinon.stub(gedit, "appDirectory");
  });
  afterEach(() => {
    isEditorInstalledStub.restore();
    isDirectoryStub.restore();
    pluginsDirectoryStub.restore();
    appDirectoryStub.restore();
  });
  it("should return the correct key name", () => {
    const result = gedit.key;
    expect(result).to.equal("gedit");
  });
  it("should return the correct editor name", () => {
    const result = gedit.name;
    expect(result).to.equal("Gedit");
  });
  it("should return TRUE if editor is installed", async () => {
    isEditorInstalledStub.resolves(true);
    const result = await gedit.isEditorInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if editor is not installed", async () => {
    isEditorInstalledStub.resolves(false);
    const result = await gedit.isEditorInstalled();
    expect(result).to.be.false;
  });
  it("should return TRUE if plugin is installed", async () => {
    isDirectoryStub.returns(true);
    pluginsDirectoryStub.returns("");
    const result = await gedit.isPluginInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if plugin is not installed", async () => {
    isDirectoryStub.returns(false);
    pluginsDirectoryStub.returns("");
    const result = await gedit.isPluginInstalled();
    expect(result).to.be.false;
  });
});
