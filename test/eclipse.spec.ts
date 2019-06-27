import Eclipse from "../src/editors/eclipse";

var sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Eclipse', () => {
    let eclipse: Eclipse;
    let isDirectoryStub: any;

    beforeEach(() => {
        eclipse = new Eclipse();
        isDirectoryStub = sinon.stub(eclipse, 'isDirectory');
    });
    afterEach(() => {
        isDirectoryStub.restore();
    });
    it('should return the correct binary name', () => {
        const result = eclipse.name;
        expect(result).to.equal('eclipse');
    });
    it('should return the correct editor name', () => {
        const result = eclipse.displayName;
        expect(result).to.equal('Eclipse');
    });
    it('should return TRUE if editor is installed', async () => {
        isDirectoryStub.resolves(true);
        const result = await eclipse.isEditorInstalled();
        expect(result).to.be.true;
    });
    it('should return FALSE if editor is not installed', async () => {
        isDirectoryStub.resolves(false);
        const result = await eclipse.isEditorInstalled();
        expect(result).to.be.false;
    });
});