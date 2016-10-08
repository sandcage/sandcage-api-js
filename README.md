# sandcage-api-js

sandcage-api-js is a JavaScript library for interfacing with SandCage's API. The API documentation can be found at https://www.sandcage.com/docs/0.2/


### Table of Contents
* [Requirements](https://github.com/sandcage/sandcage-api-js/blob/master/README.md#requirements)
* [Usage](https://github.com/sandcage/sandcage-api-js/blob/master/README.md#usage)
* [Examples](https://github.com/sandcage/sandcage-api-js/tree/master/examples)
* [Contributing](https://github.com/sandcage/sandcage-api-js/blob/master/README.md#contribute)
* [Contact Us](https://www.sandcage.com/contact)


<a name="requirements" />
##Requirements

* A SandCage account, in order to get your SandCage API Key. Once logged into SandCage get your API Key at https://www.sandcage.com/panel/api_key


<a name="usage" />
##Usage

```javascript
var sandcage = SandCage('[YOUR SANDCAGE API KEY]');
sandcage.SandCage.listFiles({}, function(resp) {
	console.log(resp);
})
```


<a name="contribute" />
##Contributing

We are open to suggestions and code revisions, however there are some rules and limitations that you might want to consider first.

* Code that you contribute will automatically be licensed under the [Apache License Version 2.0](https://github.com/sandcage/sandcage-api-js/blob/master/LICENSE).
* Third party code will be reviewed, tested and possibly modified before being released.

These basic rules help ensure that this code remains Open Source and compatible with Apache 2.0 license. All contributions will be added to the changelog and appear in every release.