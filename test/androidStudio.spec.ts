import AndroidStudio from "../src/editors/androidStudio";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Processing", () => {
  let androidStudio: AndroidStudio;
  let isEditorInstalledStub: any;
  let fileExistsStub: any;

  beforeEach(() => {
    androidStudio = new AndroidStudio();
    isEditorInstalledStub = sinon.stub(androidStudio, "isEditorInstalled");
    fileExistsStub = sinon.stub(androidStudio, "fileExists");
  });
  afterEach(() => {
    isEditorInstalledStub.restore();
    fileExistsStub.restore();
  });
  it("should return the correct key name", () => {
    const result = androidStudio.key;
    expect(result).to.equal("androidstudio");
  });
  it("should return the correct editor name", () => {
    const result = androidStudio.name;
    expect(result).to.equal("Android Studio");
  });
  it("should return the correct binary names", () => {
    const result = androidStudio.binaries;
    expect(result).to.deep.equal(["editor"]);
  });
  it("should return TRUE if editor is installed", async () => {
    isEditorInstalledStub.resolves(true);
    const result = await androidStudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if editor is not installed", async () => {
    isEditorInstalledStub.resolves(false);
    const result = await androidStudio.isEditorInstalled();
    expect(result).to.be.false;
  });
  it("should return TRUE if plugin is installed", async () => {
    fileExistsStub.resolves(true);
    const result = await androidStudio.isPluginInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if plugin is not installed", async () => {
    fileExistsStub.resolves(false);
    const result = await androidStudio.isPluginInstalled();
    expect(result).to.be.false;
  });
});
