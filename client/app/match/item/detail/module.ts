/**
 * Created by trevor on 5/31/16.
 */
import {directive} from './directive';
import {controller} from './controller';
import * as angular from 'angular';
import {definition} from "../../../../definition";

let module: any = angular.module(definition.matchDetail.moduleName, []);

module.directive(directive.directiveName, function () {
	return new directive();
});

module.controller(controller.controllerName, controller.$inject);

export let DetailModule = module;