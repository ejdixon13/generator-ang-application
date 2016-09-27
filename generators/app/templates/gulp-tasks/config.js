import configManager from 'lds-config-manager';
import minimist from 'minimist';
import pkg from './../package.json';


const buildRoot = './build', //where to build to. Do not include trailing
    cssFiles = ['./styles/**/*.scss', './app/**/*.scss'],
    mainScssFiles = './styles/main.scss',
    htmlFiles = ['*.html', 'app/**/*.html'],
    testFiles = ['app.js', './app/**/*.js'],
    jsFiles = testFiles.concat('!**/*_test.js'),
    imgFiles = ['./img/**/*'],
    libFiles = ['./lib/**/*', './lib-custom/**/*'],
    appName = pkg.name,
    appVersion = pkg.version,
    buildName = pkg.version,
    staticRoot = '';



configManager
    .init({ buildRoot, buildName, cssFiles, mainScssFiles, htmlFiles, testFiles, jsFiles, imgFiles, libFiles, appName, appVersion, staticRoot})
    .merge( minimist(process.argv.slice(2)) );

configManager.buildTarget = () => `${configManager.get('buildRoot')}`;

export default configManager;
