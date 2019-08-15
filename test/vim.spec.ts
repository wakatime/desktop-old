import Vim from "../src/editors/vim";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Vim", () => {
  let vim: Vim;
  let isEditorInstalledStub: any;

  beforeEach(() => {
    vim = new Vim();
    isEditorInstalledStub = sinon.stub(vim, "isEditorInstalled");
  });
  afterEach(() => {
    isEditorInstalledStub.restore();
  });
  it("should return the correct binary name", () => {
    const result = vim.name;
    expect(result).to.equal("vim");
  });
  it("should return the correct editor name", () => {
    const result = vim.displayName;
    expect(result).to.equal("Vim");
  });
  it("should return TRUE if editor is installed", async () => {
    isEditorInstalledStub.resolves(true);
    const result = await vim.isEditorInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if editor is not installed", async () => {
    isEditorInstalledStub.resolves(false);
    const result = await vim.isEditorInstalled();
    expect(result).to.be.false;
  });
});
