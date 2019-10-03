import RubyMine from "../src/editors/rubymine";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("RubyMine", () => {
  let rubyMine: RubyMine;
  let isDirectoryStub: any;

  beforeEach(() => {
    rubyMine = new RubyMine();
    isDirectoryStub = sinon.stub(rubyMine, "isDirectory");
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it("should return the correct key name", () => {
    const result = rubyMine.key;
    expect(result).to.equal("rubymine");
  });
  it("should return the correct editor name", () => {
    const result = rubyMine.name;
    expect(result).to.equal("RubyMine");
  });
  it("should return the correct binary names", () => {
    const result = rubyMine.binaries;
    expect(result).to.deep.equal(["rubymine"]);
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await rubyMine.isEditorInstalled();
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
