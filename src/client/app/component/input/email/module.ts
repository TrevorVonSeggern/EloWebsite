import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {InputEmailController} from './controller';
import {InputEmailDirective} from './directive';

var module:IModule = angular.module(definition.inputEmail.moduleName, []);
module.controller(definition.inputEmail.controllerName, ['$scope', InputEmailController]);
module.directive(definition.inputEmail.directiveName, InputEmailDirective);
