import fs from 'fs';
import path from 'path';
import request from 'request';

/**
 * Installs WakaTime plugin for Jetbrains editors
 * Directories used by the IDE to store settings go here
 * https://intellij-support.jetbrains.com/hc/en-us/articles/206544519-Directories-used-by-the-IDE-to-store-settings-caches-plugins-and-logs
 * @param pluginsDirectory
 */
export const installJetbrainsPlugin = async (pluginsDirectory: string): Promise<void> => {
  let temp = path.join(pluginsDirectory);

  // Create the temp folder first if this does not exists yet
  fs.mkdirSync(temp, { recursive: true });

  temp = path.join(temp, 'WakaTime.jar');

  const file = fs.createWriteStream(temp);

  await new Promise((resolve, reject) => {
    request({
      uri: 'https://plugins.jetbrains.com/files/7425/51419/WakaTime.jar',
    })
      .pipe(file)
      .on('finish', async () => {
        resolve();
      })
      .on('error', (err: any) => {
        console.error(err);
        reject(err);
      });
  }).catch(err => {
    console.error(err);
  });
};

/**
 * Uninstalls WakaTime plugin for Jetbrains editors
 * @param pluginsDirectory
 */
export const unInstallJetbrainsPlugin = async (pluginsDirectory: string): Promise<void> => {
  try {
    fs.unlinkSync(`${pluginsDirectory}/WakaTime.jar`);
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
