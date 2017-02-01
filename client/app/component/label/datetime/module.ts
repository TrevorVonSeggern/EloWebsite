import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {directive} from './directive';
import {controller} from './controller';

let module: IModule = angular.module('tvo-label-datetime-module', []);

module.controller(definition.labelDatetime.controllerName, ['$scope', controller]);
module.directive('tvoLabelDatetime', directive);

export let LabelDatetimeModule = module;
