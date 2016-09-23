module.exports = function(grunt) {
  'use strict';

  var config = {
    pkg: grunt.file.readJSON('package.json')
  };

  grunt.util._.extend(config, require('./tasks/options'));

  grunt.loadTasks('tasks');
  grunt.initConfig(config);
  require('load-grunt-tasks')(grunt);
};
