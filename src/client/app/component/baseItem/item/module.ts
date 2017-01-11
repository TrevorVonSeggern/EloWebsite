// Created by trevor on 7/29/2016.
import {CreateModule} from './create/module'
import {DetailModule} from './detail/module'
import {EditModule} from './edit/module'
import {BasicItemService} from './service';

export var ItemModule = angular.module('baseItemItemModule', [
	CreateModule.name,
	DetailModule.name,
	EditModule.name,
]);

ItemModule.service(BasicItemService.serviceName, BasicItemService.BasicItemService());
