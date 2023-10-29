import Sketch from '../src/editors/sketch';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Sketch', () => {
  let sketch: Sketch;
  let isDirectoryStub: any;
  let isFileStub: any;

  beforeEach(() => {
    sketch = new Sketch();
    isDirectoryStub = sinon.stub(sketch, 'isDirectory');
    isFileStub = sinon.stub(sketch, 'isFile');
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should return the correct key name', () => {
    const result = sketch.key;
    expect(result).to.equal('sketch');
  });
  it('should return the correct editor name', () => {
    const result = sketch.name;
    expect(result).to.equal('Sketch');
  });
  it('should return TRUE if editor is installed', async () => {
    isDirectoryStub.resolves(true);
    const result = await sketch.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isDirectoryStub.resolves(false);
    const result = await sketch.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    isFileStub.resolves(true);
    const result = await sketch.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    isFileStub.resolves(false);
    const result = await sketch.isPluginInstalled();
    expect(result).to.be.false;
  });
});
