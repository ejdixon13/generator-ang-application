import gulp from 'gulp';
import ngConstant from 'gulp-ng-constant';
import config from './config';
import rename from 'gulp-rename';

export default function () {
  return ngConstant({
    name: 'app',
    constants: {
      VERSION: config.get('appVersion'),
      DEBUG_INFO_ENABLED: true
    },
    template: config.get('constantTemplate'),
    stream: true
  })
    .pipe(rename('version-constant.js'))
    .pipe(gulp.dest('app/shared/version'));
}
