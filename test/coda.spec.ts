import Coda from "../src/editors/coda";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Coda", () => {
  let coda: Coda;
  let isEditorInstalledStub: any;
  let isPluginInstalledStub: any;
  let isDirectoryStub: any;
  let isFileStub: any;

  beforeEach(() => {
    coda = new Coda();
    isEditorInstalledStub = sinon.stub(coda, "isEditorInstalled");
    isPluginInstalledStub = sinon.stub(coda, "isPluginInstalled");
    isDirectoryStub = sinon.stub(coda, "isDirectory");
    isFileStub = sinon.stub(coda, "isFile");
  });
  afterEach(() => {
    isEditorInstalledStub.restore();
    isPluginInstalledStub.restore();
    isDirectoryStub.restore();
    isFileStub.restore();
  });
  it("should return the correct key name", () => {
    const result = coda.key;
    expect(result).to.equal("coda");
  });
  it("should return the correct editor name", () => {
    const result = coda.name;
    expect(result).to.equal("Coda");
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    isEditorInstalledStub.resolves(true);
    const result = await coda.isEditorInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if editor is not installed", async () => {
    isDirectoryStub.resolves(false);
    isEditorInstalledStub.resolves(false);
    const result = await coda.isEditorInstalled();
    expect(result).to.be.false;
  });
  it("should return TRUE if plugin is installed", async () => {
    isPluginInstalledStub.resolves(true);
    isFileStub.resolves(true);
    const result = await coda.isPluginInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if plugin is not installed", async () => {
    isPluginInstalledStub.resolves(false);
    isFileStub.resolves(false);
    const result = await coda.isPluginInstalled();
    expect(result).to.be.false;
  });
});
