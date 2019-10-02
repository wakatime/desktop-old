import Terminal from "../src/editors/terminal";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Terminal", () => {
  let terminal: Terminal;
  let isEditorInstalledStub: any;

  beforeEach(() => {
    terminal = new Terminal();
    isEditorInstalledStub = sinon.stub(terminal, "isEditorInstalled");
  });
  afterEach(() => {
    isEditorInstalledStub.restore();
  });
  it("should return the correct key name", () => {
    const result = terminal.key;
    expect(result).to.equal("terminal");
  });
  it("should return the correct editor name", () => {
    const result = terminal.name;
    expect(result).to.equal("Terminal");
  });
  it("should return the correct binary names", () => {
    const result = terminal.binaries;
    expect(result).to.deep.equal(["bash", "zsh", "iterm", "iterm2", "fish"]);
  });
  it("should return TRUE if editor is installed", async () => {
    isEditorInstalledStub.resolves(true);
    const result = await terminal.isEditorInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if editor is not installed", async () => {
    isEditorInstalledStub.resolves(false);
    const result = await terminal.isEditorInstalled();
    expect(result).to.be.false;
  });
});
