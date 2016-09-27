import gulp from 'gulp';
import config from './config';
import concat from 'gulp-concat';

const bowerCssFiles = [
    './lib/angular-common-modals/dist/angular-mms-common-modals.css',
    './lib/angular-input-utilities/dist/angular-input-utilities.css'
];

export default function() {
    'use strict';
    return gulp.src([].concat(bowerCssFiles, `${config.get('buildRoot')}/${config.get('appName')}.${config.get('appVersion')}.css`))
        .pipe(concat(`${config.get('appName')}.${config.get('appVersion')}.css`))
        .pipe(gulp.dest(config.buildTarget()));
}
