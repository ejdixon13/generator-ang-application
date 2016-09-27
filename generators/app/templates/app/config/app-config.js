import authInterceptor from './auth-interceptor'

function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $httpProvider.interceptors.push(authInterceptor);

  /*
   If you don't want hashbang routing, uncomment this line.
   Our tutorial will be using hashbang routing though :)
   */
  // $locationProvider.html5Mode(true);

  $stateProvider
    .state('app', {
      url: '',
      ncyBreadcrumb: {
        label: 'Home'
      },
      views: {
        'header@': {
          template: `<header>Header</header>`
        },
        'footer@': {
          template: `<footer>Footer</footer>`
        }
      },
      resolve: {
        //User: ['CurrentUser', function (CurrentUser) {
        //  return CurrentUser.getUser().then(function (userData) {
        //    return userData;
        //  }, function (data) {
        //    return data;
        //  });
        //}]
      }
    });
    //.state('app', {
    //  abstract: true,
    //  templateUrl: 'layout/app-view.html',
    //  resolve: {
    //    auth: function(User) {
    //      return User.verifyAuth();
    //    }
    //  }
    //});

  $urlRouterProvider.otherwise('/');

}

export default AppConfig;
