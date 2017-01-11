import IModule = angular.IModule;
import {directive} from './directive';
import {controller} from './controller';
import {definition} from '../../../../Definition';

var module:IModule = angular.module(definition.inputDeleteButton.moduleName, []);

module.controller(definition.inputDeleteButton.controllerName, controller.$inject);
module.directive(definition.inputDeleteButton.directiveName, directive);

export var DeleteModule = module;