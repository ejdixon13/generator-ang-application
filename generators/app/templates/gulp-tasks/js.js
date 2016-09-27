import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import util from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import ngannotate from 'gulp-ng-annotate';
import uglify from 'gulp-uglify';
import add from 'gulp-add-src';
import concat from 'gulp-concat';
import config from './config';
import del from 'del';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';

export default function () {
    const bundler = browserify({
        debug: true
    });

    bundler.transform(babelify);
    bundler.add('./app.js');
    bundler.add(`${config.buildTarget()}/generated/ngtemplates.js`);

    return bundler.bundle()
        .on('error', onErrorGenFunc)
        .on('end', () => del([`${config.buildTarget()}/generated`]))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(ngannotate())
        .pipe(gulpif(!util.env.dev, uglify({ mangle: false })))
        //.pipe(add.append([`${config.buildTarget()}/generated/ngtemplates.js`]))
        .pipe(concat(`${config.get().appName}.${config.get().appVersion}.js`))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.buildTarget()));


    /******************************************************************************************
     * ERROR function
     * ****************************************************************************************/
    function onErrorGenFunc(err) {
        console.log(err.toString());
        this.emit('end');
    }
}

