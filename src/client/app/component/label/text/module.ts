import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {directive} from './directive';
import {controller} from './controller';

let module:IModule = angular.module('tvo-label-text-module', []);

module.controller(definition.labelText.controllerName, ['$scope', controller]);
module.directive('tvoLabelText', directive);

export let LabelTextModule = module;
