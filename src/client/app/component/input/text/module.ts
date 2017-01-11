import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {InputTextController} from './controller';
import {InputTextDirective} from './directive';

var module:IModule = angular.module(definition.inputText.moduleName, []);
module.controller(definition.inputText.controllerName, ['$scope', InputTextController]);
module.directive(definition.inputText.directiveName, InputTextDirective);
