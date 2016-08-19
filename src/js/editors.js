var sublime2 = require('./editors/sublime-text2');
var sublime3 = require('./editors/sublime-text3');
var vim = require('./editors/vim');
var atom = require('./editors/atom');

module.exports = {
  atom: atom,
  sublime2: sublime2,
  sublime3: sublime3,
  vim: vim,
};
