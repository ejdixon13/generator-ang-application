function AppRun($rootScope, Exception){
  'ngInject';

  // used for catching state errors. they dont show up otherwise
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('$stateChangeError: ', toState, error);
    Exception.catcher(toState.url + ' : ' + error)('$stateChangeError: ');
  });

  $rootScope.$on('$stateChangeSuccess',
    function (event, toState, toParams, fromState, fromParams) {
      if (toState.title) {
        $rootScope.pageTitle = toState.title;
      }
    });
}

export default AppRun;
