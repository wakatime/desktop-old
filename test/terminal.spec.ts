import os from 'os';
import Terminal from '../src/editors/terminal';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Terminal', () => {
  let terminal: Terminal;
  let isAnyTerminalAvailableStub: any;
  let isAnyTerminalInstalledStub: any;
  let osPlatformDarwinFake: any;

  beforeEach(() => {
    terminal = new Terminal();
    isAnyTerminalAvailableStub = sinon.stub(terminal, 'isAnyTerminalAvailable');
    isAnyTerminalInstalledStub = sinon.stub(terminal, 'isAnyTerminalInstalled');
    osPlatformDarwinFake = sinon.fake.returns('darwin');
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should return the correct key name', () => {
    const result = terminal.key;
    expect(result).to.equal('terminal');
  });
  it('should return the correct editor name', () => {
    const result = terminal.name;
    expect(result).to.equal('Terminal');
  });
  it('should return the correct binary names', () => {
    const result = terminal.binaries;
    expect(result).to.deep.equal(['bash', 'zsh', 'iterm', 'fish']);
  });
  it('should return TRUE if editor is installed', async () => {
    isAnyTerminalAvailableStub.returns(true);
    const result = await terminal.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed', async () => {
    isAnyTerminalAvailableStub.returns(false);
    const result = await terminal.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed', async () => {
    sinon.replace(os, 'platform', osPlatformDarwinFake);
    isAnyTerminalInstalledStub.returns(true);
    const result = await terminal.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed', async () => {
    sinon.replace(os, 'platform', osPlatformDarwinFake);
    isAnyTerminalInstalledStub.returns(false);
    const result = await terminal.isPluginInstalled();
    expect(result).to.be.false;
  });
});
