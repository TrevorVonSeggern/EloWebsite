import {definition} from '../../../Definition';
import {InputPhoneController} from './controller';
import {InputPhoneDirective} from './directive';
import {IModule} from "angular";

let module:IModule = angular.module(definition.inputPhone.moduleName, []);
module.controller(definition.inputPhone.controllerName, ['$scope', InputPhoneController]);
module.directive(definition.inputPhone.directiveName, InputPhoneDirective);