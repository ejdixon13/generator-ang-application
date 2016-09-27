/**
 * Created by ericjohndixon on 2/22/16.
 */
import gulp from 'gulp';
import inject from 'gulp-inject';
import config from './config';

export default function() {
    var target = gulp.src(config.get('mainScssFiles'));

    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([ config.get('cssFiles')[1] ], {read: false});

    return target.pipe(inject(sources, {starttag: '/* inject:imports */',
            endtag: '/* endinject */',
            transform: function(filepath){
                return '@import ".' + filepath + '";';
            }}))
        .pipe(gulp.dest('./styles'));
}
