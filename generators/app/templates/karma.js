//import buildConfig from './gulp-tasks/config.js';

module.exports = function (config) {
    config.set({

        files: [
            //source files
            'lib/angular/angular.min.js',
            'lib/angular-resource/angular-resource.min.js',
            'lib/angular-animate/angular-animate.min.js',
            'lib/angular-route/angular-route.min.js',
            'lib/angular-mocks/angular-mocks.js',
            'lib/angular-messages/angular-messages.min.js',
            'lib/angular-ui-router/release/angular-ui-router.js',
            'lib/underscore/underscore-min.js',
            'lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'lib/angular-breadcrumb/release/angular-breadcrumb.min.js',
            'lib/angular-input-utilities/dist/angular-input-utilities.min.js',
            'lib/angular-common-modals/dist/angular-mms-common-modals.min.js',
            'lib/spin.js/spin.js',
            'lib/angular-spinner/angular-spinner.js',
            'lib/angular-toastr/dist/angular-toastr.tpls.js',
            'lib/angular-ui-date/dist/date.js',
            'lib/angular-hover-edit/dist/angular-hover-edit.min.js',
            'lib/angular-http-helper/dist/angular-http-helper.min.js',
            'lib/angular-toastr-exception/dist/angular-toastr-exception.min.js',
            'lib/jquery/dist/jquery.min.js',

            //main app module
            'app.js',

            //everything else
            'app/**/*.js',
            'app/**/*.html'
        ],

        preprocessors: {
            '{*,app/**/*}.js': ['browserify', 'coverage'],
            'app/**/*.html' : ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // If your build process changes the path to your templates,
            // use stripPrefix and prependPrefix to adjust it.
            //stripPrefix: "source/path/to/templates/.*/",
            //prependPrefix: "web/path/to/templates/",

            // the name of the Angular module to create
            moduleName: "my.templates"
        },

        browserify: {
            debug: true,
            transform: ['babelify']
        },
        client: {
            captureConsole: true
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/',
            includeAllSources: true,

            reporters: [{
                type: 'lcov',
                subdir: '.'
            }, {
                type: 'text-summary'
            }]
        },

        browsers: ['Chrome','PhantomJS'],
        frameworks: ['browserify', 'source-map-support', 'mocha', 'chai'],
        reporters: ['spec', 'coverage'],
        port: 9876,
        colors: true,
        autoWatch: true
    });
};
