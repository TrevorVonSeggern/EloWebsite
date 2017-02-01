import {definition} from '../../../Definition';
import {directive} from './directive';
import {controller} from './controller';

let module = angular.module('tvo-label-datetime-module', []);

module.controller(definition.labelDatetime.controllerName, ['$scope', controller]);
module.directive('tvoLabelDatetime', directive);

export let LabelDatetimeModule = module;
