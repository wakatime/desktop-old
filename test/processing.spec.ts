import Processing from "../src/editors/processing";

var sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Processing', () => {
    let processing: Processing;
    let isDirectoryStub: any;

    beforeEach(() => {
        processing = new Processing();
        isDirectoryStub = sinon.stub(processing, 'isDirectory');
    });
    afterEach(() => {
        isDirectoryStub.restore();
    });
    it('should return the correct binary name', () => {
        const result = processing.name;
        expect(result).to.equal('processing');
    });
    it('should return the correct editor name', () => {
        const result = processing.displayName;
        expect(result).to.equal('Processing');
    });
    it('should return TRUE if editor is installed', async () => {
        isDirectoryStub.resolves(true);
        const result = await processing.isEditorInstalled();
        expect(result).to.be.true;
    });
    it('should return FALSE if editor is not installed', async () => {
        isDirectoryStub.resolves(false);
        const result = await processing.isEditorInstalled();
        expect(result).to.be.false;
    });
    it('should return TRUE if plugin is installed', async () => {
        isDirectoryStub.resolves(true);
        const result = await processing.isPluginInstalled();
        expect(result).to.be.true;
    });
    it('should return FALSE if plugin is not installed', async () => {
        isDirectoryStub.resolves(false);
        const result = await processing.isPluginInstalled();
        expect(result).to.be.false;
    });
});