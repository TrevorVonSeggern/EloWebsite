import {controller} from './controller';
import {definition} from "../../../../Definition";

var module:IModule = angular.module(definition.register.moduleName, ['dtrw.bcrypt']);

module.controller(controller.controllerName, controller.$inject);

export var RegisterModule = module;