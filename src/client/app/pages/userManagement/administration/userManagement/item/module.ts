/**
 * Created by trevor on 5/31/16.
 */
import IModule = angular.IModule;
import {CreateModule} from './create/module';
import {DetailModule} from './detail/module';
import {EditModule} from './edit/module';
import {ItemService} from './service';

let module:IModule = angular.module('userManagementItemModule', [
	CreateModule.name,
	DetailModule.name,
	EditModule.name,
]);

module.factory(ItemService.serviceName, ItemService.Service());

export let ItemModule = module;