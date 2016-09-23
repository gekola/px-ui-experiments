module.exports = {
  clean: {
    build: ['dist', 'public/index.html', 'public/polymer-loader.vulcanized.html', 'public/polymer-loader.html']
  },
  copy: {
    dist: {
      files: [
        {
          expand: true,
          cwd: 'public',
          src: [
            'index.html',
            'polymer-loader.vulcanized.html',
            'bower_components/webcomponentsjs/webcomponents-lite.js',
            'bower_components/px/dist/px.min.js',
            'bower_components/es6-promise/dist/es6-promise.min.js',
            'bower_components/font-awesome/fonts/*',
            'bower_components/px-typography-design/type/*'
          ],
          dest: 'dist/'
        }
      ]
    },
    serve: {
      files: [
        {
          expand: true,
          cwd: 'public',
          src: ['polymer-loader.html'],
          rename: function (src, dest) {
            return 'public/polymer-loader.vulcanized.html';
          }
        }
      ]
    }

  },
  express: {
    server: {
      options: {
        bases: 'public',
        server: './index.js'
      }
    }
  },
  pug: {
    compile: {
      files: [{
        cwd: 'src/pug/',
        src: '**/*.pug',
        dest: 'public',
        expand: true,
        ext: '.html'
      }]
    }
  },
  vulcanize: {
    dist: {
      options: {
        inlineScripts: true,
        inlineCss: true,
        stripComments: true
      },
      files: {
        'public/polymer-loader.vulcanized.html': 'public/polymer-loader.html'
      }
    }
  }
};
