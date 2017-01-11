import {controller} from './controller';
import IModule = angular.IModule;
import {definition} from "../../../../Definition";

var module:IModule = angular.module(definition.login.moduleName, ['dtrw.bcrypt']);

module.controller(controller.controllerName, controller.$inject);

export var LoginModule = module;