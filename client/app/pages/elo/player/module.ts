/**
 * Created by trevor on 5/31/16.
 */
import {definition} from '../../Definition';
import {controller} from './controller';
import {ListModule} from './list/module';
import {typeName} from "./typeName";
import {ItemModule} from './item/module';

let module: IModule = angular.module(typeName + 'MainModule', [
	ListModule.name,
	ItemModule.name,
]);


module.controller(controller.controllerName, controller.$inject);

export let PlayerModule = module;