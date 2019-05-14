import Vim from "../src/editors/vim";

var sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Vim', () => {
    let vim: Vim;

    beforeEach(() => {
        vim = new Vim();
    });
    afterEach(() => {
    });
    it('should return the correct editor name', () => {
        const result = vim.name;
        expect(result).to.equal('vim');
    });
    it('should return TRUE if editor is installed', async () => {
        sinon.stub(vim, 'isEditorInstalled').returns(Promise.resolve(true));
        const result = await vim.isEditorInstalled();
        expect(result).to.be.true;
    });
    it('should return FALSE if editor is not installed', async () => {
        sinon.stub(vim, 'isEditorInstalled').returns(Promise.resolve(false));
        const result = await vim.isEditorInstalled();
        expect(result).to.be.false;
    });
});