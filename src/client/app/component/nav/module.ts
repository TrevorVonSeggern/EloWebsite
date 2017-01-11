/**
 * Created by Trevor Von Seggern on 11/30/2015.
 */
import {definition} from '../../Definition';
import {navController} from './controller';
import {navDirective} from './directive';

var module:any = angular.module(definition.nav.moduleName, []);

module.controller(definition.nav.controllerName, navController.$inject);
module.directive(definition.nav.directiveName, navDirective);

export var NavModule:any = module;