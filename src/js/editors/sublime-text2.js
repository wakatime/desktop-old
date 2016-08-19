var fs = require('fs');
var os = require('os');
var path = require('path');

module.exports = {

  name: function() {
    return 'Sublime Text 2';
  },

  icon: function() {
    return '';
  },

  isInstalled: function(cb) {
    if (!cb) throw new Error('Missing callback argument.');
    fs.stat(this._appDirectory(), function(err, stats) {
      cb(!err && stats.isDirectory());
    });
  },

  isPluginInstalled: function(name, cb) {
    if (!cb) throw new Error('Missing callback argument.');
    var pluginsDir = this._pluginsDirectory();
    var plugin = path.join(pluginsDir, name);
    fs.stat(plugin, function(err, stats) {
      cb(!err && stats.isDirectory());
    });
  },

  installPlugin: function(name, cb) {
    if (!cb) throw new Error('Missing callback argument.');
  },

  uninstallPlugin: function(name, cb) {
    if (!cb) throw new Error('Missing callback argument.');
  },

  _appDirectory: function() {
    var dir;
    switch (os.platform()) {
      case 'win32':
        break;
      case 'darwin':
        dir = '/Applications/Sublime Text 2.app/Contents'
        break;
      default:
        dir = null;
    }
    return dir;
  },

  _pluginsDirectory: function() {
    switch (os.platform()) {
      case 'win32':
        var is64bit = process.arch === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432');
        if (is64bit)
          return ''
        else
          return '/Applications/Sublime Text 2.app/Contents'
      case 'darwin':
        return path.join(os.homedir(), 'Library/Application Support/Sublime Text 2/Packages');
      case 'linux':
        return ''
      default:
        return null;
    }
  },

};
