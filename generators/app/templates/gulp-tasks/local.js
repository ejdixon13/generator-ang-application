import { spawn } from 'cross-spawn';
import gulp from 'gulp';
// import historyApiFallback from 'connect-history-api-fallback';
import browserSync from 'browser-sync';
import config from './config';
import watch from 'gulp-watch';
import url from 'url';
import proxy from 'proxy-middleware';

const jsFiles = config.get('jsFiles'),
  documentHtmlFiles = config.get('htmlFiles')[0],
  componentHtmlFiles = config.get('htmlFiles')[1],
  cssFiles = config.get('cssFiles');


export default function () {

    //start server
    //let appProcess = spawn('npm', ['start'], {
    //    stdio: 'inherit'
    //});


    /**
     * Local Development settings
     * Use these settings to develop on port 9080
     */
    var port = 9002;
    var host = "localhost.ldschurch.org";

    //var apiProxyOptions = url.parse('http://localhost.ldschurch.org:9080/assignments/meeting/api');

    //start up browsersync
    //browserSync({
    //    server: {
    //        baseDir: "./",
    //        routes: {
    //            "/": "jr-asg"
    //        }
    //    },
    //    host: host,
    //    port: port,
    //    open: false,
    //    scriptPath: function (path) {
    //        return "http://" + host + ':' + port + path;
    //    },
    //    socket: {
    //        domain: "http://" + host + ':' + port
    //    }
    //});

    /**
     * Used for mirroring on external devices
     * To view on external devices use external url provided by browserSync.
     * NOTE: This only works with the a mocked backend and not live data. Set the httpbackend setup to true to mock backend.
     */
    //For api calls
    //var apiProxyOptions = url.parse('http://localhost.ldschurch.org:9080/assignments/meeting/api');
    ////var apiProxyOptions = url.parse('https://apps-test.ldschurch.org/assignments/meeting/api'); DOESN'T WORK because of CORS
    //apiProxyOptions.route = '/api';
    browserSync.init({
        server: {
            baseDir: "./build",
            //middleware: [proxy(apiProxyOptions)]
        }
    });

    //set the file watchers and walk away
    gulp.task('js-watch', ['js'], browserSync.reload);
    gulp.task('doc-html-watch', ['documentTemplates'], browserSync.reload);
    gulp.task('app-html-watch', ['js'], browserSync.reload);

    gulp.task('watch', function(){
        watch(documentHtmlFiles, function(){ gulp.start('doc-html-watch'); });
        watch(componentHtmlFiles, function(){ gulp.start('app-html-watch'); });
        watch(jsFiles, function(){ gulp.start('js-watch'); });
        watch(cssFiles, {events : ['change']}, function(){ gulp.start('sass'); });
        watch(cssFiles, {events : ['add', 'unlink']}, function(){ gulp.start('sassInject'); });
    });
    gulp.start('watch');


    //gulp.watch(jsFiles, ['unitTests'], browserSync.reload);

}
