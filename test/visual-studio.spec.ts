import os from 'os';
import VisualStudio from '../src/editors/visual-studio';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Visual Studio', () => {
  let visualStudio: VisualStudio;
  let getInstalledVersionsStub: any;
  let isDirectoryStub: any;
  let osPlatformWin32Fake: any;
  let osPlatformDarwinFake: any;
  let isRegKeyStub: any;
  let isFileWindowsStub: any;

  beforeEach(() => {
    visualStudio = new VisualStudio();
    getInstalledVersionsStub = sinon.stub(visualStudio, 'getInstalledVersions');
    isDirectoryStub = sinon.stub(visualStudio, 'isDirectory');
    osPlatformWin32Fake = sinon.fake.returns('win32');
    osPlatformDarwinFake = sinon.fake.returns('darwin');
    isRegKeyStub = sinon.stub(visualStudio, 'isRegKey');
    isFileWindowsStub = sinon.stub(visualStudio, 'isFileWindows');
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should return the correct key name', () => {
    const result = visualStudio.key;
    expect(result).to.equal('visualstudio');
  });
  it('should return the correct editor name', () => {
    const result = visualStudio.name;
    expect(result).to.equal('Visual Studio');
  });
  it('should return TRUE if editor is installed on Windows', async () => {
    sinon.replace(os, 'platform', osPlatformWin32Fake);
    getInstalledVersionsStub.returns([2010, 2012]);
    const result = await visualStudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return TRUE if editor is installed on Mac', async () => {
    sinon.replace(os, 'platform', osPlatformDarwinFake);
    isDirectoryStub.resolves(true);
    const result = await visualStudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed on Windows', async () => {
    sinon.replace(os, 'platform', osPlatformWin32Fake);
    getInstalledVersionsStub.returns([]);
    const result = await visualStudio.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return FALSE if editor is not installed on Mac', async () => {
    sinon.replace(os, 'platform', osPlatformDarwinFake);
    isDirectoryStub.resolves(false);
    const result = await visualStudio.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed on Windows', async () => {
    sinon.replace(os, 'platform', osPlatformWin32Fake);
    isFileWindowsStub.returns(true);
    const result = await visualStudio.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed on Windows', async () => {
    sinon.replace(os, 'platform', osPlatformWin32Fake);
    isFileWindowsStub.returns(false);
    const result = await visualStudio.isPluginInstalled();
    expect(result).to.be.false;
  });
});
