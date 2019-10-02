import editors from "../constants/editors";
import {
  androidStudio128Path,
  appcode128Path,
  atom128Path,
  blender128Path,
  brackets128Path,
  chrome128Path,
  coda128Path,
  eclipse128Path,
  kate128Path,
  processing128Path,
  rubymine128Path,
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
  [editors.AndroidStudio.getName()]: androidStudio128Path,
  [editors.AppCode.getName()]: appcode128Path,
  [editors.Atom.getName()]: atom128Path,
  [editors.Blender.getName()]: blender128Path,
  [editors.Brackets.getName()]: brackets128Path,
  [editors.Chrome.getName()]: chrome128Path,
  [editors.Coda.getName()]: coda128Path,
  [editors.Eclipse.getName()]: eclipse128Path,
  [editors.Kate.getName()]: kate128Path,
  [editors.Processing.getName()]: processing128Path,
  [editors.RubyMine.getName()]: rubymine128Path,
  [editors.SublimeText2.getName()]: sublimeText128Path,
  [editors.SublimeText3.getName()]: sublimeText128Path, // Should this be a different image?
  [editors.Terminal.getName()]: terminal128Path,
  [editors.Unity.getName()]: unity128Path,
  [editors.Vim.getName()]: vim128Path,
  [editors.VisualStudio.getName()]: visualStudio128Path,
  [editors.VSCode.getName()]: vsCode128Path,
  [editors.XCode.getName()]: xcode128Path
};

export default imgMap;
