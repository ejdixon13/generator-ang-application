function authInterceptor ($window, $location, $q, $rootScope) {
  'ngInject';

  return {
    // Intercept 401s and redirect you to login
    request: function (config) {
      return config || $q.when(config);
    },
    requestError: function () {
      $location.path('/error');
    },
    response: function (response) {
      if (response.status === 0 && response.textStatus === 'error') {
        //this is where your code to handle missing WAM goes.
        //$window.href = $window.href;
        //END handling of dead session.
      }
      return response || $q.when(response);
    },
    responseError: function (response) {
      function redirectForWAM() {
        var path = $window.location.href;
        var redirect = '';
        if (path.indexOf('localhost') > -1) {
          redirect = 'http://localhost.ldschurch.org:1776/wamulator/console/signIn?goto=' + encodeURIComponent(path);
        } else {
          // WAM does not come here. It is picked up in http-helper.js.
          redirect = path + '/signIn?goto=' + encodeURIComponent(path);
        }
        $window.location.href = redirect;
      }

      if (response.status === 400 || response.status === 422) {
        return $q.reject(response);
      } else if (response.status === 401) {
        $rootScope.unAuthorized = true;
        redirectForWAM();
      } else if (response.status === 403) {
        $window.location.href = "/napi/accessDenied.jsf"
      }else if (response.status === 502 || response.status === 503) {
        //Do Something
      } else if (response.status === 500 || response.status === 404) {
        //Do Something
      }
      //Added a reject response to pass the error up the promise chain
      return $q.reject(response);
    }
  };
}


export default authInterceptor;
