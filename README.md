promjax
=======

Overly simplified Promise based Ajax provider - xmlhttprequest and promises.  Most of the supported fields in promjax are just simple pass through right into the underlying `xmlhttprequest` object.  So if there are some specific about some of the fields documented here, please feel free to refer to [the doc](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).  Or go ahead an log an issue and I will be happy to help.


### API

#### promjax(options : object)

Method that will create an `xmlhttprequest` instance to make an Ajax request.

@param {object} options - Configuration for the Ajax call.

- @property {string} `url` - end point where the ajax request is going to.
- @property {string} `method` - HTTP verb for the request. Default is `GET`.  There are really no restrictions imposed by `promjax` on the verbs, so whatever is passed in will be used; only limited to what the underlying `xmlhttprequest` implementation supports.
- @property {object} `data` - Data to be sent along with the request.  No restrictions on this.  Whatever the underlying `xmlhttprequest` supports is what you are limited to.
- @property {boolean} `async` - flag to make the request synchronous.  It defaults to true.
- @property {object} `headers` - collection of key/value pair of header name and header value.
- @property {string} `user` - value as defined by W3C. https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
- @property {string} `password` - value as defined by W3C. https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
- @property {string} `responseType` - data type for the response.  Currently, only `json` is supported.  If anything else other than `json` is provided, you will just get the raw `responseText`.  But you can define a `transform` method if you would to pre-process the response before the deferred promise is resolved.
- @property {function} `transform` - is method that is called with responseText when the Ajax request has completed. The method is called right before the deferred promise is resolved to give a chance for external transformations to take place.  This is really useful when converting response like JSON before the reponse is handed back in the resolved promised.


### Install

#### From npm

```
npm install promjax
```
