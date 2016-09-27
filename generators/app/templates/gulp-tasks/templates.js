import gulp from 'gulp';
import ngtemplate from 'gulp-angular-templatecache';
import config from './config';


export default function () {
    return gulp.src(config.get('htmlFiles')[1])
        .pipe(ngtemplate('ngtemplates.js', {
            module: config.get('appName'),
            root: 'app/'
        }))
        .pipe(gulp.dest(`${config.buildTarget()}/generated`));
}
