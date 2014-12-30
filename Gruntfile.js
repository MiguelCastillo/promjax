//
// http://24ways.org/2013/grunt-is-not-weird-and-hard/
//
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
      test: {
        options: {
          port: 8112,
          hostname: 'localhost'
        }
      },
      keepalive: {
        options: {
          port: 8119,
          host: "localhost",
          keepalive: true,
          open: "http://localhost:8119/tests/SpecRunner.html"
        }
      }
    },
    mocha: {
      test: {
        options: {
          log: true,
          logErrors: true,
          reporter: "Spec",
          run: false,
          timeout: 10000,
          urls: ["http://localhost:8112/tests/SpecRunner.html"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-mocha");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.registerTask("server", ["connect:keepalive"]);
  grunt.registerTask("test", ["connect:test", "mocha:test"]);
};
