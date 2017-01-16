import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {directive} from './directive';
import {controller} from './controller';

var module: IModule = angular.module(definition.inputSingleSelect.moduleName, ['angular-bootstrap-select']);

module.controller(definition.inputSingleSelect.controllerName, ['$scope', controller]);
module.directive('tvoInputSingleSelect', directive);

export var SingleSelectModule = module;
