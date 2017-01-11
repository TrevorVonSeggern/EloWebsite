/**
 * Created by trevor on 5/31/16.
 */
import {directive} from './directive';
import {controller} from './controller';
import {definition} from "../../../../../../Definition";

var module: any = angular.module(definition.userManagementEdit.moduleName, []);

// edit
module.directive(directive.directiveName, function () {
	return new directive();
});

module.controller(controller.controllerName, controller.$inject);


export var EditModule = module;