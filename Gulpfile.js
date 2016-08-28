'use strict';
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

var paths = {
  src: {
    scripts: ['client/app/**/*.js'],
    html: ['client/app/**/*.html', 'client/index.html'],
    styles: ['client/styles/style.css']
  },
  server: 'server/server.js'
};
// Start our node server using nodemon
gulp.task('serve', function () {
  nodemon({
    script: paths.server,
    ignore: 'node_modules/**/*.js'
  });
});
// Any changes made to your client side code will
// automagically refresh your page with the new changes
gulp.task('start', ['serve'], function () {
  browserSync.init({
    notify: true,
    injectChanges: true,
    files: paths.src.scripts.concat(paths.src.html, paths.src.style),
    proxy: 'localhost:8000'
  });
});