/**
 * Created by trevor on 5/31/16.
 */
import IModule = angular.IModule;
import {controller} from './controller';
import {directive} from './directive';
import {definition} from "../../../../../../Definition";

let module:IModule = angular.module(definition.userManagementSingleItem.moduleName, [
]);

module.controller(controller.controllerName, controller.$inject);

module.directive(directive.directiveName, function () {
	return new directive();
});

export let SingleItemModule = module;