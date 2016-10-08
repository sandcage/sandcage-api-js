
class SandCage

	API_VERSION = "0.2"
	ENDPOINT_BASE = "https://api.sandcage.com/#{API_VERSION}/"

	constructor: (@apikey) ->
		if not @apikey
			SandCage.onerror({status: 'error', name: 'MissingKey', message: 'Provide your SandCage API Key.'})
			return false
		self = @

		if not JSON? then loadScript('json2.min.js')
		return @

	@call: (service_endpoint, params, callback_endpoint='', onresult) ->
		payload = key: self.apikey
		if callback_endpoint isnt '' then payload.callback_url = callback_endpoint
		for key of params
			payload[key] = params[key]
		payload = JSON.stringify(payload)
		req = new XMLHttpRequest()
		req.open('POST', "#{ENDPOINT_BASE}#{service_endpoint}")
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		req.onreadystatechange = () ->
			if req.readyState isnt 4 then return
			try
				res = JSON.parse(req.responseText)
			catch e
				res = {status: 'error', name: 'GenericError', message: e}
			res ?= {status: 'error', name: 'GenericError', message: 'An error occured.'}
			if req.status isnt 200
				SandCage.onerror(res)
			else
				if onresult then onresult(res)

		req.send(payload)
	
	@onerror: (err) ->
		console.log 'ERROR: ', {name: err.name, message: err.message, error: err}
		
	loadScript = (url) ->
		ajax = new XMLHttpRequest
		ajax.open 'GET', url, false

		ajax.onreadystatechange = ->
			script = ajax.response or ajax.responseText
			if ajax.readyState == 4
				switch ajax.status
					when 200
						scriptNode = document.createElement('script')
						scriptNode.setAttribute 'type', 'text/javascript'
						scriptNode.setAttribute 'charset', 'UTF-8'
						scriptNode.setAttribute 'src', url
						document.head.appendChild scriptNode
						console.log 'library loaded: ', url
					else
						console.log 'ERROR: library not loaded: ', url
			return

		ajax.send null
		return

	###
	The "get-info" service
	@param {Object} params the hash of the parameters to pass to the request
	@option params {String} name the immutable name of an existing template
	###
	@getInfo: (params, onsuccess) ->
		if not params? or params is {} then return false
		if not onsuccess? then return false
		@call('get-info', params, '', onsuccess)

	###
	The "list-files" service
	@param {Object} params the hash of the parameters to pass to the request
	@option params {String} name the immutable name of an existing template
	###
	@listFiles: (params, onsuccess) ->
		if not params? or params is {} then return false
		if not onsuccess? then return false
		@call('list-files', params, '', onsuccess)

	###
	The "schedule-tasks" service
	@param {Object} params the hash of the parameters to pass to the request
	@option params {String} name the immutable name of an existing template
	@param {String} callback_endpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/schedule_tasks#callbacks for an example
	@param {Function} onsuccess an optional callback to execute when the API call is successfully made
	###
	@scheduleFiles: (params, callback_endpoint='', onsuccess) ->
		if not params? or params is {} then return false
		@call('schedule-tasks', params, callback_endpoint, onsuccess)

	###
	The "destroy-files" service
	@param {Object} params the hash of the parameters to pass to the request
	@option params {String} name the immutable name of an existing template
	@param {String} callback_endpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/destroy_files#callbacks for an example
	@param {Function} onsuccess an optional callback to execute when the API call is successfully made
	###
	@destroyFiles: (params, callback_endpoint='', onsuccess) ->
		if not params? or params is {} then return false
		@call('destroy-files', params, callback_endpoint, onsuccess)

