import Blender from "../src/editors/blender";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Blender", () => {
  let blender: Blender;
  let isEditorInstalledStub: any;

  beforeEach(() => {
    blender = new Blender();
    isEditorInstalledStub = sinon.stub(blender, "isEditorInstalled");
  });
  afterEach(() => {
    isEditorInstalledStub.restore();
  });
  it("should return the correct key name", () => {
    const result = blender.key;
    expect(result).to.equal("blender");
  });
  it("should return the correct editor name", () => {
    const result = blender.name;
    expect(result).to.equal("Blender");
  });
  it("should return the correct binary names", () => {
    const result = blender.binaries;
    expect(result).to.deep.equal(["blender"]);
  });
  it("should return TRUE if editor is installed", async () => {
    isEditorInstalledStub.resolves(true);
    const result = await blender.isEditorInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if editor is not installed", async () => {
    isEditorInstalledStub.resolves(false);
    const result = await blender.isEditorInstalled();
    expect(result).to.be.false;
  });
});
