var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var path = require('path');

var binPath = phantomjs.path
var pageUri = 'http://m.gilt.com';
var childArgs = [ path.join(__dirname, 'lib/scripts/framework.js'), pageUri ]

childProcess.execFile(binPath, childArgs, function(error, stdout, stderr) {
  console.log(stdout);
});
