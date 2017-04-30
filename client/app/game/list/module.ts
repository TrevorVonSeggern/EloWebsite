import * as angular from 'angular';
import {MultipleItemModule} from './multiple/module';
import {SingleItemModule} from './single/module';
import {typeName} from "../typeName";
import {ListFactory} from "./factory";

export let ListModule = angular.module(typeName + 'ListModule', [
	SingleItemModule.name,
	MultipleItemModule.name,
]).factory(ListFactory.factoryName, ListFactory.factory());
