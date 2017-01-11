import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {directive} from './directive';
import {controller} from './controller';

var module:IModule = angular.module('tvo-label-text-module', []);

module.controller(definition.labelText.controllerName, ['$scope', controller]);
module.directive('tvoLabelText', directive);

export var LabelTextModule = module;
