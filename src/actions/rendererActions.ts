import { Action } from "redux";
import {
  ON_MAIN_PROCESS_STATE,
  RENDER_STORE_CREATED
} from "../constants/rendererActionTypes";
import makeActionCreator, {
  makeActionWithMeta
} from "../utils/makeActionCreator";

export const setMainProcessState = makeActionCreator(
  ON_MAIN_PROCESS_STATE,
  "payload"
);

export const onRenderStoreCreated = makeActionWithMeta({
  forwardToMain: true
})(RENDER_STORE_CREATED);
