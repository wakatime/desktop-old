import editors from "../constants/editors";
import {
  androidStudio128Path,
  atom128Path,
  blender128Path,
  brackets128Path,
  chrome128Path,
  coda128Path,
  eclipse128Path,
  kate128Path,
  processing128Path,
  sublimeText128Path,
  terminal128Path,
  unity128Path,
  vim128Path,
  visualStudio128Path,
  vsCode128Path,
  xcode128Path
} from "../constants/imgPaths";

interface EditorImageMap {
  [s: string]: string;
}

const imgMap: EditorImageMap = {
  [new editors.AndroidStudio().name]: androidStudio128Path,
  [new editors.Atom().name]: atom128Path,
  [new editors.Blender().name]: blender128Path,
  [new editors.Brackets().name]: brackets128Path,
  [new editors.Chrome().name]: chrome128Path,
  [new editors.Coda().name]: coda128Path,
  [new editors.Eclipse().name]: eclipse128Path,
  [new editors.Kate().name]: kate128Path,
  [new editors.Processing().name]: processing128Path,
  [new editors.SublimeText2().name]: sublimeText128Path,
  [new editors.SublimeText3().name]: sublimeText128Path, // Should this be a different image?
  [new editors.Terminal().name]: terminal128Path,
  [new editors.Unity().name]: unity128Path,
  [new editors.Vim().name]: vim128Path,
  [new editors.VisualStudio().name]: visualStudio128Path,
  [new editors.VSCode().name]: vsCode128Path,
  [new editors.XCode().name]: xcode128Path
};

export default imgMap;
