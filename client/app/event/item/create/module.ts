/**
 * Created by trevor on 5/31/16.
 */
import {controller} from './controller';
import {directive} from './directive';
import {typeName} from "../../typeName";
import * as angular from 'angular';

let module: any = angular.module(typeName + 'Create-module', []);

// create
module.directive(directive.directiveName, function () {
	return new directive();
});

module.controller(controller.controllerName, controller.$inject);

export let CreateModule = module;