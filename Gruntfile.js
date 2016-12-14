'use strict';

module.exports = function(grunt) {
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.initConfig({ pkg: grunt.file.readJSON('package.json'),
watch: {
	less: {
		files: 'core/less/**/*.less',
		tasks: 'less'
	}
},
less: {
    default: {
        options: {
            paths: ['core/less'],
            yuicompress: true
        },
        files: {
            'public/pages/css/pages.css': 'core/less/pages.less'
        }
    }
},
copy: {
  main: {
    src: ['**/*',  '!**/node_modules/**','!.gitgnore','!package.json','!Gruntfile.js','!gulpfile.js'],
    expand: true,
    cwd: '',
    dest: 'dist',
  }
},
cssmin: {
  minify: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    expand: true,
    cwd: 'dist/public/css/',
    src: ['*.css', '!*.min.css'],
    dest: 'dist/public/css/',
    ext: '.css'
  }
},
uglify: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    my_target: {
      files: [{
          expand: true,
          cwd: 'dist/public/js/',
          src: '**/*.js',
          dest: 'dist/public/js/'
      }]
    }
}
});

grunt.registerTask(
  'build',
  'Compiles all of the public and copies the files to the build directory.',
  ['copy','cssmin','uglify']
);

};
