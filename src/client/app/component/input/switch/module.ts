import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {InputSwitchController} from './controller';
import {InputSwitchDirective} from './directive';

var module:IModule = angular.module(definition.inputSwitch.moduleName, []);
module.controller(definition.inputSwitch.controllerName, ['$scope', InputSwitchController]);
module.directive(definition.inputSwitch.directiveName, InputSwitchDirective);