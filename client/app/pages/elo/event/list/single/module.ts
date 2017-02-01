/**
 * Created by trevor on 5/31/16.
 */
import {controller} from './controller';
import {directive} from './directive';
import {typeName} from "../../typeName";
import {IModule} from "angular";

let module: IModule = angular.module(typeName + 'ListSingleModule', []);

module.controller(controller.controllerName, controller.$inject);

module.directive(directive.directiveName, function () {
	return new directive();
});

export let SingleItemModule = module;