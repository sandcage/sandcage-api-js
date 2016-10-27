var SandCage;

SandCage = (function() {
  var API_VERSION, ENDPOINT_BASE, SANDCAGE_API, loadScript;

  SANDCAGE_API = {};

  API_VERSION = "0.2";

  ENDPOINT_BASE = "https://api.sandcage.com/" + API_VERSION + "/";

  function SandCage(apikey) {
    this.apikey = apikey;
    if (!this.apikey) {
      SandCage.onerror({
        status: 'error',
        name: 'MissingKey',
        message: 'Provide your SandCage API Key.'
      });
      return false;
    }
    SANDCAGE_API = this;
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
      key: SANDCAGE_API.apikey
    };
    if (callback_endpoint !== '') {
      payload.callback_url = callback_endpoint;
    }
    for (key in params) {
      payload[key] = params[key];
    }
    payload = JSON.stringify(payload);

    /*
    		global: XMLHttpRequest
     */
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
      if (onresult) {
        return onresult(res);
      } else {
        return false;
      }
    };
    return req.send(payload);
  };

  loadScript = function(url) {

    /*
    		global: XMLHttpRequest
     */
    var ajax;
    ajax = new XMLHttpRequest();
    ajax.open('GET', url, false);
    ajax.onreadystatechange = function() {
      var scriptNode;
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          scriptNode = document.createElement('script');
          scriptNode.setAttribute('type', 'text/javascript');
          scriptNode.setAttribute('charset', 'UTF-8');
          scriptNode.setAttribute('src', url);
          document.head.appendChild(scriptNode);
        }
      }
    };
    ajax.send(null);
  };


  /*
  	The "get-info" service
  	@param {Object} params the hash of the parameters to pass to the request
  	@option params {String} name the immutable name of an existing template
  	@param {Function} onresult an optional callback to execute when the API call is made
   */

  SandCage.getInfo = function(params, onresult) {
    if ((params == null) || params === {}) {
      return false;
    }
    if (onresult == null) {
      return false;
    }
    return this.call('get-info', params, '', onresult);
  };


  /*
  	The "list-files" service
  	@param {Object} params the hash of the parameters to pass to the request
  	@option params {String} name the immutable name of an existing template
  	@param {Function} onresult an optional callback to execute when the API call is made
   */

  SandCage.listFiles = function(params, onresult) {
    if ((params == null) || params === {}) {
      return false;
    }
    if (onresult == null) {
      return false;
    }
    return this.call('list-files', params, '', onresult);
  };


  /*
  	The "schedule-tasks" service
  	@param {Object} params the hash of the parameters to pass to the request
  	@option params {String} name the immutable name of an existing template
  	@param {String} callback_endpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/schedule_tasks#callbacks for an example
  	@param {Function} onresult an optional callback to execute when the API call is made
   */

  SandCage.scheduleFiles = function(params, callback_endpoint, onresult) {
    if (callback_endpoint == null) {
      callback_endpoint = '';
    }
    if ((params == null) || params === {}) {
      return false;
    }
    return this.call('schedule-tasks', params, callback_endpoint, onresult);
  };


  /*
  	The "destroy-files" service
  	@param {Object} params the hash of the parameters to pass to the request
  	@option params {String} name the immutable name of an existing template
  	@param {String} callback_endpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/destroy_files#callbacks for an example
  	@param {Function} onresult an optional callback to execute when the API call is made
   */

  SandCage.destroyFiles = function(params, callback_endpoint, onresult) {
    if (callback_endpoint == null) {
      callback_endpoint = '';
    }
    if ((params == null) || params === {}) {
      return false;
    }
    return this.call('destroy-files', params, callback_endpoint, onresult);
  };

  return SandCage;

})();
