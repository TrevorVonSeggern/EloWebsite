import * as angular from 'angular';
import {controller} from './controller';
import {directive} from './directive';
import {typeName} from '../../typeName';

let module = angular.module(typeName + 'ListSingleModule', []);

module.controller(controller.controllerName, controller.$inject);

module.directive(directive.directiveName, function () {
	return new directive();
});

export let SingleItemModule = module;