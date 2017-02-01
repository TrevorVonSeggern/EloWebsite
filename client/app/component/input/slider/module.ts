import {definition} from '../../../Definition';
import {InputSliderController} from './controller';
import {InputSliderDirective} from './directive';

let module = angular.module(definition.inputSlider.moduleName, []);
module.controller(definition.inputSlider.controllerName, ['$scope', InputSliderController]);
module.directive(definition.inputSlider.directiveName, InputSliderDirective);
