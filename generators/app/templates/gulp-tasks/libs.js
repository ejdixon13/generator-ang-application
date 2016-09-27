import gulp from 'gulp';
import config from './config';

export default function () {
    gulp.src(config.get('libFiles'))
        .pipe(gulp.dest(`${config.buildTarget()}/lib`));
}
