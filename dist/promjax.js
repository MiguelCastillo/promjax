/*! promjax v1.0.2 - Wed Jul 08 2015 10:03:25. (c) 2015 Miguel Castillo. Licensed under MIT */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.promjax = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */

(function() {
  "use strict";

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
    var request  = new XMLHttpRequest(),
        url      = options.url,
        method   = options.method  || "GET",
        data     = options.data    || null,
        headers  = options.headers || {},
        async    = true;

    if (!url) {
      throw new TypeError("Must provide a URL");
    }

    if (options.hasOwnProperty("withCredentials")) {
      request.withCredentials = options.withCredentials;
    }

    if (options.hasOwnProperty("timeout")) {
      request.timeout = options.timeout;
    }

    request.onreadystatechange = StateChanged.bind(request, options, deferred);
    request.open(method, url, async, options.user, options.password);

    for (var header in headers) {
      if (headers.hasOwnProperty(header)) {
        request.setRequestHeader(header, headers[header]);
      }
    }

    request.send(data);
    return deferred.promise;
  }

  function StateChanged(options, deferred) {
    var request = this,
        state   = request.readyState;

    if (state === readyStates.DONE) {
      if (request.status === 200) {
        var result = (options.transform || transform)(request.responseText, options.responseType);
        deferred.resolve(result, request);
      }
      else {
        deferred.reject(request);
      }
    }
  }

  function transform(text, type) {
    if (type === 'json') {
      return JSON.parse(text);
    }

    return text;
  }

  module.exports = Ajax;
})();

},{}]},{},[1])(1)
});