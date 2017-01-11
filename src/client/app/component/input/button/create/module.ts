import IModule = angular.IModule;
import {directive} from './directive';
import {controller} from './controller';
import {definition} from '../../../../Definition';

var module:IModule = angular.module(definition.inputCreateButton.moduleName, []);

module.controller(definition.inputCreateButton.controllerName, controller.$inject);
module.directive(definition.inputCreateButton.directiveName, directive);

export var CreateModule = module;