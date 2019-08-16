import SublimeText2 from "../src/editors/sublimeText2";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Sublime Text 2", () => {
  let sublimeText2: SublimeText2;
  let isEditorInstalledStub: any;
  let isDirectoryStub: any;

  beforeEach(() => {
    sublimeText2 = new SublimeText2();
    isEditorInstalledStub = sinon.stub(sublimeText2, "isEditorInstalled");
    isDirectoryStub = sinon.stub(sublimeText2, "isDirectory");
  });
  afterEach(() => {
    isEditorInstalledStub.restore();
    isDirectoryStub.restore();
  });
  it("should return the correct binary name", () => {
    const result = sublimeText2.name;
    expect(result).to.equal("subl");
  });
  it("should return the correct editor name", () => {
    const result = sublimeText2.displayName;
    expect(result).to.equal("Sublime Text 2");
  });
  it("should return TRUE if editor is installed", async () => {
    isEditorInstalledStub.resolves(true);
    const result = await sublimeText2.isEditorInstalled();
    expect(result).to.be.true;
  });
  it("should return TRUE if plugin is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await sublimeText2.isPluginInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if editor is not installed", async () => {
    isEditorInstalledStub.resolves(false);
    const result = await sublimeText2.isEditorInstalled();
    expect(result).to.be.false;
  });
  it("should return FALSE if plugin is not installed", async () => {
    isDirectoryStub.resolves(false);
    const result = await sublimeText2.isPluginInstalled();
    expect(result).to.be.false;
  });
});
