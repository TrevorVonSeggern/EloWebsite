import {directive} from './directive';
import {controller} from './controller';
import * as angular from 'angular';
import {definition} from "../../../../definition";

let module = angular.module(definition.gameDetail.moduleName, []);

module.directive(directive.directiveName, function () {
	return new directive();
});

module.controller(controller.controllerName, controller.$inject);

export let DetailModule = module;