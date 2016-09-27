import gulp from 'gulp';
import util from 'gulp-util';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import config from './config';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import filter from 'gulp-filter';

export default function () {
    //manages all things css and sass.

    return gulp.src(config.get('mainScssFiles'))
        .pipe(plumber(onErrorGenFunc))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', onErrorGenFunc))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(rename(`${config.get('appName')}.${config.get('appVersion')}.css`))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest( config.buildTarget() ))
        .pipe(filter('**/*.css'))
        .pipe(browserSync.reload({stream:true}));

    /******************************************************************************************
     * ERROR function
     * ****************************************************************************************/
    function onErrorGenFunc(err) {
        util.beep();

        var error
            , message = util.colors.red('\n-----------------------------------');

        message += util.colors.red('\nSass Error!');
        message += util.colors.yellow('\n' + err.message);
        message += util.colors.yellow('\non line: ' + err.line + ' at character: ' + err.column);
        message += util.colors.white('\nin ' + err.file);
        message += util.colors.red('\n-----------------------------------');

        error = new util.PluginError('SASS', {
            message: message
        });

        console.log(error);
        this.emit('end');
    }
}



