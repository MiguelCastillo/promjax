define(["dist/promjax"], function(ajax) {

  describe("Ajax test suite", function() {
    describe("When requesting 'SpecRunner.html'", function() {
      var result;
      beforeEach(function() {
        return ajax("SpecRunner.html")
          .then(function(_result) {
            result  = _result;
          });
      });

      describe("and request is successful", function() {
        it("then result is a string", function() {
          expect(result).to.be.a("string");
        });

        it("then result is not an empty string", function() {
          expect(result.length).to.not.equal(0);
        });
      });
    });


    describe("When requesting 'SpecRunner.html' with success handler", function() {
      var result, request;
      beforeEach(function() {
        return ajax({
          url: "SpecRunner.html",
          success: function(_result, _request) {
            result = _result;
            request = _request;
          }
        });
      });

      describe("and request is successful", function() {
        it("then result is a string", function() {
          expect(result).to.be.a("string");
        });

        it("then result is not an empty string", function() {
          expect(result.length).to.not.equal(0);
        });

        it("then result is equal to request.responseText", function() {
          expect(result).to.equal(request.responseText);
        });

        it("then result is not empty", function() {
          expect(request.responseText.length).to.not.equal(0);
        });

        it("then state is 200", function() {
          expect(request.status).to.equal(200);
        });
      });
    });


    describe("When requesting 'artists.json'", function() {
      var result;
      beforeEach(function() {
        return ajax({
            url: "json/artists.json"
          })
          .then(function(_result) {
            result = _result;
          });
      });

      describe("and request is successful", function() {
        it("then result is JSON", function() {
          expect(result).to.be.an("object");
        });
      });
    });


    describe("When requesting 'artists.json' with success handler", function() {
      var result, request;
      beforeEach(function() {
        return ajax({
          url: "json/artists.json",
          success: function(_result, _request) {
            result = _result;
            request = _request;
          }
        });
      });

      describe("and request is successful", function() {
        it("then result is JSON", function() {
          expect(result).to.be.an("object");
        });

        it("then result is not equal to request.responseText", function() {
          expect(result).to.not.equal(request.responseText);
        });

        it("then responseText is a string", function() {
          expect(request.responseText).to.be.a("string");
        });

        it("then responseText is a string", function() {
          expect(request.responseText).to.be.a("string");
        });

        it("then state is 200", function() {
          expect(request.status).to.equal(200);
        });
      });
    });


    describe("When requesting 'artists.json' with `transform = JSON.parse`", function() {
      var result, request;
      beforeEach(function() {
        return ajax({
          url:"json/artists.json",
          transform: JSON.parse,
          success: function(_result, _request) {
            result  = _result;
            request = _request;
          }
        });
      });

      describe("and request is successful", function() {
        it("then result is JSON", function() {
          expect(result).to.be.an("object");
        });

        it("then result is not equal to request.responseText", function() {
          expect(result).to.not.equal(request.responseText);
        });

        it("then responseText is a string", function() {
          expect(request.responseText).to.be.a("string");
        });

        it("then responseText is a string", function() {
          expect(request.responseText).to.be.a("string");
        });

        it("then state is 200", function() {
          expect(request.status).to.equal(200);
        });
      });
    });

  });
});
