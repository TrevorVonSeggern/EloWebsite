import {AccountChangePasswordController} from './controller';
import {definition} from "../../../../Definition";

var module:any = angular.module(definition.accountChangePassword.moduleName, ['dtrw.bcrypt']);

module.controller(AccountChangePasswordController.controllerName, AccountChangePasswordController.$inject);

export var ChangePasswordModule = module;