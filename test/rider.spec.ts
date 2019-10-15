import Rider from '../src/editors/rider';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Rider', () => {
  let rider: Rider;
  let isDirectoryStub: any;

  beforeEach(() => {
    rider = new Rider();
    isDirectoryStub = sinon.stub(rider, 'isDirectory');
  });
  afterEach(() => {
    isDirectoryStub.restore();
  });
  it('should return the correct key name', () => {
    const result = rider.key;
    expect(result).to.equal('rider');
  });
  it('should return the correct editor name', () => {
    const result = rider.name;
    expect(result).to.equal('Rider');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await rider.isEditorInstalled();
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
