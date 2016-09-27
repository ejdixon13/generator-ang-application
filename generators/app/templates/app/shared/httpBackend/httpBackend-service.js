/**
 * Factory: HttpBackendService
 *
 * This can be used to imitate a backend when a real backend is not handy.
 */

function HttpBackendInit() {
  angular
    .module('app')
    .factory('HttpBackendService', HttpBackendService)
    .run(HttpBackendSetup);

  HttpBackendService.$inject = ['$httpBackend'];
  HttpBackendSetup.$inject = ['HttpBackendService'];
}

function HttpBackendSetup(HttpBackendService) {
  HttpBackendService.setupBackend(false);
}

function HttpBackendService($httpBackend) {

  /*****************************************************************************************************
   * HTTP BACKEND WHENS
   *****************************************************************************************************/
    //$httpBackend.whenGET(/api\//)
    //    .passThrough();
  $httpBackend.whenGET(/</)
    .passThrough();
  $httpBackend.whenPUT(/api\//)
    .passThrough();
  $httpBackend.whenPOST(/api\//)
    .passThrough();
  $httpBackend.whenDELETE(/api\//)
    .passThrough();

  const getApis =[
    ['api/app-property', appProperty]

    //UTIL
    [/util\/api\//],
    //Modal Templates
    [/src/]
  ];

  const otherApis = [
  ];

  function createWhenGets(isInTest) {
    if(isInTest) {
      _.each(getApis, function (api) {
        //(api[1])? $httpBackend.expectGET(api[0]).respond(api[1]) : '';
        (api[1])? $httpBackend.whenGET(api[0]).respond(api[1]) : $httpBackend.whenGET(api[0]).passThrough();
      })
    } else {
      $httpBackend.whenGET(/api\//).passThrough();
    }
  }

  function runExpectWhen(httpMethod, api, data, responseStatus = 200) {
    let allApis = getApis.concat(otherApis);
    for(let i = 0; i < allApis.length; i++) {
      let apiURL = allApis[i][0];
      let apiData = allApis[i][1];
      let apiFailData = allApis[i][2];
      if (String(apiURL) == String(api)){
        return $httpBackend.expect(httpMethod, apiURL, data).respond(responseStatus, (responseStatus == 200) ? apiData : apiFailData);
      }
    }
  }

  return {
    setupBackend: createWhenGets,
    runExpectWhen: runExpectWhen
  };

}

/*****************************************************************************************************
 * APP PROPERTY API
 * PATH: api/app-property
 *****************************************************************************************************/
const appProperty = {
  "appPropertyList" : [ {
    "parmName" : "napi.rest.url",
    "parmValue" : "/",
    "hide" : false
  }, {
    "parmName" : "napi.url",
    "parmValue" : "/",
    "hide" : false
  }, {
    "parmName" : "util.path",
    "parmValue" : "/#",
    "hide" : false
  }, {
    "parmName" : "util.rest.url",
    "parmValue" : "https://apps-maint-test.ldschurch.org/util",
    "hide" : false
  } ]
};

export default HttpBackendInit;
