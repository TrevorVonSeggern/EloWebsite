import * as angular from 'angular';
import {typeName} from '../typeName';
import {DetailModule} from './detail/module';
import {ItemService} from './service';
import {EditModule} from './edit/module';
import {CreateModule} from './create/module';

export let ItemModule = angular.module(typeName + 'ItemModule', [
	CreateModule.name,
	DetailModule.name,
	EditModule.name,
]).factory(ItemService.serviceName, ItemService.Service());
