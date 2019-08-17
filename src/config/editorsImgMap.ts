import {
  ANDROIDSTUDIO,
  ATOM,
  CHROME,
  ECLIPSE,
  SUBLIMETEXT2,
  SUBLIMETEXT3,
  VIM,
  VSCODE,
  XCODE
} from "../constants/editors";
import {
  androidStudio128Path,
  atom128Path,
  chrome128Path,
  eclipse128Path,
  sublimeText128Path,
  vim128Path,
  vsCode128Path,
  xcode128Path
} from "../constants/imgPaths";

interface EditorImageMap {
  [s: string]: string;
}

const imgMap: EditorImageMap = {
  [ANDROIDSTUDIO]: androidStudio128Path,
  [ATOM]: atom128Path,
  [CHROME]: chrome128Path,
  [ECLIPSE]: eclipse128Path,
  [SUBLIMETEXT2]: sublimeText128Path,
  [SUBLIMETEXT3]: sublimeText128Path, // Should this be a different image?
  [VIM]: vim128Path,
  [VSCODE]: vsCode128Path,
  [XCODE]: xcode128Path
};

export default imgMap;
