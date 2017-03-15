import {directive} from './directive';
import {controller} from './controller';
import {definition} from '../../../../definition';
import * as angular from 'angular';

let module = angular.module(definition.matchEdit.moduleName, []);

// edit
module.directive(directive.directiveName, function () {
	return new directive();
});

module.controller(controller.controllerName, controller.$inject);


export let EditModule = module;