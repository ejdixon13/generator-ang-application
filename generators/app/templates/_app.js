// Import our app config files
import constants  from './app/config/app-constants';
import appConfig  from './app/config/app-config';
import appRun     from './app/config/app-run';

//Components
import './app/components/component';
import './app/components/hero';
import './app/components/hero/heroDetail';
import './app/components/hero/heroList';
import './app/shared/input-utilities';
import './app/shared/input-utilities/editableField';
import './app/shared/version';

angular.module('app',
  [
    'ngResource',
    //'ngMockE2E',  //requires line 39-40 to be uncommented (HTTP BACKEND)
    'ngAnimate',
    'ngMessages',
    'ngTouch',
    'ui.bootstrap',
    'ncy-angular-breadcrumb',
    'toastr',
    'angularSpinner',

    // custom bower
    'angularHoverEdit',
    'angular-http-helper',
    'angular-input-utilities',
    'angular-mms-common-modals',

    //custom
    'component',
    'hero',
    'input-utilities'
  ]);



angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

//HTTP BACKEND (Requires NgMockE2E module)
//import HttpBackendInit from './app/sharedServices/httpBackend/httpBackend-service';
//HttpBackendInit();
