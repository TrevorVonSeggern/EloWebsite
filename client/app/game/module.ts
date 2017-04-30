import * as angular from 'angular';
import {typeName} from './typeName';
import {controller} from './controller';
import {ListModule} from './list/module';
import {ItemModule} from './item/module';

export let GameModule = angular.module(typeName + 'MainModule', [
	ListModule.name,
	ItemModule.name,
]).controller(controller.controllerName, controller.$inject);
