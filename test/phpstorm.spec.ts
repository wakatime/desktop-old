import PhpStorm from "../src/editors/phpstorm";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("PhpStorm", () => {
  let phpStorm: PhpStorm;
  let isDirectoryStub: any;

  beforeEach(() => {
    phpStorm = new PhpStorm();
    isDirectoryStub = sinon.stub(phpStorm, "isDirectory");
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it("should return the correct key name", () => {
    const result = phpStorm.key;
    expect(result).to.equal("phpstorm");
  });
  it("should return the correct editor name", () => {
    const result = phpStorm.name;
    expect(result).to.equal("PhpStorm");
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await phpStorm.isEditorInstalled();
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
