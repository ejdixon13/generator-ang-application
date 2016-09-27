import gulp from 'gulp';
import eslint from 'gulp-eslint';
import config from './config';

export default function () {
    return gulp.src(config.get().testFiles)
        .pipe(eslint({
            rulePaths: ['eslint-rules']
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}
