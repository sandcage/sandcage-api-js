
class SandCage
	SANDCAGE_API={}
	API_VERSION = "0.2"
	ENDPOINT_BASE = "https://api.sandcage.com/#{API_VERSION}/"

	constructor: (@apikey) ->
		if not @apikey
			return {status: 'error', name: 'MissingKey', message: 'Provide your SandCage API Key.'}
		SANDCAGE_API = @

		if not JSON? then loadScript('json2.min.js')
		return @

	@call: (service_endpoint, params, callback_endpoint='', onresult) ->
		payload = key: SANDCAGE_API.apikey
		if callback_endpoint isnt '' then payload.callback_url = callback_endpoint
		for key of params
			payload[key] = params[key]
		payload = JSON.stringify(payload)
		@ajaxCall(service_endpoint, payload, callback_endpoint, onresult)

	@ajaxCall: (service_endpoint, payload, callback_endpoint, onresult) ->
		###
		global: XMLHttpRequest 
		###
		req = new XMLHttpRequest()
		req.open('POST', "#{ENDPOINT_BASE}#{service_endpoint}")
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		req.onreadystatechange = () ->
			if req.readyState isnt 4 then return false
			try
				res = JSON.parse(req.responseText)
			catch _error
				res = {status: 'error', name: 'GenericError', message: _error}
			res ?= {status: 'error', name: 'GenericError', message: 'An error occurred.'}
			if onresult
				onresult(res)
			else
				return false

		req.send(payload)
		
	loadScript = (url) ->
		###
		global: XMLHttpRequest 
		###
		ajax = new XMLHttpRequest()
		ajax.open 'GET', url, false
		ajax.onreadystatechange = ->
			if ajax.readyState is 4
				if ajax.status is 200
					scriptNode = document.createElement('script')
					scriptNode.setAttribute 'type', 'text/javascript'
					scriptNode.setAttribute 'charset', 'UTF-8'
					scriptNode.setAttribute 'src', url
					document.head.appendChild scriptNode
			return

		ajax.send null
		return

	###
	The "get-info" service
	@param {Object} params the hash of the parameters to pass to the request
	@param {Function} onresult an optional callback to execute when the API call is made
	###
	@getInfo: (params, onresult) ->
		if not params? or params is {} then return false
		if not onresult? then return false
		@call('get-info', params, '', onresult)

	###
	The "list-files" service
	@param {Object} params the hash of the parameters to pass to the request
	@param {Function} onresult an optional callback to execute when the API call is made
	###
	@listFiles: (params, onresult) ->
		if not params? or params is {} then return false
		if not onresult? then return false
		@call('list-files', params, '', onresult)

	###
	The "schedule-tasks" service
	@param {Object} params the hash of the parameters to pass to the request
	@param {String} callback_endpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/schedule_tasks#callbacks for an example
	@param {Function} onresult an optional callback to execute when the API call is made
	###
	@scheduleFiles: (params, callback_endpoint='', onresult) ->
		if not params? or params is {} then return false
		@call('schedule-tasks', params, callback_endpoint, onresult)

	###
	The "destroy-files" service
	@param {Object} params the hash of the parameters to pass to the request
	@param {String} callback_endpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/destroy_files#callbacks for an example
	@param {Function} onresult an optional callback to execute when the API call is made
	###
	@destroyFiles: (params, callback_endpoint='', onresult) ->
		if not params? or params is {} then return false
		@call('destroy-files', params, callback_endpoint, onresult)

