// Created by trevor on 7/29/2016.

import {ItemModule} from './item/module';
import {ListModule} from './list/module';

export var BaseItemModule = angular.module('baseItemModule', [
	ItemModule.name,
	ListModule.name,
]);
