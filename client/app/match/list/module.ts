import {MultipleItemModule} from './multiple/module';
import {SingleItemModule} from './single/module';
import {ListFactory} from "./factory";
import {typeName} from "../typeName";
import * as angular from 'angular';

let module = angular.module(typeName + 'ListModule', [
	SingleItemModule.name,
	MultipleItemModule.name,
]);

module.factory(ListFactory.factoryName, ListFactory.factory());

export let ListModule = module;