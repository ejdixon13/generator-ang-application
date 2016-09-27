import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import config from './config';

export default function () {
    return gulp.src(config.get('imgFiles'))
        .pipe(imagemin())
        .pipe(gulp.dest(`${config.buildTarget()}/img`));
}
