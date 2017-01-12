/**
 * Created by trevor on 5/31/16.
 */
import IModule = angular.IModule;
import {typeName} from "../typeName";
import {DetailModule} from './detail/module';
import {ItemService} from './service';
import {EditModule} from './edit/module';
import {CreateModule} from './create/module';

let module: IModule = angular.module(typeName + 'ItemModule', [
	CreateModule.name,
	DetailModule.name,
	EditModule.name,
]);

module.factory(ItemService.serviceName, ItemService.Service());

export let ItemModule = module;