import VisualStudio from "../src/editors/visual-studio";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Visual Studio Code", () => {
  let visualStudio: VisualStudio;
  let getInstalledVersions: any;

  beforeEach(() => {
    visualStudio = new VisualStudio();
    getInstalledVersions = sinon.stub(visualStudio, "getInstalledVersions");
  });
  afterEach(() => {
    getInstalledVersions.restore();
  });
  it("should return the correct key name", () => {
    const result = visualStudio.key;
    expect(result).to.equal("visualstudio");
  });
  it("should return the correct editor name", () => {
    const result = visualStudio.name;
    expect(result).to.equal("Visual Studio");
  });
  it("should return TRUE if editor is installed", async () => {
    getInstalledVersions.returns([2010, 2012]);
    const result = await visualStudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if editor is not installed", async () => {
    getInstalledVersions.returns([]);
    const result = await visualStudio.isEditorInstalled();
    expect(result).to.be.false;
  });
  //   it("should return TRUE if plugin is installed", async () => {
  //     listExtensionsStub.resolves(true);
  //     const result = await visualStudio.isPluginInstalled();
  //     expect(result).to.be.true;
  //   });
  //   it("should return FALSE if plugin is n ot installed", async () => {
  //     listExtensionsStub.resolves(false);
  //     const result = await visualStudio.isPluginInstalled();
  //     expect(result).to.be.false;
  //   });
});
