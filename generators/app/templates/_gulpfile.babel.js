import gulp from 'gulp';
import imagesTask from './gulp-tasks/images';
import jsTask from './gulp-tasks/js';
import eslintTask from './gulp-tasks/eslint';
import libsTask from './gulp-tasks/libs';
import localTask from './gulp-tasks/local';
import sassTask from './gulp-tasks/sass';
import sassInject from './gulp-tasks/sass-inject';
import documentTemplatesTask from './gulp-tasks/document-templates.js';
import templatesTask from './gulp-tasks/templates';
import unitTestTask from './gulp-tasks/unit-tests';
import cleanTask from './gulp-tasks/clean.js';
import bowerCssTask from './gulp-tasks/bowerCss';
import runSequence from 'run-sequence';
import ngConstantTask from './gulp-tasks/ngConstant';

import fs from 'fs';

//This is the code style enforcement task
gulp.task('eslint', eslintTask);

//generate our angular templates
gulp.task('templates', templatesTask);

gulp.task('images', imagesTask);

//copy the bower included libs
gulp.task('libs', libsTask);

/*
 * Calls css tasks in right order
 */
gulp.task('uberCss', ['sass'], function(){
  gulp.start('bowerCss');
});

/*
 * bowerCss task to combine bower css and compiled sass into one file
 */
gulp.task('bowerCss', bowerCssTask);

/*
 * sass task
 * - compiles and concatinates scss into css
 * - creates sourcemaps for the scss
 * - adds vendor prefixes to for all major browser vendors for last two versions.
 */
gulp.task('sass', sassTask);


/*
 * sass inject task
 * - injects the import file statement into our main.scss file
 */
gulp.task('sassInject', sassInject);


/*
 * js task
 *
 * prerequisit tasks: templates
 *
 * task features:
 * - browserify: bundles required js to a single js file,
 * - babelify: transforms es6 code to es5
 * - sourcemaps: generates source maps for debugging
 * - ngannotate: adds min-safe angular dependency injection
 *               annotations for functions which include the
 *               'ngInject'; prolouge.
 * - ugligfy: minifies javascript to reduce network traffic
 * - streamify: transforms functions to work with node streams
 *
 * description: This task build the JS from source files written
 * in current, but unimplemented standards into JS optimized for
 * execution browsers.
 */
gulp.task('js', ['templates'], jsTask);

/*
 * unitTest task depends on eslint and templates and js
 * - runs unit tests against the project
 * REMOVED 'eslint'
 */
gulp.task('unitTests', ['js'], unitTestTask);


/*
 * standAloneUnitTests
 */
gulp.task('unitTester', unitTestTask);
// gulp.task('cachebust', ['sass', 'js'], cachebustTask);

gulp.task('documentTemplates', documentTemplatesTask);


gulp.task('fileReader', function(){
  var fileContent = fs.readFileSync("app.js", "utf8");
  var index = fileContent.indexOf('* W');
  console.log('index: ' + index);

});

/*
 * build task depends on sass, js, libs, images and cachebust
 * - writes cachebust manifest JSON file
 * - rewrites references in index.html to cachebusted file names
 * - writes index.html to destination target
 */

gulp.task('build', ['uberCss', 'ngConstantTask', 'js', 'libs', 'images', 'documentTemplates'] );


/**
 * create version constant
 */
gulp.task('ngConstantTask', ngConstantTask);

/*
 * remove all build artifacts
 */
gulp.task('clean', cleanTask);

gulp.task('cleanBuild', ['clean'], function(){
  gulp.start('build');
});

/*
 * local task
 *
 * prerequisit tasks: js, sass
 *
 * task features:
 * -    browserSync: Starts a static server
 * -    watch: watches specific files for changes
 *             then executes a callback.
 *
 * description: Starts a local static server and
 *              watches relevant files for changes.
 *              When changes are detected, the connected
 *              browser is reloaded.
 */
gulp.task('local', ['cleanBuild'], localTask);

gulp.task('dev', ['cleanBuild']);


/*
 * default task
 *
 * prerequisit tasks: local
 *
 * task features: none
 *
 * description: All gulp files should include
 * a default task. This taks simply runs the
 * local task.
 */
gulp.task('default', ['local'], () => {});
