import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {InputSliderController} from './controller';
import {InputSliderDirective} from './directive';

var module:IModule = angular.module(definition.inputSlider.moduleName, []);
module.controller(definition.inputSlider.controllerName, ['$scope', InputSliderController]);
module.directive(definition.inputSlider.directiveName, InputSliderDirective);
