var SandCage;

SandCage = (function() {
  var API_VERSION, ENDPOINT_BASE, SANDCAGE_API, loadScript;

  SANDCAGE_API = {};

  API_VERSION = "0.2";

  ENDPOINT_BASE = "https://api.sandcage.com/" + API_VERSION + "/";

  function SandCage(apikey) {
    this.apikey = apikey;
    if (!this.apikey) {
      return {
        status: 'error',
        name: 'MissingKey',
        message: 'Provide your SandCage API Key.'
      };
    }
    SANDCAGE_API = this;
    if (typeof JSON === "undefined" || JSON === null) {
      loadScript('json2.min.js');
    }
    return this;
  }

  SandCage.call = function(service_endpoint, params, callback_endpoint, onresult) {
    var key, payload;
    if (callback_endpoint == null) {
      callback_endpoint = '';
    }
    if ((params == null) || params === {}) {
      return false;
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
    return this.ajaxCall(service_endpoint, payload, callback_endpoint, onresult);
  };

  SandCage.ajaxCall = function(service_endpoint, payload, callback_endpoint, onresult) {

    /*
    global: XMLHttpRequest
     */
    var req;
    req = new XMLHttpRequest();
    req.open('POST', "" + ENDPOINT_BASE + service_endpoint, false);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function() {
      var res;
      if (req.readyState !== 4) {
        return false;
      }
      res = JSON.parse(req.responseText);
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
    var req;
    req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.onreadystatechange = function() {
      var scriptNode;
      if (req.readyState === 4) {
        if (req.status === 200) {
          scriptNode = document.createElement('script');
          scriptNode.setAttribute('type', 'text/javascript');
          scriptNode.setAttribute('charset', 'UTF-8');
          scriptNode.setAttribute('src', url);
          document.head.appendChild(scriptNode);
        }
      }
    };
    req.send(null);
  };


  /*
  The "get-info" service
  @param {Object} params the hash of the parameters to pass to the request
  @param {Function} onresult an optional callback to execute when the API call is made
   */

  SandCage.getInfo = function(params, onresult) {
    if (onresult == null) {
      return false;
    }
    return this.call('get-info', params, '', onresult);
  };


  /*
  The "list-files" service
  @param {Object} params the hash of the parameters to pass to the request
  @param {Function} onresult an optional callback to execute when the API call is made
   */

  SandCage.listFiles = function(params, onresult) {
    if (onresult == null) {
      return false;
    }
    return this.call('list-files', params, '', onresult);
  };


  /*
  The "schedule-tasks" service
  @param {Object} params the hash of the parameters to pass to the request
  @param {String} callback_endpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/schedule_tasks#callbacks for an example
  @param {Function} onresult an optional callback to execute when the API call is made
   */

  SandCage.scheduleFiles = function(params, callback_endpoint, onresult) {
    return this.call('schedule-tasks', params, callback_endpoint, onresult);
  };


  /*
  The "destroy-files" service
  @param {Object} params the hash of the parameters to pass to the request
  @param {String} callback_endpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/destroy_files#callbacks for an example
  @param {Function} onresult an optional callback to execute when the API call is made
   */

  SandCage.destroyFiles = function(params, callback_endpoint, onresult) {
    return this.call('destroy-files', params, callback_endpoint, onresult);
  };

  return SandCage;

})();
