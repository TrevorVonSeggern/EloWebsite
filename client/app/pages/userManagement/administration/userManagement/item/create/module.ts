/**
 * Created by trevor on 5/31/16.
 */
import {controller} from './controller';
import {directive} from './directive';
import {definition} from "../../../../../../Definition";

var module:any = angular.module(definition.userManagementCreate.moduleName, []);

// create
module.directive(directive.directiveName, function () {
	return new directive();
});

module.controller(controller.controllerName, controller.$inject);

export var CreateModule = module;