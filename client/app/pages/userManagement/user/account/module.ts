import {controller} from './controller';
import IModule = angular.IModule;
import {definition} from "../../../../Definition";

var module:IModule = angular.module(definition.account.moduleName, ['dtrw.bcrypt']);

module.controller(controller.controllerName, controller.$inject);

export var AccountModule = module;