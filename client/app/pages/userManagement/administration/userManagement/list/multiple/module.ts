/**
 * Created by trevor on 5/31/16.
 */
import IModule = angular.IModule;
import {directive} from './directive';
import {definition} from "../../../../../../Definition";

let module:IModule = angular.module(definition.userManagementMultipleItem.moduleName, []);

module.directive(directive.directiveName, function () {
	return new directive();
});

export let MultipleItemModule = module;