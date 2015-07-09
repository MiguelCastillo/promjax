var readyStates = {
  UNSENT           : 0, // open()has not been called yet.
  OPENED           : 1, // send()has not been called yet.
  HEADERS_RECEIVED : 2, // send() has been called, and headers and status are available.
  LOADING          : 3, // Downloading; responseText holds partial data.
  DONE             : 4  // The operation is complete.
};

function Ajax(options) {
  if (typeof(options) === "string") {
    options = {url: options};
  }

  var deferred = Promise.defer();
  var request  = new XMLHttpRequest();
  var url      = options.url;
  var method   = options.method  || "GET";
  var data     = options.data    || null;
  var headers  = options.headers || {};
  var async    = Ajax.async;

  if (!url) {
    throw new TypeError("Must provide a URL");
  }

  if (options.hasOwnProperty("withCredentials")) {
    request.withCredentials = options.withCredentials;
  }

  if (options.hasOwnProperty("timeout")) {
    request.timeout = options.timeout;
  }

  request.onreadystatechange = StateChanged(request, options, deferred);
  request.open(method, url, async, options.user, options.password);

  // Make sure to add all the headers.
  addHeader(request, Ajax.headers);
  addHeader(request, headers);

  request.send(data);
  return deferred.promise;
}

function StateChanged(request, options, deferred) {
  return function StateChangedDelegate() {
    var state = request.readyState;

    // If there is a state change handler, call it with the request object and options.
    if (options.stateChange) {
      options.stateChange(request, options);
    }

    if (state === readyStates.DONE) {
      if (request.status >= 100 && request.status < 300) {
        // Handle response transformation.
        var result = (options.transform || transform)(request.responseText, request.getResponseHeader("Content-Type"));

        // Call global success handler
        Ajax.success(result, request);

        if (options.success) {
          options.success(result, request);
        }

        // Resolve deferred Promise
        deferred.resolve(result);
      }
      else {
        // Call global error handler
        Ajax.error(request);

        if (options.reject) {
          options.reject(request);
        }

        // Reject deferred Promise
        deferred.reject(request);
      }
    }
  };
}

function transform(text, type) {
  var transformHandler = Ajax.transforms[type];
  return transformHandler ? transformHandler(text) : text;
}

function addHeader(request, headers) {
  for (var header in headers) {
    if (headers.hasOwnProperty(header)) {
      request.setRequestHeader(header, headers[header]);
    }
  }
}

// Setup global async to true. ONLY for debugging.
Ajax.async = true;

// Set default headers
Ajax.headers = {};

// Assign transforms to content types
Ajax.transforms = {};
Ajax.transforms["application/json"] = JSON.parse;

// Global handlers for error and success
Ajax.error = function() {};
Ajax.success = function() {};

module.exports = Ajax;
