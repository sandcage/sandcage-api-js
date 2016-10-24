var SandCage;

SandCage = (function() {
  var API_VERSION, ENDPOINT_BASE, loadScript;

  API_VERSION = "0.2";

  ENDPOINT_BASE = "https://api.sandcage.com/" + API_VERSION + "/";

  function SandCage(apikey) {
    var self;
    this.apikey = apikey;
    if (!this.apikey) {
      SandCage.onerror({
        status: 'error',
        name: 'MissingKey',
        message: 'Provide your SandCage API Key.'
      });
      return false;
    }
    self = this;
    if (typeof JSON === "undefined" || JSON === null) {
      loadScript('json2.min.js');
    }
    return this;
  }

  SandCage.call = function(service_endpoint, params, callback_endpoint, onresult) {
    var key, payload, req;
    if (callback_endpoint == null) {
      callback_endpoint = '';
    }
    payload = {
      key: self.apikey
    };
    if (callback_endpoint !== '') {
      payload.callback_url = callback_endpoint;
    }
    for (key in params) {
      payload[key] = params[key];
    }
    payload = JSON.stringify(payload);
    req = new XMLHttpRequest();
    req.open('POST', "" + ENDPOINT_BASE + service_endpoint);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function() {
      var e, res;
      if (req.readyState !== 4) {
        return;
      }
      try {
        res = JSON.parse(req.responseText);
      } catch (_error) {
        e = _error;
        res = {
          status: 'error',
          name: 'GenericError',
          message: e
        };
      }
      if (res == null) {
        res = {
          status: 'error',
          name: 'GenericError',
          message: 'An error occurred.'
        };
      }
      if (req.status !== 200) {
        return SandCage.onerror(res);
      } else {
        if (onresult) {
          return onresult(res);
        }
      }
    };
    return req.send(payload);
  };

  SandCage.onerror = function(err) {
    return console.log('ERROR: ', {
      name: err.name,
      message: err.message,
      error: err
    });
  };

  loadScript = function(url) {
    var ajax;
    ajax = new XMLHttpRequest;
    ajax.open('GET', url, false);
    ajax.onreadystatechange = function() {
      var script, scriptNode;
      script = ajax.response || ajax.responseText;
      if (ajax.readyState === 4) {
        switch (ajax.status) {
          case 200:
            scriptNode = document.createElement('script');
            scriptNode.setAttribute('type', 'text/javascript');
            scriptNode.setAttribute('charset', 'UTF-8');
            scriptNode.setAttribute('src', url);
            document.head.appendChild(scriptNode);
            console.log('library loaded: ', url);
            break;
          default:
            console.log('ERROR: library not loaded: ', url);
        }
      }
    };
    ajax.send(null);
  };


  /*
  	The "get-info" service
  	@param {Object} params the hash of the parameters to pass to the request
  	@option params {String} name the immutable name of an existing template
   */

  SandCage.getInfo = function(params, onsuccess) {
    if ((params == null) || params === {}) {
      return false;
    }
    if (onsuccess == null) {
      return false;
    }
    return this.call('get-info', params, '', onsuccess);
  };


  /*
  	The "list-files" service
  	@param {Object} params the hash of the parameters to pass to the request
  	@option params {String} name the immutable name of an existing template
   */

  SandCage.listFiles = function(params, onsuccess) {
    if ((params == null) || params === {}) {
      return false;
    }
    if (onsuccess == null) {
      return false;
    }
    return this.call('list-files', params, '', onsuccess);
  };


  /*
  	The "schedule-tasks" service
  	@param {Object} params the hash of the parameters to pass to the request
  	@option params {String} name the immutable name of an existing template
  	@param {String} callback_endpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/schedule_tasks#callbacks for an example
  	@param {Function} onsuccess an optional callback to execute when the API call is successfully made
   */

  SandCage.scheduleFiles = function(params, callback_endpoint, onsuccess) {
    if (callback_endpoint == null) {
      callback_endpoint = '';
    }
    if ((params == null) || params === {}) {
      return false;
    }
    return this.call('schedule-tasks', params, callback_endpoint, onsuccess);
  };


  /*
  	The "destroy-files" service
  	@param {Object} params the hash of the parameters to pass to the request
  	@option params {String} name the immutable name of an existing template
  	@param {String} callback_endpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/destroy_files#callbacks for an example
  	@param {Function} onsuccess an optional callback to execute when the API call is successfully made
   */

  SandCage.destroyFiles = function(params, callback_endpoint, onsuccess) {
    if (callback_endpoint == null) {
      callback_endpoint = '';
    }
    if ((params == null) || params === {}) {
      return false;
    }
    return this.call('destroy-files', params, callback_endpoint, onsuccess);
  };

  return SandCage;

})();
