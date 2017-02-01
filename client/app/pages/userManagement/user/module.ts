/**
 * Created by trevor on 6/29/2016.
 */

import IModule = angular.IModule;
import {AccountModule} from './account/module';
import {LoginModule} from './login/module';
import {RegisterModule} from './register/module';
import {ChangePasswordModule} from './changepassword/module';
import {UserFactory} from "./factory";
import {definition} from "../../../Definition";

let module = angular.module(definition.user.moduleName, [
	'dtrw.bcrypt',
	AccountModule.name,
	ChangePasswordModule.name,
	LoginModule.name,
	RegisterModule.name,
]);

module.factory(UserFactory.factoryName, UserFactory.Factory());

export let UserModule: IModule = module;
