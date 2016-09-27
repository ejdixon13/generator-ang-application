//import angular from 'angular';

let componentModule = angular.module('component', []);

import aComponentDx from './component-dx';
aComponentDx();
//componentModule.directive('aComponent', aComponentDx);

import componentConfig from './component-config';
componentModule.config(componentConfig);

export default componentModule;
