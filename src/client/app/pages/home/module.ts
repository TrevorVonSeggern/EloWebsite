/**
 * Created by trevor on 5/31/16.
 */
import {definition} from '../../Definition';
import {HomeController} from './controller';
import IModule = angular.IModule;

var module:IModule = angular.module(definition.home.moduleName, []);

module.controller(HomeController.controllerName, HomeController.$inject);

export var HomeModule = module;