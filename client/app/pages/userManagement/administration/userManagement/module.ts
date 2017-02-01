/**
 * Created by trevor on 5/31/16.
 */
import IModule = angular.IModule;
import {UserManagementController} from './controller';
import {ItemModule} from './item/module';
import {ListModule} from './list/module';
import {ListFactory} from './list/factory';
import {StatusModule} from './status/module';
import {definition} from "../../../../Definition";

let module: IModule = angular.module(definition.userManagement.moduleName, [
	ItemModule.name,
	ListModule.name,
	StatusModule.name,
]);

module.factory(ListFactory.factoryName, ListFactory.factory());

module.controller(UserManagementController.controllerName, UserManagementController.$inject);

export let UserManagementModule = module;