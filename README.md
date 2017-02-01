promjax
=======

[![Greenkeeper badge](https://badges.greenkeeper.io/MiguelCastillo/promjax.svg)](https://greenkeeper.io/)

Promise based Ajax provider - xmlhttprequest and promises.

> promjax *only* executes asynchronous requests and does not provide a way to configure your requests to run *synchronously*.

> **Promises must be polyfilled - for unit testing purposes, promjax uses [spromise](https://github.com/MiguelCastillo/spromise)**

### API

#### promjax(options : object)

Method that will create an `xmlhttprequest` instance to make an Ajax request.  Returns [promise](https://github.com/MiguelCastillo/spromise)

Most of the supported options in promjax are just simple pass through right into the underlying `xmlhttprequest` object.  So if there are specific questions about the options documented here, please feel free to refer to [the doc](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).  Or go ahead an log an issue and I will be happy to help.

- **`options`** *{object | string}* - Configuration for the Ajax call.  If `options` is a string, then options is internally coerced to the `url` of the request.
  - **`url`** *{string}* - end point where the ajax request is going to.
  - **`method`** *{string}* - HTTP verb for the request. Default is `GET`.  There are really no restrictions imposed by `promjax` on the verbs, so whatever is passed in will be used; only limited to what the underlying `xmlhttprequest` implementation supports.
  - **`data`** *{object}* - Data to be sent along with the request.  No restrictions on this.  Whatever the underlying `xmlhttprequest` supports is what you are limited to.
  - **`headers`** *{object}* - collection of key/value pair of header name and header value.
  - **`user`** *{string}* - value as defined by W3C. [MDN link](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
  - **`password`** *{string}* - value as defined by W3C. [MDN link](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
  - **`transform`** *{function}* - function that is called with the responseText when the Ajax request has completed. The function is called to give you a chance to process your data right before the deferred promise is resolved, which is really useful when converting responses like JSON before the reponse is handed back to the calling code.
  - **`success`** *{function}* - function that is called when the Ajax request is successful and after the response is transformed. It is called with the `result` first parameter and the `request` as the second parameter. Success is when the server sends back a 2xx response code.
  - **`error`** *{function}* - function that is called when the Ajax request fails. This function is called with the XHR request object. An error is when the server sends back anything other than a 2xx response code.
  - **`stateChange`** *{function}* - function that is called every time an XHR request changes state. E.g. from LOADING to DONE. This function is called with the XHR request object and the options for the Ajax request.

##### Examples

1- Ajax request for an HTML document. The response is just the string.

``` javascript
ajax("SpecRunner.html").then(function(response) {
  console.log(response);
});
```

2- Ajax request with an `options` object with a URL property. The response is JSON.

``` javascript
ajax({
  url: "json/artists.json"
})
.then(function(response) {
  console.log(response);
});
```

3- Ajax request with an `options` object specifying a `transform` function. The response is proccessed by JSON.parse before the result is sent back to the client code.

``` javascript
ajax({
  url: "json/artists.json",
  transform: JSON.parse
})
.then(function(response) {
  console.log(response);
});
```

4- Ajax request with a success handler. Use the success handler when you need to get a hold of the response as well as the XHR request object.

``` javascript
ajax({
  url: "json/artists.json",
  transform: JSON.parse,
  success: function(response, xhr) {
    console.log(response, xhr);
  }
});
```

5- Specify global success and error handlers that every request goes through.

``` javascript
// success is called each time an XHR request is successful - The server sends any
// 2xx response code.
ajax.success = function(response, xhr) {
  console.log(response, xhr);
};

// error is called each time an XHR request is NOT successful - The server sends
// anything that is NOT a 2xx response code.
ajax.error = function(xhr) {
  console.log(xhr);
};

ajax("json/artists.json");
```

6- Configure headers that are added to every XHR request

``` javascript
// Set headers to be sent with every XHR reqest.
ajax.headers["test-header"] = "Some string";

// Request will have the "test-header" in the request to the server.
ajax("json/artists.json");
```

### Install

#### From npm

```
npm install promjax
```
