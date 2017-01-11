import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {InputPasswordController} from './controller';
import {InputPasswordDirective} from './directive';

var module:IModule = angular.module(definition.inputPassword.moduleName, []);
module.controller(definition.inputPassword.controllerName, ['$scope', InputPasswordController]);
module.directive(definition.inputPassword.directiveName, InputPasswordDirective);
