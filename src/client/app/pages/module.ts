/**
 * Created by trevor on 7/14/2016.
 */
import IModule = angular.IModule;

import {UserModule} from './userManagement/user/module'
import {AdministrationModule} from './userManagement/administration/module'
import {HomeModule} from './home/module'
import {DefinitionRouter, definition} from "../Definition";
import {loadEloRouter} from "./elo/module";
import {EloModule} from "./elo/module";

let module: any = angular.module('pages', [
	UserModule.name,
	AdministrationModule.name,
	HomeModule.name,
	EloModule.name,
]);

export let PagesModule = module;

export function loadRouter($stateProvider) {
	loadEloRouter($stateProvider);

	$stateProvider.state('user-login', new DefinitionRouter('/login', definition.login));
	$stateProvider.state('user-register', new DefinitionRouter('/register', definition.register));
	$stateProvider.state('user-change-password', new DefinitionRouter('/account/ChangePassword', definition.accountChangePassword));
	$stateProvider.state('user-account', new DefinitionRouter('/account', definition.account));

	$stateProvider.state('user-management-create', new DefinitionRouter('/administration/userManagement/create', definition.userManagementCreate));
	$stateProvider.state('user-management-edit', new DefinitionRouter('/administration/userManagement/edit/:id', definition.userManagementEdit));
	$stateProvider.state('user-management', new DefinitionRouter('/administration/userManagement', definition.userManagement));
	$stateProvider.state('user-management-detail', new DefinitionRouter('/administration/userManagement/:id', definition.userManagementDetail));

	$stateProvider.state('administration', new DefinitionRouter('/administration', definition.administration));

}