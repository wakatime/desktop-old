import Unity from "../src/editors/unity";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Unity", () => {
  let unity: Unity;
  let isEditorInstalledStub: any;

  beforeEach(() => {
    unity = new Unity();
    isEditorInstalledStub = sinon.stub(unity, "isEditorInstalled");
  });
  afterEach(() => {
    isEditorInstalledStub.restore();
  });
  it("should return the correct key name", () => {
    const result = unity.key;
    expect(result).to.equal("unity");
  });
  it("should return the correct editor name", () => {
    const result = unity.name;
    expect(result).to.equal("Unity");
  });
  it("should return TRUE if editor is installed", async () => {
    isEditorInstalledStub.resolves(true);
    const result = await unity.isEditorInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if editor is not installed", async () => {
    isEditorInstalledStub.resolves(false);
    const result = await unity.isEditorInstalled();
    expect(result).to.be.false;
  });
});
