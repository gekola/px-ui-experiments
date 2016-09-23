module.exports = function(grunt) {
  grunt.registerTask('serve', [
    'clean:build',
    'pug',
    'copy:serve',
    'express',
    'express-keepalive'
  ]);
};
