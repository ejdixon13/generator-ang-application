import gulp from 'gulp';
import handlebars from 'gulp-compile-handlebars';
import config from './config';

export default function () {

    return gulp.src(config.get('htmlFiles')[0])

        .pipe(handlebars({
            'static-root': config.get('staticRoot'),
            'app-name': config.get('appName'),
            'app-version': config.get('appVersion')
        }))

        .pipe( gulp.dest( config.buildTarget() ) );
}
