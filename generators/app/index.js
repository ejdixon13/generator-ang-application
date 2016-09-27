/**
 * Created by ericjohndixon on 3/15/16.
 */
'use strict';

var generators = require('yeoman-generator'),
  _ = require('lodash'),
  chalk = require('chalk'),
  yosay = require('yosay');

var clientLibraryVersions = {
  'jquery'                  :'3.1.0',
  'underscore'              :'1.8.3',
  'lumen-sass'              :'3.0.7',
  'lumen-icon'              :'2.0.3',
  'angular-bootstrap'       :'1.3.2',
  'angular-animate'         :'1.5.8',
  'angular-http-helper'     :'*',
  'angular-messages'        :'1.5.8',
  'angular-touch'           :'1.5.8',
  'angular-breadcrumb'      :'0.4.1',
  'angular-toastr'          :'1.7.0',
  'angular-toastr-exception':'*',
  'angular-input-utilities' :'*',
  'angular-hover-edit'      :'*',
  'angular-spinner'         :'0.8.1',
  'angular-common-modals'   :'angular-mms-common-modals#*'
};


module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    //this.argument('appname', { type: String, required: true});
    //this.appname = _.kebabCase(this.appname);
    //this.log('appname (arg): ' + this.appname);
  },

  initializing : function() {

  },
  prompting: function() {
    this.log(yosay('Welcome to ' + chalk.yellow('ANG-APPLICATION') + ' generator!'));

    return this.prompt([{
      type: 'input',
      name: 'appname',
      message: 'Angular App Name (ng-app)',
      default: 'app'
    }, {
      type: 'input',
      name: 'readmedescription',
      message: 'README description',
      default: 'This is an Angular Application...'
    }, {
        type: 'checkbox',
        name: 'bowerLibraries',
        message: 'Choose the client libraries you would like to use (Angular, Angular-Mocks, Angular-Resource, Angular-UI-Router already included)',
        choices: [
          {name: 'jQuery',                    value: 'jquery',                   checked: true},
          {name: 'Underscore.js',             value: 'underscore',               checked: true},
          {name: 'Lumen Sass',                value: 'lumen-sass',               checked: true},
          {name: 'Lumen Icon',                value: 'lumen-icon',               checked: true},
          {name: 'Angular Bootstrap',         value: 'angular-bootstrap',        checked: true},
          {name: 'Angular Animate',           value: 'angular-animate',          checked: true},
          {name: 'Angular HttpHelper',        value: 'angular-http-helper',      checked: true},
          {name: 'Angular Messages',          value: 'angular-messages',         checked: true},
          {name: 'Angular Touch',             value: 'angular-touch',            checked: true},
          {name: 'Angular Breadcrumb',        value: 'angular-breadcrumb',       checked: true},
          {name: 'Angular Toastr',            value: 'angular-toastr',           checked: true},
          {name: 'Angular Toastr Exception',  value: 'angular-toastr-exception', checked: true},
          {name: 'Angular Input Utilities',   value: 'angular-input-utilities',  checked: true},
          {name: 'Angular Hover Edit',        value: 'angular-hover-edit',       checked: true},
          {name: 'Angular Spinner(spin.js)',  value: 'angular-spinner',          checked: true},
          {name: 'Angular Common MMS Modals', value: 'angular-common-modals',    checked: true}
        ]
      }])
      .then(function (answers) {
        this.appname = answers.appname;
        this.readmedescription = answers.readmedescription;
        this.bowerLibraries = answers.bowerLibraries;
    }.bind(this));
  },
  configuring: function() {

  },
  writing: {
    gulpfile: function() {
      this.fs.copyTpl(
        this.templatePath('_gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js'),
        {
          ngapp: this.appname
        }
      );
      this.fs.copyTpl(this.templatePath('gulp-tasks/**/*.js'), this.destinationPath('gulp-tasks'));
    },
    packageJSON: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          ngapp: this.appname
        }
      );
      this.copy('npmrc', '.npmrc');
    },

    git: function() {
      this.copy('gitignore', '.gitignore');
    },

    bower: function() {
      var bowerJson = {
        name: this.appname,
        license: 'MIT',
        dependencies: {}
      };

      //Add default dependencies
      bowerJson.dependencies['angular'] = '1.5.8';
      bowerJson.dependencies['angular-mocks'] = '1.5.8';
      bowerJson.dependencies['angular-resource'] = '1.5.8';
      bowerJson.dependencies['angular-ui-router'] = '0.2.18';

      console.log(this.bowerLibraries);
      //Add selected dependencies
      this.bowerLibraries
        .forEach(function(lib) { bowerJson.dependencies[lib] = clientLibraryVersions[lib]; });

      if(this.bowerLibraries.indexOf('angular-spinner')) {
        bowerJson.dependencies['spin.js'] = '2.3.2';
      }
      bowerJson["resolutions"] = {
          "angular": "1.4.9",
          "angular-toastr": "1.7.0"
      };

      this.fs.writeJSON('bower.json', bowerJson);
      this.copy('bowerrc', '.bowerrc');
    },

    appStaticFiles: function () {
      //this.log('Template path: ' + this.templatePath());
      //this.log('Destination path: ' + this.destinationPath());
      //var source = this.templatePath('_favicon.ico');
      //var destination = this.destinationPath('src/favicon.ico');
      //this.log('Source: ' + source);
      //this.log('Destination: ' + destination);
      //this.copy('_favicon.ico', 'src/favicon.ico');
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        {
          readmedescription: this.readmedescription,
          ngapp: this.appname
        }
      );
      this.fs.copyTpl(this.templatePath('./styles/**/*.scss'), this.destinationPath('styles/')); //for directories

      //babel
      this.copy('babelrc', '.babelrc');

      //editor config
      this.copy('editorconfig', '.editorconfig');
    },

    scripts: function() {
      this.fs.copyTpl(
        this.templatePath('_app.js'),
        this.destinationPath('app.js'),
        {
          ngapp: this.appname
        }
      );
      this.fs.copyTpl(this.templatePath('./app/**/*.js'), this.destinationPath('app/'));
      this.copy('karma.js','.karma.js');
    },

    html: function() {
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'),
        {
          appname: _.startCase(this.appname),
          ngapp: this.appname
        }
      );
      this.fs.copyTpl(this.templatePath('./app/components/component/component-tpl.html'), this.destinationPath('app/components/component/component-tpl.html'));
    }
  },
  conflicts: function() {

  },
  install: function() {
    //performs bower install and npm install
    this.installDependencies()
  },
  end: function() {
    this.log(chalk.yellow.bold('Installation successful!'));

    var howToPublish =
      '\nAfter you have completed development on your angular component you may publish to the bower.ldschurch registry in order to be used in other projects.' +
      '\nFirst, you must make sure you have this project committed to a remote repo (ie Stash or Git). After committing project to a repo, you simply use the command:' +
      '\n\n' + chalk.yellow.bold('bower register <my-package-name> <git-endpoint>') +
      '\n\nFor Example:' +
      '\n' + chalk.yellow.bold('bower register example-component git://github.com/user/example-component.git') +
      '\n\nAnd wallah! you may now use ' + chalk.yellow.bold('bower install example-component') + ' in any of your applications to add this component to your project.';

    this.log(howToPublish);
  }
});
