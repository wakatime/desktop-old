import Atom from './editors/atom';
import SublimeText2 from './editors/sublime-text-2';
import SublimeText3 from './editors/sublime-text-3';
import Vim from './editors/vim';

export default class EditorManager {
  editors: Object;

  constructor() {
    this.editors = {
      Atom: new Atom(),
      SublimeText2: new SublimeText2(),
      SublimeText3: new SublimeText3(),
      Vim: new Vim(),
    };
  }
}
