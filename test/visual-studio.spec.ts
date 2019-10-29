import os from 'os';
import VisualStudio from '../src/editors/visual-studio';

const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Visual Studio', () => {
  let visualStudio: VisualStudio;
  let isDirectorySyncStub: any;
  let osPlatformWin32Fake: any;
  let osPlatformDarwinFake: any;
  let findFilesRecuriveStub: any;

  beforeEach(() => {
    visualStudio = new VisualStudio();
    isDirectorySyncStub = sinon.stub(visualStudio, 'isDirectorySync');
    osPlatformWin32Fake = sinon.fake.returns('win32');
    osPlatformDarwinFake = sinon.fake.returns('darwin');
    findFilesRecuriveStub = sinon.stub(visualStudio, 'findFilesRecurive');
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
    isDirectorySyncStub.returns(true);
    const result = await visualStudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return TRUE if editor is installed on Mac', async () => {
    sinon.replace(os, 'platform', osPlatformDarwinFake);
    isDirectorySyncStub.returns(true);
    const result = await visualStudio.isEditorInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if editor is not installed on Windows', async () => {
    sinon.replace(os, 'platform', osPlatformWin32Fake);
    isDirectorySyncStub.returns(false);
    const result = await visualStudio.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return FALSE if editor is not installed on Mac', async () => {
    sinon.replace(os, 'platform', osPlatformDarwinFake);
    isDirectorySyncStub.returns(false);
    const result = await visualStudio.isEditorInstalled();
    expect(result).to.be.false;
  });
  it('should return TRUE if plugin is installed on Windows', async () => {
    sinon.replace(os, 'platform', osPlatformWin32Fake);
    findFilesRecuriveStub.returns(['WakaTime.dll']);
    const result = await visualStudio.isPluginInstalled();
    expect(result).to.be.true;
  });
  it('should return FALSE if plugin is not installed on Windows', async () => {
    sinon.replace(os, 'platform', osPlatformWin32Fake);
    findFilesRecuriveStub.returns([]);
    const result = await visualStudio.isPluginInstalled();
    expect(result).to.be.false;
  });
});
