/**
 * Directive: aComponent
 * Module: a.component
 */
function aComponentDx(VERSION) {
  'ngInject';
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/component/component-tpl.html',
        link: function($scope) {
          $scope.version = VERSION;
        }
    };
}

//export default aComponentDx;

export default ()=>
    angular.module('component')
        .directive('component', aComponentDx);
