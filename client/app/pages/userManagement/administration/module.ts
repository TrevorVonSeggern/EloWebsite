/**
 * Created by trevor on 5/31/16.
 */
import {AdministrationController} from './controller';
import IModule = angular.IModule;
import {definition} from "../../../Definition";
import {UserManagementModule} from "./userManagement/module";

let module: IModule = angular.module(definition.administration.moduleName, [
	UserManagementModule.name,
]);

module.controller(AdministrationController.controllerName, AdministrationController.$inject);

export let AdministrationModule = module;