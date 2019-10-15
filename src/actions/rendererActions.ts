import {
  ON_MAIN_PROCESS_STATE,
  SYNC_MAIN_STATE,
  ENABLE_EDITORS,
  SELECT_EDITOR_TO_INSTALL,
  SET_EDITOR_ENABLED,
  CLEAR_SELECT_EDITORS,
} from '../constants/rendererActionTypes';
import makeActionCreator, { makeActionWithMeta } from '../utils/makeActionCreator';

export const setMainProcessState = makeActionCreator(ON_MAIN_PROCESS_STATE, 'payload');

export const onRenderStoreCreated = makeActionWithMeta({
  forwardToMain: true,
})(SYNC_MAIN_STATE);

export const enableEditors = makeActionCreator(ENABLE_EDITORS, 'payload');

export const selectEditorToInstall = makeActionCreator(SELECT_EDITOR_TO_INSTALL, 'payload');

export const setEditorEnabled = makeActionCreator(SET_EDITOR_ENABLED, 'payload');

export const clearSelectEditors = makeActionCreator(CLEAR_SELECT_EDITORS, 'payload');
