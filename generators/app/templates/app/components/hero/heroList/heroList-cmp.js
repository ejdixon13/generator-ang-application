function HeroListController($scope, $element, $attrs) {
    'ngInject';
    var ctrl = this;

    // This would be loaded by $http etc.
    ctrl.list = [
        {
            name: 'Superman',
            location: ''
        },
        {
            name: 'Batman',
            location: 'Wayne Manor'
        }
    ];

    ctrl.updateHero = function(hero, prop, value) {
        hero[prop] = value;
    };

    ctrl.deleteHero = function(hero) {
        var idx = ctrl.list.indexOf(hero);
        if (idx >= 0) {
            ctrl.list.splice(idx, 1);
        }
    };
}
export default ()=>
    angular.module('hero')
        .component('heroList', {
            templateUrl: 'app/components/hero/heroList/heroList-tpl.html',
            controller: HeroListController
        });
