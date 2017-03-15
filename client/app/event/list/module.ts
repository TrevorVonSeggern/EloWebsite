/**
 * Created by trevor on 5/31/16.
 */
import * as angular from 'angular';
import {MultipleItemModule} from './multiple/module';
import {SingleItemModule} from './single/module';
import {ListFactory} from "./factory";
import {typeName} from "../typeName";

let module = angular.module(typeName + 'ListModule', [
	SingleItemModule.name,
	MultipleItemModule.name,
]);

module.factory(ListFactory.factoryName, ListFactory.factory());

export let ListModule = module;