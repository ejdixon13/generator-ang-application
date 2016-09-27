function ComponentConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.component', {
      url: '/component',
      views: {
        'main@': {
          template: '<component></component>'
        }
      },
      ncyBreadcrumb: {
        parent: 'app',
        label: 'Component'
      },
      resolve: {
      },
      title: 'Component Title'
    });
    //.state('app.component', {
    //  url: '/',
    //  controller: 'HomeCtrl',
    //  controllerAs: '$ctrl',
    //  templateUrl: 'home/home.html',
    //  title: 'Home'
    //});

}

export default ComponentConfig;
