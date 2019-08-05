import { ImportMock, MockManager } from 'ts-mock-imports';
import Vim from "../src/editors/vim";
import *  as CommandExists from '../src/lib/command-exists';

const chai = require('chai');  
const chaiAsPromised = require('chai-as-promised');  
  
const { expect } = chai;  
chai.use(chaiAsPromised);

describe('Vim', () => {
    let commandExistsMock: MockManager<CommandExists.default>;
    let vim: Vim;

    beforeEach(() => {
        commandExistsMock = ImportMock.mockClass(CommandExists, 'default');
        vim = new Vim();
    });
    afterEach(() => {
        commandExistsMock.restore();
    });
    it('should return the correct editor name', async () => {
        const result = await vim.name;
        expect(result).to.equal('vim');
    });
    it('should return TRUE if editor is installed', async () => {
        commandExistsMock.mock('exists', Promise.resolve(true));
        const result = await vim.isEditorInstalled();
        expect(result).to.be.true;
    });
    it('should return FALSE if editor is not installed', async () => {
        commandExistsMock.mock('exists', Promise.resolve(false));
        const result = await vim.isEditorInstalled();
        expect(result).to.be.false;
    });
});