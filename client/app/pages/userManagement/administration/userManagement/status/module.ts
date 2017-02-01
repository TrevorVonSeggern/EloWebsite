/**
 * Created by trevor on 5/31/16.
 */
import IModule = angular.IModule;
import {controller} from './controller';
import {directive} from './directive';
import {definition} from "../../../../../Definition";

let module:IModule = angular.module(definition.userManagementStatus.moduleName, []);

module.controller(controller.controllerName, controller.$inject);

// status
module.directive(directive.directiveName, function () {
	return new directive();
});


export let StatusModule = module;