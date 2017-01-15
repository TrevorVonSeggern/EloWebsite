/**
 * Created by trevor on 5/31/16.
 */
import {directive} from './directive';
import {controller} from './controller';
import {eloDefinition} from "../../../eloDefinition";

let module: any = angular.module(eloDefinition.matchDetail.moduleName, []);

module.directive(directive.directiveName, function () {
	return new directive();
});

module.controller(controller.controllerName, controller.$inject);

export let DetailModule = module;