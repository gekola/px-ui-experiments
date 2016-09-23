module.exports = function(grunt) {
  grunt.registerTask('dist', [
    'clean:build',
    'pug',
    'vulcanize',
    'copy:dist'
  ]);
};
