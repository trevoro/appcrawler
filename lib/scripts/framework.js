// 

ERR_EXIT = 1;
ERR_ARGS = 2;
ERR_PAGE = 3;

var page = require('webpage').create();
var system = require('system');

if (system.args.length === 1) {
  phantom.exit(ERR_ARGS);
} else {
  page.address = system.args[1];
  page.resources = [];

  page.onLoadStarted = function () {
    page.startTime = new Date();
  };

  page.onResourceRequested = function (req) {
    page.resources[req.id] = {
      request: req,
      startReply: null,
      endReply: null
    };
  };

  page.onResourceReceived = function (res) {
    if (res.stage === 'start') {
      page.resources[res.id].startReply = res;
    }
    if (res.stage === 'end') {
      page.resources[res.id].endReply = res;
    }
  };

  page.onConsoleMessage = function (msg) {
    console.log(msg);
  }

  page.open(page.address, function (status) {
    var result = {
      page: page.address,
      framework: null
    }

    if (status !== 'success') {
      console.log('FAIL to load the address');
      phantom.exit(ERR_PAGE);
    } else {
      page.endTime = new Date();
      page.title = page.evaluate(function () {
        return document.title;
      });
      page.evaluate(function() {
      if (Backbone) {
        console.log(JSON.stringify({backbone: {version: Backbone.VERSION }}));
      }
      console.log(JSON.stringify(result));
      //XXX other frameworks
      });
    }
    phantom.exit();
  });
}
